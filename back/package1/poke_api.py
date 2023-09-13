import requests
import json
import cv2 as cv
import numpy as np
from io import BytesIO
import base64

def get_name(res) -> str:
    json_res = json.loads(res.text)
    species_url = json_res["species"]["url"]
    res_species = requests.get(species_url)
    json_res_species = json.loads(res_species.text)
    names = json_res_species["names"]
    result = None
    for name in names:
        if name["language"]["name"] == "ja":
            result = name["name"]
            break
    return result

def get_name_all() -> list:
    with open("poke_name.json") as f:
        name_json = json.load(f)
    result = []
    for i in range(len(name_json)):
        result.append(name_json[i]["ja"]);
    return result

def get_image(res) -> bytes:
    json_res = json.loads(res.text)
    image_url = json_res["sprites"]["front_default"]
    res_image = requests.get(image_url)
    return res_image.content

def fill_image_to_black(img: bytes) -> bytes:
    image_data = BytesIO(img)
    image = cv.imdecode(np.frombuffer(image_data.read(), np.uint8), -1)
    fill_color = (0, 0, 0)
    alpha_channel = image[:,:, 3]
    filled_image = np.copy(image)
    filled_image[:,:, :3] = np.where(alpha_channel[:,:, np.newaxis] > 0, fill_color, filled_image[:,:, :3])
    return filled_image

def decode_image(img: bytes) -> str:
    return base64.b64encode(img).decode("utf-8")

def decode_shadow_image(img: bytes) -> str:
    return base64.b64encode(cv.imencode('.png', img)[1]).decode()
