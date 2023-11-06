import sqlite3
from sqlite3 import Error

database = "pythonsqlite.db"

def create_connection():
    """ create a database connection to a SQLite database
    :return: database connection
    """
    db_connection = None
    try:
        db_connection = sqlite3.connect(database)
        return db_connection
    except Error as e:
        print(e)

    return db_connection

def create_table(db_connection, create_table_sql):
    """ create a table from the create_table_sql statement
    :param db_connection: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = db_connection.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

def execute_statement(db_connection, statement, data):
    """
    Create a new project into the projects table
    :param db_connection: Connection object
    :param statement: a SQLite statement
    :param data: Data for statement
    :return: row id
    """
    cur = db_connection.cursor()
    cur.execute(statement, data)
    db_connection.commit()
    return cur.lastrowid

def query_table(db_connection, statement, data):
    """
    Create a new project into the projects table
    :param db_connection: Connection object
    :param statement: a SQLite query statement
    :param data: Data for statement
    :return: rows that match statement
    """
    cur = db_connection.cursor()
    cur.execute(statement, data)

    return cur.fetchall()


def validate_duplicate_email(db_connection, email):
    """
    Validates email is unique
    :param db_connection: Connection object
    :param email: Email to validate
    :return: True if valid, false if not
    """
    cur = db_connection.cursor()
    cur.execute("SELECT * FROM users WHERE email = ?", (email,))
    existing_user = cur.fetchone()

    if existing_user:
        return False
    else:
        return True


def login_user(db_connection, email, auth_token):
    """
    Saves token for user
    :param db_connection: Connection object
    :param email: Email to login
    :param token: Auth token
    :return: None
    """
    cur = db_connection.cursor()
    cur.execute("INSERT INTO login_session (email, auth_token) VALUES (?, ?)", (email, auth_token))
    db_connection.commit()


def update_user_token(db_connection, email, auth_token):
    """
    Updates token for user
    :param db_connection: Connection object
    :param email: Email to login
    :param auth_token: Auth token
    :return: None
    """
    cur = db_connection.cursor()
    cur.execute("UPDATE login_session SET auth_token=? WHERE email=?", (auth_token, email))
    db_connection.commit()


def check_if_user_logged_in(db_connection, email):
    """
    Checks if user is logged in
    :param db_connection: Connection object
    :param email: Email to validate
    :return: True if logged in, false if not
    """
    cur = db_connection.cursor()
    cur.execute("SELECT * FROM login_session WHERE email = ?", (email,))
    is_logged_in = cur.fetchone()

    if is_logged_in:
        return True
    else:
        return False


def validate_token(db_connection, email, auth_token):
    """
    Checks if token is valid
    :param db_connection: Connection object
    :param email: Email to validate
    :param auth_token: Auth token
    :return: True if valid, false if not
    """
    cur = db_connection.cursor()
    cur.execute("SELECT * FROM login_session WHERE email = ? AND auth_token = ?", (email, auth_token))
    is_logged_in = cur.fetchone()

    if is_logged_in:
        return True
    else:
        return False


def logout_user(db_connection, email):
    """
    Deletes user and token from login session table
    :param db_connection: Connection object
    :param email: Email to logout
    :return: None
    """
    cur = db_connection.cursor()
    cur.execute("DELETE FROM login_session WHERE email = ?", (email,))
    db_connection.commit()


def main():
    sql_create_workshops_table = """ CREATE TABLE IF NOT EXISTS workshops (
                                        workshop_id integer PRIMARY KEY AUTOINCREMENT,
                                        name text NOT NULL
                                    ); """
    
    sql_create_services_table = """ CREATE TABLE IF NOT EXISTS services (
                                        service_id integer PRIMARY KEY AUTOINCREMENT,
                                        name text NOT NULL,
                                        price integer NOT NULL,
                                        workshop integer NOT NULL,
                                        is_deleted integer NOT NULL,
                                        FOREIGN KEY (workshop) REFERENCES workshops (workshop_id)
                                    ); """

    sql_create_users_table = """ CREATE TABLE IF NOT EXISTS users (
                                        user_id integer PRIMARY KEY AUTOINCREMENT,
                                        name text NOT NULL,
                                        email text NOT NULL,
                                        role integer NOT NULL,
                                        phone text,
                                        password text NOT NULL,
                                        is_deleted integer NOT NULL,
                                        workshop integer,
                                        FOREIGN KEY (workshop) REFERENCES workshops (workshop_id)
                                    ); """

    sql_create_cars_table = """ CREATE TABLE IF NOT EXISTS cars (
                                        car_id integer PRIMARY KEY AUTOINCREMENT,
                                        model text NOT NULL,
                                        color text NOT NULL,
                                        plate text NOT NULL,
                                        is_deleted integer NOT NULL,
                                        image blob,
                                        owner integer NOT NULL,
                                        FOREIGN KEY (owner) REFERENCES users (user_id)
                                    ); """

    sql_create_works_table = """ CREATE TABLE IF NOT EXISTS works (
                                        work_id integer PRIMARY KEY AUTOINCREMENT,
                                        start_date text,
                                        end_date text,
                                        is_finished integer,
                                        car integer NOT NULL,
                                        mechanic integer,
                                        workshop integer NOT NULL,
                                        FOREIGN KEY (car) REFERENCES cars (car_id),
                                        FOREIGN KEY (mechanic) REFERENCES users (user_id),
                                        FOREIGN KEY (workshop) REFERENCES workshops (workshop_id)
                                    ); """

    sql_create_services_works_table = """ CREATE TABLE IF NOT EXISTS services_works (
                                        services_works_id integer PRIMARY KEY AUTOINCREMENT,
                                        is_finished integer,
                                        work integer NOT NULL,
                                        service integer NOT NULL,
                                        FOREIGN KEY (work) REFERENCES works (work_id),
                                        FOREIGN KEY (service) REFERENCES services (service_id)
                                    ); """

    sql_create_updates_table = """ CREATE TABLE IF NOT EXISTS updates (
                                        update_id integer PRIMARY KEY AUTOINCREMENT,
                                        image blob NOT NULL,
                                        is_finished integer,
                                        mechanic integer NOT NULL,
                                        service_work integer NOT NULL,
                                        FOREIGN KEY (mechanic) REFERENCES users (user_id),
                                        FOREIGN KEY (service_work) REFERENCES services_works (services_works_id)
                                    ); """

    sql_create_login_session_table = """ CREATE TABLE IF NOT EXISTS login_session (
                                        login_session_id integer PRIMARY KEY AUTOINCREMENT,
                                        email text NOT NULL,
                                        auth_token text NOT NULL
                                    ); """

    # create a database connection
    db_connection = create_connection()

    # create tables
    if db_connection is not None:
        # create workshops table
        create_table(db_connection, sql_create_workshops_table)

        # create services table
        create_table(db_connection, sql_create_services_table)
        
        # create users table
        create_table(db_connection, sql_create_users_table)

        # create cars table
        create_table(db_connection, sql_create_cars_table)
        
        # create works table
        create_table(db_connection, sql_create_works_table)

        # create services_works table
        create_table(db_connection, sql_create_services_works_table)

        # create updates table
        create_table(db_connection, sql_create_updates_table)

        # create login sessions table
        create_table(db_connection, sql_create_login_session_table)

        db_connection.close()
    else:
        print("Error! cannot create the database connection.")

if __name__ == '__main__':
    main()
