from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from typing import Union
from pydantic import BaseModel
import requests
import random
from package1 import poke_api

class Quiz(BaseModel):
    name: str
    ans_img: str
    shadow_img: str

app = FastAPI()
URL = "https://pokeapi.co/api/v2/pokemon/"

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

@app.exception_handler(RequestValidationError)
async def handler(request:Request, exc:RequestValidationError):
    print(exc)
    return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

@app.get("/")
def hello():
    return {
        "message": "Hello World!"
    }

@app.get("/{id}")
def name(id: int):
    res = requests.get(URL+str(id))
    name = poke_api.get_name(res)
    return {
        "name": name
    }

@app.get("/quiz/")
def quiz():
    id: int = random.randint(1,1010)
    res = requests.get(URL+str(id))
    name = poke_api.get_name(res)
    ans_img = poke_api.get_image(res)
    ans_img_encoded = poke_api.decode_image(ans_img)
    shadow_img = poke_api.fill_image_to_black(ans_img)
    shadow_img_encoded = poke_api.decode_shadow_image(shadow_img)
    return {
        "id": id,
        "name": name,
        "ans_img": ans_img_encoded,
        "shadow_img": shadow_img_encoded
    }

@app.get("/all/")
def name_all():
    name_list = poke_api.get_name_all()
    return {
        "result": name_list
    }