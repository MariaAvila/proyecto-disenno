from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pydantic import BaseModel as PydanticBaseModel, validator
from pydantic import ValidationError, Field
from typing import Optional
from werkzeug.security import generate_password_hash, check_password_hash
import re
import database
import secrets

app = Flask('__main__')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class BaseModel(PydanticBaseModel):
    @validator('*')
    def empty_str_to_none(cls, v):
        if v == '':
            return None
        return v

# Validates user fields
class User(BaseModel):
    name: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    role: int
    phone: Optional[str] = None
    password: str = Field(..., min_length=1)
    workshop: Optional[str] = None

# Validate update password request fields
class UpdatePassword(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    old_password: str = Field(..., min_length=1)
    new_password: str = Field(..., min_length=1)
    confirm_new_password: str = Field(..., min_length=1)

# Validate update info request fields
class UpdateInfo(BaseModel):
    auth_token: str = Field(..., min_length=1)
    old_email: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1)
    new_email: str = Field(..., min_length=1)
    phone: Optional[str] = None
    workshop: Optional[str] = None

# Validate get mechanics request fields
class GetMechanics(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    workshop: int

# Validate disable user request fields
class DisableUser(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    user_id: int

# Validate add work request fields
class AddWork(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    plate: str = Field(..., min_length=1)
    workshop: int

# Validate update work request fields
class UpdateWork(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_finished: int
    mechanic: int

# Validate work in progress request fields
class WorkInProgress(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    workshop: int

# Validate work in progress request fields
class WorksDone(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    workshop: int

# Validate work in progress request fields
class WorksDoneFilter(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    workshop: int
    model: Optional[str] = None
    owner: Optional[str] = None
    plate: Optional[str] = None
    mechanic: int

# Validate add service request fields
class AddService(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1)
    price: int = Field(..., gt=0)
    workshop: int

# Validate update service request fields
class UpdateService(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    service_id: int
    name: str = Field(..., min_length=1)
    price: int = Field(..., gt=0)

# Validate update service request fields
class GetServices(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    workshop: int

# Validate update service request fields
class DisableService(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    service_id: int

# Validate add service to work request fields
class AddServiceWork(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    is_finished: int
    work: int
    service: int

# Validate get work services request fields
class GetWorkServices(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    work: int

# Validates add car fields
class AddCar(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    model: str = Field(..., min_length=1)
    color: str = Field(..., min_length=1)
    plate: str = Field(..., min_length=1)
    image: Optional[bytearray] = None

# Validates add car fields
class EditCar(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    model: str = Field(..., min_length=1)
    color: str = Field(..., min_length=1)
    plate: str = Field(..., min_length=1)
    image: Optional[bytearray] = None

# Validates get cars fields
class GetCars(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)

# Validates disable cars fields
class DisableCar(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    plate: str = Field(..., min_length=1)

# Validates create update fields
class CreateUpdate(BaseModel):
    image: bytearray
    is_finished: int
    mechanic: int

# Validates create update fields
class CreateUpdate(BaseModel):
    image: bytearray
    is_finished: int
    mechanic: int

# Validates get updates fields
class GetUpdates(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    work_id: Optional[int] = None

# Validates edit updates fields
class EditUpdates(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    update_id: int
    service_work: int

# Validates send update fields
class SendUpdate(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    update_id: int

# Validates delete update fields
class DeleteUpdate(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    update_id: int

# Validates remove update fields
class RemoveUpdate(BaseModel):
    auth_token: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    update_id: int

# Creates Auth Token
def make_token():
    """
    Creates a cryptographically-secure, URL-safe string
    """
    return secrets.token_urlsafe(16)

# Creates a user
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
            return {"response": "Invalid Email"}, 400

        connection = database.create_connection()
        is_duplicate = database.validate_duplicate_email(connection, email)
        if not is_duplicate:
            if workshop:
                if database.validate_duplicate_workshop():
                    return {"response": "Workshop name already exists"}, 400
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
            return {"response": "Row created successfully"}, 201
        else:
            connection.close()
            return {"response": "Email already exists"}, 400
    except ValidationError as e:
        return e.errors(), 400

# Login User
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
        return jsonify({'auth_token': auth_token, 'email': email, 'workshop': user[0][7], "role": user[0][3]}), 200
    else:
        connection.close()
        return {"response": "Invalid username or password"}, 404

# Logout User
@app.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    email = data["email"]

    connection = database.create_connection()
    is_logged_in = database.check_if_user_logged_in(connection, email)
    if is_logged_in:
        database.logout_user(connection, email)
        connection.close()
        return {"response": "Logged out successfully"}, 200
    else:
        connection.close()
        return {"response": "User not logged in"}, 400

# Update password
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
            return {"response": "Invalid token"}, 401
        else:
            user = database.query_table(
                connection,
                "SELECT * FROM users WHERE email = ? LIMIT 1",
                (email,)
            )
            if old_password == new_password:
                connection.close()
                return {"response": "Old and new password can't be the same"}, 400
            if check_password_hash(user[0][5], old_password):
                if new_password == confirm_new_password:
                    hashed_password = generate_password_hash(new_password)
                    database.execute_statement(
                        connection,
                        "UPDATE users SET password=? WHERE email=?",
                        (hashed_password, email)
                    )
                    connection.close()
                    return {"response": "Update successful"}, 200
                else:
                    connection.close()
                    return {"response": "Passwords don't match"}, 400
            else:
                connection.close()
                return {"response": "Wrong password"}, 400
    except ValidationError as e:
        return e.errors(), 400

# Update info
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
        is_token_valid = database.validate_token(
            connection, old_email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            if database.validate_duplicate_email(connection, new_email):
                return {"response": "Email already exists"}, 400
            if not workshop:
                workshop = None
            else:
                if database.validate_duplicate_workshop():
                    return {"response": "Workshop name already exists"}, 400
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
            return {"response": "Update successful"}, 200
    except ValidationError as e:
        connection.close()
        return e.errors(), 400

# Get mechanics associated to a workshop
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
            return {"response": "Invalid token"}, 401
        else:
            mechanics = database.query_table(
                connection,
                "SELECT user_id, name FROM users WHERE workshop = ? AND role = 1 AND is_deleted = 0",
                (workshop,)
            )
            json_data = [{'user_id': user_id, 'name': name}
                         for user_id, name in mechanics]
            connection.close()
            return jsonify(json_data), 200
    except ValidationError as e:
        return e.errors(), 400

# Disable user
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
            return {"response": "Invalid token"}, 401
        else:
            database.execute_statement(
                connection,
                "UPDATE users SET is_deleted = 1 WHERE user_id = ?",
                (user_id,)
            )
            connection.close()
            return {"response": "Delete successful"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Add work
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
            return {"response": "Invalid token"}, 401
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
            return {"response": "Work added successfully"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Update work
# TODO: Test
@app.route('/update_work', methods=['PUT'])
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
            return {"response": "Invalid token"}, 401
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
            return {"response": "Update successful"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Get works in progress
# TODO: Test
@app.route('/works_in_progress', methods=['GET'])
def works_in_progress():
    data = request.get_json()
    try:
        works_in_progress = WorkInProgress(**data)
        auth_token = works_in_progress.auth_token
        email = works_in_progress.email
        workshop = works_in_progress.workshop

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:  # Get mechanic id to set dropdown easily
            role = database.query_table(
                connection,
                "SELECT role FROM users WHERE email = ?",
                (email,)
            )[0][0]
            if role == 2:
                query_string = """SELECT 
                                    work_id,
                                    start_date,
                                    end_date,
                                    mechanic,
                                    model,
                                    plate,
                                    image,
                                    name
                                FROM 
                                    works
                                INNER JOIN cars ON works.car = cars.car_id
                                INNER JOIN users ON cars.owner = users.user_id
                                WHERE 
                                    works.workshop = ? 
                                    AND works.is_finished = 0"""
                query_fields = (workshop,)
            elif role == 1:
                mechanic = database.query_table(
                    connection,
                    "SELECT user_id FROM users WHERE email = ?",
                    (email,)
                )[0][0]
                query_string = """SELECT 
                                    work_id,
                                    start_date,
                                    end_date,
                                    mechanic,
                                    model,
                                    plate,
                                    image,
                                    name
                                FROM 
                                    works
                                INNER JOIN cars ON works.car = cars.car_id
                                INNER JOIN users ON cars.owner = users.user_id
                                WHERE 
                                    works.mechanic = ?
                                    AND works.workshop = ? 
                                    AND works.is_finished = 0"""
                query_fields = (mechanic, workshop)
            else:
                owner = database.query_table(
                    connection,
                    "SELECT user_id FROM users WHERE email = ?",
                    (email,)
                )[0][0]
                query_string = """SELECT 
                                    work_id,
                                    start_date,
                                    end_date,
                                    mechanic,
                                    model,
                                    plate,
                                    image,
                                    name
                                FROM 
                                    works
                                INNER JOIN cars ON works.car = cars.car_id
                                INNER JOIN users ON cars.owner = users.user_id
                                WHERE 
                                    cars.owner = ?
                                    AND works.workshop = ? 
                                    AND works.is_finished = 0"""
                query_fields = (owner, workshop)
            works = database.query_table(connection, query_string, query_fields)
            json_data = [{
                'work_id': work_id,
                'start_date': start_date,
                'end_date': end_date,
                'mechanic': mechanic,
                'model': model,
                'plate': plate,
                'image': image,
                'owner_name': name
            }
                for work_id, start_date, end_date, mechanic, model, plate, image, name
                in works]
            connection.close()
            return jsonify(json_data), 200
    except ValidationError as e:
        return e.errors(), 400

# Get works done
# TODO: Test
@app.route('/works_done', methods=['GET'])
def works_done():
    data = request.get_json()
    try:
        works_done = WorksDone(**data)
        auth_token = works_done.auth_token
        email = works_done.email
        workshop = works_done.workshop

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            role = database.query_table(
                connection,
                "SELECT role FROM users WHERE email = ?",
                (email,)
            )[0][0]
            if role == 2:
                query_string = """SELECT
                                    works.work_id,
                                    works.start_date,
                                    works.end_date,
                                    mechanic.name AS mechanic_name,
                                    cars.model,
                                    cars.plate,
                                    cars.image,
                                    owner.name AS owner_name
                                FROM 
                                    works
                                    INNER JOIN cars ON works.car = cars.car_id
                                    INNER JOIN users AS owner ON cars.owner = owner.user_id
                                    INNER JOIN users AS mechanic ON works.mechanic = mechanic.user_id
                                WHERE 
                                    works.workshop = ? 
                                    AND works.is_finished = 1"""
                query_fields = (workshop,)
            elif role == 1:
                mechanic = database.query_table(
                    connection,
                    "SELECT user_id FROM users WHERE email = ?",
                    (email,)
                )[0][0]
                query_string = """SELECT 
                                    works.work_id,
                                    works.start_date,
                                    works.end_date,
                                    mechanic.name AS mechanic_name,
                                    cars.model,
                                    cars.plate,
                                    cars.image,
                                    owner.name AS owner_name
                                FROM 
                                    works
                                    INNER JOIN cars ON works.car = cars.car_id
                                    INNER JOIN users AS owner ON cars.owner = owner.user_id
                                    INNER JOIN users AS mechanic ON works.mechanic = mechanic.user_id
                                WHERE 
                                    works.mechanic = ?
                                    AND works.workshop = ? 
                                    AND works.is_finished = 1"""
                query_fields = (mechanic, workshop)
            else:
                owner = database.query_table(
                    connection,
                    "SELECT user_id FROM users WHERE email = ?",
                    (email,)
                )[0][0]
                query_string = """SELECT 
                                    works.work_id,
                                    works.start_date,
                                    works.end_date,
                                    mechanic.name AS mechanic_name,
                                    cars.model,
                                    cars.plate,
                                    cars.image,
                                    owner.name AS owner_name
                                FROM 
                                    works
                                    INNER JOIN cars ON works.car = cars.car_id
                                    INNER JOIN users AS owner ON cars.owner = owner.user_id
                                    INNER JOIN users AS mechanic ON works.mechanic = mechanic.user_id
                                WHERE 
                                    cars.owner = ?
                                    AND works.workshop = ? 
                                    AND works.is_finished = 1"""
                query_fields = (owner, workshop)
            works = database.query_table(connection, query_string, query_fields)
            json_data = [{
                'work_id': work_id,
                'start_date': start_date,
                'end_date': end_date,
                'mechanic_name': mechanic,
                'model': model,
                'plate': plate,
                'image': image,
                'owner_name': name
            }
                for work_id, start_date, end_date, mechanic, model, plate, image, name
                in works]
            connection.close()
            return jsonify(json_data), 200
    except ValidationError as e:
        return e.errors(), 400

# Filter works done
# TODO: Test
@app.route('/works_done_filter', methods=['GET'])
def works_done_filter():
    data = request.get_json()
    try:
        works_done_filter = WorksDoneFilter(**data)
        auth_token = works_done_filter.auth_token
        email = works_done_filter.email
        workshop = works_done_filter.workshop
        model = works_done_filter.model
        owner = works_done_filter.owner
        plate = works_done_filter.plate
        mechanic = works_done_filter.mechanic

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            role = database.query_table(
                connection,
                "SELECT role FROM users WHERE email = ?",
                (email,)
            )[0][0]
            if role == 2:
                query_string = """SELECT 
                                    works.work_id,
                                    works.start_date,
                                    works.end_date,
                                    mechanic.name AS mechanic_name,
                                    cars.model,
                                    cars.plate,
                                    cars.image,
                                    owner.name AS owner_name
                                FROM 
                                    works
                                    INNER JOIN cars ON works.car = cars.car_id
                                    INNER JOIN users AS owner ON cars.owner = owner.user_id
                                    INNER JOIN users AS mechanic ON works.mechanic = mechanic.user_id
                                WHERE 
                                    works.workshop = ? 
                                    AND works.is_finished = 1"""
                query_fields = (workshop,)
            elif role == 1:
                mechanic = database.query_table(
                    connection,
                    "SELECT user_id FROM users WHERE email = ?",
                    (email,)
                )[0][0]
                query_string = """SELECT 
                                    works.work_id,
                                    works.start_date,
                                    works.end_date,
                                    mechanic.name AS mechanic_name,
                                    cars.model,
                                    cars.plate,
                                    cars.image,
                                    owner.name AS owner_name
                                FROM 
                                    works
                                    INNER JOIN cars ON works.car = cars.car_id
                                    INNER JOIN users AS owner ON cars.owner = owner.user_id
                                    INNER JOIN users AS mechanic ON works.mechanic = mechanic.user_id
                                WHERE 
                                    works.mechanic = ?
                                    AND works.workshop = ? 
                                    AND works.is_finished = 1"""
                query_fields = (mechanic, workshop)
            else:
                owner = database.query_table(
                    connection,
                    "SELECT user_id FROM users WHERE email = ?",
                    (email,)
                )[0][0]
                query_string = """SELECT 
                                    works.work_id,
                                    works.start_date,
                                    works.end_date,
                                    mechanic.name AS mechanic_name,
                                    cars.model,
                                    cars.plate,
                                    cars.image,
                                    owner.name AS owner_name
                                FROM 
                                    works
                                    INNER JOIN cars ON works.car = cars.car_id
                                    INNER JOIN users AS owner ON cars.owner = owner.user_id
                                    INNER JOIN users AS mechanic ON works.mechanic = mechanic.user_id
                                WHERE 
                                    cars.owner = ?
                                    AND works.workshop = ? 
                                    AND works.is_finished = 1"""
                query_fields = (owner, workshop)
            search_fields = []
            if model:
                query_string += ' AND cars.model = ?'
                search_fields.append(model)
            if owner:
                query_string += ' AND owner.name = ?'
                search_fields.append(owner)
            if plate:
                query_string += ' AND cars.plate = ?'
                search_fields.append(plate)
            if mechanic:
                query_string += ' AND mechanic.user_id = ?'
                search_fields.append(mechanic)
            works = database.query_table(
                connection,
                query_string,
                query_fields + tuple(search_fields)
            )
            json_data = [{
                'work_id': work_id,
                'start_date': start_date,
                'end_date': end_date,
                'mechanic_name': mechanic,
                'model': model,
                'plate': plate,
                'image': image,
                'owner_name': name
            }
                for work_id, start_date, end_date, mechanic, model, plate, image, name
                in works]
            connection.close()
            return jsonify(json_data), 200
    except ValidationError as e:
        return e.errors(), 400

# Add Service
# TODO: Test
@app.route('/add_service', methods=['POST'])
def add_service():
    data = request.get_json()
    try:
        add_service = AddService(**data)
        auth_token = add_service.auth_token
        email = add_service.email
        name = add_service.name
        price = add_service.price
        workshop = add_service.workshop

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            database.query_table(
                connection,
                """INSERT INTO services (name, price, workshop, is_deleted) VALUES (?, ?, ?, 0);""",
                (name, price, workshop)
            )
            connection.close()
            return {"response": "Row created successfully"}, 201
    except ValidationError as e:
        return e.errors(), 400

# Update Service
# TODO: Test
@app.route('/update_service', methods=['PUT'])
def update_service():
    data = request.get_json()
    try:
        update_service = UpdateService(**data)
        auth_token = update_service.auth_token
        email = update_service.email
        service_id = update_service.service_id
        name = update_service.name
        price = update_service.price

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            database.execute_statement(
                connection,
                "UPDATE services SET name=?, price=? WHERE service_id=?",
                (name, price, service_id)
            )
            connection.close()
            return {"response": "Update successful"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Get Services
# TODO: Test
@app.route('/get_services', methods=['GET'])
def get_services():
    data = request.get_json()
    try:
        get_services = GetServices(**data)
        auth_token = get_services.auth_token
        email = get_services.email
        workshop = get_services.workshop

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            services = database.query_table(
                connection,
                "SELECT service_id, name, price FROM services WHERE workshop = ? AND is_deleted = 0",
                (workshop,)
            )
            json_data = [{'service_id': service_id, 'name': name,
                          'price': price} for service_id, name, price in services]
            connection.close()
            return jsonify(json_data), 200
    except ValidationError as e:
        return e.errors(), 400

# Disable Service
# TODO: Test
@app.route('/disable_service', methods=['PUT'])
def disable_service():
    data = request.get_json()
    try:
        disable_service = DisableService(**data)
        auth_token = disable_service.auth_token
        email = disable_service.email
        service_id = disable_service.service_id

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            database.execute_statement(
                connection,
                "UPDATE services SET is_deleted = 1 WHERE service_id=?",
                (service_id,)
            )
            connection.close()
            return {"response": "Disable successful"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Add service to work
# TODO: Test
@app.route('/add_service_work', methods=['POST'])
def add_service_work():
    data = request.get_json()
    try:
        add_service_work = AddServiceWork(**data)
        auth_token = add_service_work.auth_token
        email = add_service_work.email
        is_finished = add_service_work.is_finished
        work = add_service_work.work
        service = add_service_work.service

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            if not is_finished:
                is_finished = None
            database.query_table(
                connection,
                """INSERT INTO services_works (is_finished, work, service) VALUES (?, ?, ?);""",
                (is_finished, work, service)
            )
            connection.close()
            return {"response": "Row created successfully"}, 201
    except ValidationError as e:
        return e.errors(), 400

# Get work services
# TODO: Test
@app.route('/get_work_services', methods=['GET'])
def get_work_services():
    data = request.get_json()
    try:
        get_work_services = GetWorkServices(**data)
        auth_token = get_work_services.auth_token
        email = get_work_services.email
        work = get_work_services.work

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            services_works = database.query_table(
                connection,
                """SELECT 
                    services_works.services_works_id, 
                    services_works.is_finished, 
                    service.name AS service_name
                FROM 
                    services_works 
                INNER JOIN services AS service ON services_works.service = services.service_id
                WHERE 
                    work = ?""",
                (work,)
            )
            json_data = [{'services_works_id': services_works_id, 'is_finished': is_finished,
                          'price': price} for services_works_id, is_finished, price in services_works]
            connection.close()
            return jsonify(json_data), 200
    except ValidationError as e:
        return e.errors(), 400

# Add car
# TODO: Test
@app.route('/add_car', methods=['POST'])
def add_car():
    data = request.get_json()
    try:
        add_car = AddCar(**data)
        auth_token = add_car.auth_token
        email = add_car.email
        model = add_car.model
        color = add_car.color
        plate = add_car.plate
        image = add_car.image

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            owner = database.query_table(
                connection,
                "SELECT user_id FROM users WHERE email = ?",
                (email,)
            )[0][0]
            database.query_table(
                connection,
                """INSERT INTO cars (model, color, plate, is_deleted, image, owner) VALUES (?, ?, ?, 0, ?, ?);""",
                (model, color, plate, image, owner)
            )
            connection.close()
            return {"response": "Row created successfully"}, 201
    except ValidationError as e:
        return e.errors(), 400

# Edit car
# TODO: Test
@app.route('/edit_car', methods=['PUT'])
def edit_car():
    data = request.get_json()
    try:
        edit_car = EditCar(**data)
        auth_token = edit_car.auth_token
        email = edit_car.email
        model = edit_car.model
        color = edit_car.color
        plate = edit_car.plate
        image = edit_car.image

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            if not is_finished:
                is_finished = None
            database.execute_statement(
                connection,
                "UPDATE cars SET model=?, color=?, image=? WHERE plate=?",
                (model, color, image, plate)
            )
            connection.close()
            return {"response": "Update successful"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Get cars
# TODO: Test
@app.route('/get_cars', methods=['GET'])
def get_cars():
    data = request.get_json()
    try:
        get_cars = GetCars(**data)
        auth_token = get_cars.auth_token
        email = get_cars.email

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            owner = database.query_table(
                connection,
                "SELECT user_id FROM users WHERE email = ?",
                (email,)
            )[0][0]
            cars = database.query_table(
                connection,
                """SELECT car_id, model, color, plate, image FROM cars WHERE owner = ? AND is_deleted = 0""",
                (owner,)
            )
            json_data = [{'car_id': car_id, 'model': model, 'color': color, 'plate': plate,
                          'image': image} for car_id, model, color, plate, image in cars]
            connection.close()
            return jsonify(json_data), 200
    except ValidationError as e:
        return e.errors(), 400

# Disable car
# TODO: Test
@app.route('/disable_car', methods=['PUT'])
def disable_car():
    data = request.get_json()
    try:
        disable_car = DisableCar(**data)
        auth_token = disable_car.auth_token
        email = disable_car.email
        plate = disable_car.plate

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            database.execute_statement(
                connection,
                "UPDATE cars SET is_deleted=1 WHERE plate=?",
                (plate, )
            )
            connection.close()
            return {"response": "Disable successful"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Create update
# TODO: Test
@app.route('/create_update', methods=['POST'])
def create_update():
    data = request.get_json()
    try:
        create_update = CreateUpdate(**data)
        image = create_update.image
        is_finished = create_update.is_finished
        mechanic = create_update.mechanic

        connection = database.create_connection()
        database.query_table(
                connection,
                """INSERT INTO updates (image, is_finished, is_sent, is_deleted, mechanic) VALUES (?, ?, 0, 0, ?);""",
                (image, is_finished, mechanic)
            )
        connection.close()
        return {"response": "Row created successfully"}, 201
    except ValidationError as e:
        return e.errors(), 400

# Get updates
# TODO: Test
@app.route('/get_updates', methods=['GET'])
def get_updates():
    data = request.get_json()
    try:
        get_updates = GetUpdates(**data)
        auth_token = get_updates.auth_token
        email = get_updates.email
        work_id = get_updates.work_id

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            role = database.query_table(
                connection,
                "SELECT role FROM users WHERE email = ?",
                (email,)
            )[0][0]
            if role == 1:
                mechanic = database.query_table(
                    connection,
                    "SELECT user_id FROM users WHERE email = ?",
                    (email,)
                )[0][0]
                query_string = """SELECT 
                                    update_id, 
                                    image, 
                                    is_finished, 
                                    is_sent, 
                                    service_work 
                                FROM 
                                    updates 
                                WHERE 
                                    mechanic = ?
                                    AND is_deleted = 0"""
                query_fields = (mechanic,)
                updates = database.query_table(connection, query_string, query_fields)
                json_data = [{
                    'update_id': update_id,
                    'image': image,
                    'is_finished': is_finished,
                    'is_sent': is_sent,
                    'service_work': service_work
                }
                    for update_id, image, is_finished, is_sent, service_work
                    in updates]
            else:
                query_string = """SELECT 
                                    update_id,
                                    image,
                                    is_finished,
                                    mechanic,
                                    service_work
                                FROM 
                                    updates
                                INNER JOIN services_works ON updates.service_work = services_works.services_works_id
                                INNER JOIN works ON services_works.work = works.work_id
                                WHERE
                                    works.work_id = ?
                                    AND updates.is_sent = 1
                                    AND updates.is_deleted = 0"""
                query_fields = (work_id,)
                updates = database.query_table(connection, query_string, query_fields)
                json_data = [{
                    'update_id': update_id,
                    'image': image,
                    'is_finished': is_finished,
                    'mechanic': mechanic,
                    'service_work': service_work
                }
                    for update_id, image, is_finished, mechanic, service_work
                    in updates]
            connection.close()
            return jsonify(json_data), 200
    except ValidationError as e:
        return e.errors(), 400

# Edit update
# TODO: Test
@app.route('/edit_update', methods=['PUT'])
def edit_update():
    data = request.get_json()
    try:
        edit_update = EditUpdates(**data)
        auth_token = edit_update.auth_token
        email = edit_update.email
        update_id = edit_update.update_id
        service_work = edit_update.service_work

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            database.execute_statement(
                connection,
                "UPDATE updates SET service_work=? WHERE update_id=?",
                (service_work, update_id)
            )
            connection.close()
            return {"response": "Update successful"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Send update
# TODO: Test
@app.route('/send_update', methods=['PUT'])
def send_update():
    data = request.get_json()
    try:
        send_update = SendUpdate(**data)
        auth_token = send_update.auth_token
        email = send_update.email
        update_id = send_update.update_id

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            database.execute_statement(
                connection,
                "UPDATE updates SET is_sent=1 WHERE update_id=?",
                (update_id,)
            )
            connection.close()
            return {"response": "Update sent"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Delete update
# TODO: Test
@app.route('/delete_update', methods=['PUT'])
def delete_update():
    data = request.get_json()
    try:
        delete_update = DeleteUpdate(**data)
        auth_token = delete_update.auth_token
        email = delete_update.email
        update_id = delete_update.update_id

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            database.execute_statement(
                connection,
                "UPDATE updates SET is_sent=0 WHERE update_id=?",
                (update_id,)
            )
            connection.close()
            return {"response": "Update deleted"}, 200
    except ValidationError as e:
        return e.errors(), 400

# Remove update
# TODO: Test
@app.route('/remove_update', methods=['PUT'])
def remove_update():
    data = request.get_json()
    try:
        remove_update = RemoveUpdate(**data)
        auth_token = remove_update.auth_token
        email = remove_update.email
        update_id = remove_update.update_id

        connection = database.create_connection()
        is_token_valid = database.validate_token(connection, email, auth_token)
        if not is_token_valid:
            connection.close()
            return {"response": "Invalid token"}, 401
        else:
            database.execute_statement(
                connection,
                "UPDATE updates SET is_deleted=1 WHERE update_id=?",
                (update_id,)
            )
            connection.close()
            return {"response": "Update removed"}, 200
    except ValidationError as e:
        return e.errors(), 400

# ------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=8000)
