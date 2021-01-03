class Response:
    def __init__(self, status, response=""):
        self.res = {
            "status": status,
            "body": response
        }
    
    def get_res(self):
        return self.res