import psycopg2
import bcrypt
import string
import time

class Connection:
    def __init__(self, database, user, password, host, port="5432"):
        self.database = database
        self.user = user
        self.password = password
        self.host = host
        self.port = port

    def create_connection(self):
        return psycopg2.connect(database=self.database, user=self.user, password=self.password, host=self.host, port=self.port)

    def generate_access_token(self, username):
        return bcrypt.hashpw(bytes(f"{username}_{str(time.time())}", "utf-8"), bcrypt.gensalt()).decode("utf-8")

    def get_user(self, username:str, password:str):
        connection = self.create_connection()
        cur = connection.cursor()
        
        query = "SELECT * FROM users WHERE username=%s;"

        result = 0
        access_token = ""

        try:
            cur.execute(query, (username,))
            one_row = cur.fetchone()

            if one_row != None:
                hashed_password = one_row[2]

                if bcrypt.checkpw(bytes(password, "utf-8"), bytes(hashed_password, "utf-8")):
                    result = 1
                    access_token = self.generate_access_token(username)
                    insert_query = "UPDATE users SET access_token=%s WHERE username=%s"
                    cur.execute(insert_query, (access_token, username))

        except Exception as e:
            print(str(e))
            
        connection.commit()
        cur.close()
        connection.close()

        return result, {
            "ccms_access_token": access_token
        }

    def create_user(self, username:str, password:str):

        connection = self.create_connection()

        cur = connection.cursor()
        query = "INSERT INTO users (username, password) VALUES (%s, %s)"

        result = 0        
        msg = ""

        try:
            hashed_password = bcrypt.hashpw(bytes(password, "utf-8"), bcrypt.gensalt())
            hashed_password = hashed_password.decode("utf-8")

            cur.execute(query, (username, hashed_password, ))
            result = 1
        except Exception as e:
            msg = str(e)

        connection.commit()
        cur.close()
        connection.close()

        return result, {
            "msg": msg
        }
    
    def update_user(self, username:str, password:str):
        connection = self.create_connection()

        cur = connection.cursor()
        query = "UPDATE users SET password=%s WHERE username=%s"

        result = 0        
        msg = ""

        try:
            cur.execute(query, (password, username ))
            result = 1
        except Exception as e:
            msg = str(e)

        connection.commit()
        cur.close()
        connection.close()

        return result, {
            "msg": msg
        }

    
    def delete_user(self, username:str):
        connection = self.create_connection()

        cur = connection.cursor()
        query = "DELETE FROM users WHERE username=%s"

        result = 0        
        msg = ""

        try:
            cur.execute(query, (password, username ))
            result = 1
        except Exception as e:
            msg = str(e)

        connection.commit()
        cur.close()
        connection.close()

        return result, {
            "msg": msg
        }

    
    
    def user_is_admin(self, username:str):
        pass

    
    def get_user_from_token(self, token:str, username:str):
        pass


    def token_is_valid(self, token:str, username:str):
        pass


    