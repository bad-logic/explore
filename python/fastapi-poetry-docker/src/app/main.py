from fastapi import FastAPI

request_handler = FastAPI()


@request_handler.get("/")
def read_main():
    return {"message": "hello world"}
