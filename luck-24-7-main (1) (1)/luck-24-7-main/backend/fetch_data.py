import requests

import pprint as pretty_printer
import utilities as utilities

try:
    project_key = "RS_P_1650435056524726286"
    api_key = "RS5:cf927d20f07c787dd9b78b928ab3c207"

except KeyError:
    raise Exception('Environment variables "PROJECT_KEY" and "API_KEY" not found')


def gen_token():
    url = "https://api.sports.roanuz.com/v5/core/{}/auth/".format(project_key)
    payload = {"api_key": api_key}
    response = requests.post(url, json=payload)
    token = response.json().get("data").get("token")

    if token is None:
        raise Exception("Token not found")

    return token


def get_data_for_match(match_key, filter_by=None):
    token = gen_token()

    url = "https://api.sports.roanuz.com/v5/cricket/{}/fantasy-match-points/{}/".format(
        project_key, match_key
    )
    headers = {"rs-token": token}

    response = requests.get(url, headers=headers)
    data = response.json().get("data").get("points")

    if data is None:
        raise Exception("Data not found")

    if filter_by == "gt0":
        return utilities.json_to_player(
            list(filter(lambda x: x.get("points") > 0, data))
        )
    elif filter_by == "top15":
        return utilities.json_to_player(
            sorted(data, key=lambda x: x.get("points"), reverse=True)[:15]
        )
    else:
        return utilities.json_to_player(data)
