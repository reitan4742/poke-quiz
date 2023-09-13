import requests
import json

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

def get_name_all():
    poke_list = []
    res_all = requests.get("https://pokeapi.co/api/v2/pokemon/?limit=1010")
    json_res_all = json.loads(res_all.text)
    for i in range(len(json_res_all["results"])):
        res = requests.get("https://pokeapi.co/api/v2/pokemon/"+str(i+1))
        name = get_name(res)
        poke_list.append({
            "ja": name,
            "en": json_res_all["results"][i]["name"]
        })
    with open("test.json", "w") as f:
        json.dump(poke_list, f, indent=4, ensure_ascii=False)

get_name_all()
