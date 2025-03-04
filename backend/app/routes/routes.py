from flask_restx import Namespace, Resource

ns_hello = Namespace("hello", description="Hello world")

@ns_hello.route("/")
class HelloWorld(Resource):
    def get(self):
        return {"message": "Hello, World!!"}