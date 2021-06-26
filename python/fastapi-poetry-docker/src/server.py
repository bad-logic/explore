import uvicorn
from app import request_handler

if __name__ == "__main__":
    uvicorn.run("server:request_handler", host="127.0.0.1",
                port=5000, log_level="info", reload=True)
