from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from package1 import poke_api

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers={"*"},
)

@app.get("/")
async def hello():
    return {
        "message": "Hello World!"
    }

@app.get("/{id}")
async def name(id: int):
    name = poke_api.get_name_from_id(id)
    return {
        "name": name
    }

# @app.get("/quiz")
# async def quiz():