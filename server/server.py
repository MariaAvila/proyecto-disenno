from flask import Flask, request, jsonify
from pydantic import BaseModel, ValidationError
from typing import Optional
from werkzeug.security import generate_password_hash, check_password_hash
import re
import database
import secrets

app = Flask('__main__')

### Validates user fields
class User(BaseModel):
    name: str
    email: str
    role: int
    phone: Optional[str] = None
    password: str
    workshop: Optional[str] = None

### Validate update password request fields
class UpdatePassword(BaseModel):
    auth_token: str
    email: str
    old_password: str
    new_password: str
    confirm_new_password: str

### Validate update info request fields
class UpdateInfo(BaseModel):
    auth_token: str
    old_email: str
    name: str
    new_email: str
    phone: Optional[str] = None
    workshop: Optional[str] = None

### Validate get mechanics request fields
class GetMechanics(BaseModel):
    auth_token: str
    email: str
    workshop: int

### Validate disable user request fields
class DisableUser(BaseModel):
    auth_token: str
    email: str
    user_id: int

### Validate add work request fields
class AddWork(BaseModel):
    auth_token: str
    email: str
    plate: str
    workshop: int

### Validate update work request fields
class UpdateWork(BaseModel):
    auth_token: str
    email: str
    start_date: str
    end_date: str
    is_finished: int
    mechanic: int

### Creates Auth Token
def make_token():
    """
    Creates a cryptographically-secure, URL-safe string
    """
    return secrets.token_urlsafe(16)  

### Creates a user
@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        user = User(**data)
        name = user.name
        email = user.email
        role = user.role
        phone = user.phone
        password = user.password
        is_deleted = 0
        workshop = user.workshop
        
        # Define a regular expression pattern for a basic email format
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.[\w]+$'
        if not re.match(email_pattern, email):
            return "Invalid Email", 400

        connection = database.create_connection()
        is_not_duplicate = database.validate_duplicate_email(connection, email)
        if is_not_duplicate:
            if workshop:
                workshop = database.execute_statement(
                connection,
                "INSERT INTO workshops (name) VALUES (?)", 
                (workshop,)
                )
            else:
                workshop = None
            hashed_password = generate_password_hash(password)
            database.execute_statement(
                connection,
                "INSERT INTO users (name, email, role, phone, password, is_deleted, workshop) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                (name, email, role, phone, hashed_password, is_deleted, workshop)
                )
            connection.close()
            return "Row created successfully", 201
        else:
            connection.close()
            return "Email already exists", 400
    except ValidationError as e:
        return e.errors(), 400

### Login User
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    connection = database.create_connection()
    user = database.query_table(
        connection,
        "SELECT * FROM users WHERE email = ? LIMIT 1", 
        (email,)
    )
    is_deleted = user[0][6]

    if user and check_password_hash(user[0][5], password) and not is_deleted:
        auth_token = make_token()
        is_logged = database.check_if_user_logged_in(connection, email)
        if is_logged:
            database.update_user_token(connection, email, auth_token)
        else:
            database.login_user(connection, email, auth_token)
        connection.close()
        return jsonify({'auth_token': auth_token}), 200
    else:
        connection.close()
        return "Invalid username or password", 404
    
### Logout User
@app.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    email = data["email"]

    connection = database.create_connection()
    is_logged_in = database.check_if_user_logged_in(connection, email)
    if is_logged_in:
        database.logout_user(connection, email)
        connection.close()
        return "Logged out successfully", 200
    else:
        connection.close()
        return "User not logged in", 400
    
### Update password
@app.route('/update_password', methods=['PUT'])
def update_password():
    data = request.get_json()
    try:
        update_data = UpdatePassword(**data)
        email = update_data.email
        old_password = update_data.old_password
        new_password = update_data.new_password
        confirm_new_password = update_data.confirm_new_password
        auth_token = update_data.auth_token

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return "Invalid token", 401
        else:
            user = database.query_table(
                connection,
                "SELECT * FROM users WHERE email = ? LIMIT 1", 
                (email,)
            )
            if old_password == new_password:
                connection.close()
                return "Old and new password can't be the same", 400
            if check_password_hash(user[0][5], old_password):
                if new_password == confirm_new_password:
                    hashed_password = generate_password_hash(new_password)
                    database.execute_statement(
                        connection,
                        "UPDATE users SET password=? WHERE email=?", 
                        (hashed_password, email)
                    )
                    connection.close()
                    return "Update successful", 200
                else:
                    connection.close()
                    return "Passwords don't match", 400
            else:
                connection.close()
                return "Wrong password", 400
    except ValidationError as e:
        return e.errors(), 400
    
### Update info
@app.route('/update_info', methods=['PUT'])
def update_info():
    data = request.get_json()
    try:
        update_info = UpdateInfo(**data)
        auth_token = update_info.auth_token
        old_email = update_info.old_email
        name = update_info.name
        new_email = update_info.new_email
        phone = update_info.phone
        workshop = update_info.workshop

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, old_email, auth_token)
        if not is_token_valid:
            connection.close()
            return "Invalid token", 401
        else:
            if not name:
                connection.close()
                return "Name is required", 400
            if not new_email:
                connection.close()
                return "Email is required", 400
            if not phone:
                phone = None
            if not workshop:
                workshop = None
            else:
                workshop = database.execute_statement(
                    connection,
                    "UPDATE workshops SET name=? WHERE name=?", 
                    (name, name)
                )
            database.execute_statement(
                connection,
                "UPDATE users SET name=?, email=?, phone=?, workshop=? WHERE email=?", 
                (name, new_email, phone, workshop, old_email)
            )
            if not old_email == new_email:
                database.execute_statement(
                    connection,
                    "UPDATE login_session SET email=? WHERE email=?", 
                    (new_email, old_email)
                )
            connection.close()
            return "Update successful", 200
    except ValidationError as e:
        connection.close()
        return e.errors(), 400
    
### Get mechanics associated to a workshop
@app.route('/get_mechanics', methods=['GET'])
def get_mechanics():
    data = request.get_json()
    try:
        get_mechanics = GetMechanics(**data)
        auth_token = get_mechanics.auth_token
        email = get_mechanics.email
        workshop = get_mechanics.workshop

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return "Invalid token", 401
        else:
            mechanics = database.query_table(
                connection,
                "SELECT user_id, name, email FROM users WHERE workshop = ? AND role = 1 AND is_deleted = 0", 
                (workshop,)
            )
            if not mechanics:
                connection.close()
                return "No mechanics registered", 200
            else:
                json_data = [{'id': id, 'name': name, 'email': email} for id, name, email in mechanics]
                connection.close()
                return jsonify(json_data), 200
    except ValidationError as e:
        return e.errors(), 400
    
### Disable user
@app.route('/disable_user', methods=['PUT'])
def disable_user():
    data = request.get_json()
    try:
        disable_user = DisableUser(**data)
        email = disable_user.email
        auth_token = disable_user.auth_token
        user_id = disable_user.user_id

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return "Invalid token", 401
        else:
            database.execute_statement(
                connection,
                "UPDATE users SET is_deleted = 1 WHERE user_id = ?", 
                (user_id,)
            )
            connection.close()
            return "Delete successful", 200
    except ValidationError as e:
        return e.errors(), 400
    
### Add work
@app.route('/add_work', methods=['POST'])
def add_work():
    data = request.get_json()
    try:
        add_work = AddWork(**data)
        email = add_work.email
        auth_token = add_work.auth_token
        plate = add_work.plate
        workshop = add_work.workshop

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return "Invalid token", 401
        else:
            car_id = database.query_table(
                connection,
                "SELECT car_id FROM cars WHERE plate = ?", 
                (plate,)
            )[0][0]
            database.execute_statement(
                connection,
                "INSERT INTO works (car, workshop) VALUES (?, ?)", 
                (car_id, workshop)
            )
            connection.close()
            return "Work added successfully", 200
    except ValidationError as e:
        return e.errors(), 400
    
### Update work
@app.route('/update_work', methods=['POST'])
def update_work():
    data = request.get_json()
    try:
        update_work = UpdateWork(**data)
        auth_token = update_work.auth_token
        email = update_work.email
        start_date = update_work.start_date
        end_date = update_work.end_date
        mechanic = update_work.mechanic
        is_finished = update_work.is_finished

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return "Invalid token", 401
        else:
            if not start_date:
                start_date = None
            if not end_date:
                end_date = None
            if not mechanic:
                mechanic = None
            if not is_finished:
                is_finished = 0
            database.execute_statement(
                connection,
                "UPDATE works SET start_date=?, end_date=?, mechanic=?, is_finished=? WHERE email=?", 
                (start_date, end_date, mechanic, is_finished, email)
            )
            connection.close()
            return "Update successful", 200
    except ValidationError as e:
        return e.errors(), 400

# ------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=8000)

# TODO: Validate workshop name unique
# TODO: limit of login attempts