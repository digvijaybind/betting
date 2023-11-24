from flask import Flask, jsonify, request
import os

import fetch_data
import utilities
from firebase_conn import fetch_best_player
import prize_distribution


app = Flask(__name__)


def validate_params(request):
    necessary = [
        ("match_id", str),
    ]

    defalut = [
        ("teams", str, 1),
    ]

    for i in necessary:
        if request.args.get(i[0], type=i[1]) is None:
            return (
                jsonify({"Error": f"Missing or invalid parameter: {i}"}),
                400,
            )

    for i in defalut:
        if request.args.get(i[0], type=i[1], default=i[2]) is None:
            return (
                jsonify({"Error": f"Invalid parameter: {i}"}),
                400,
            )

    return None


@app.route("/best", methods=["GET"])
def gen_team_top_n():
    res = validate_params(request)

    if res is not None:
        return res

    match_id = request.args.get("match_id")
    teams = int(request.args.get("teams"))

    if teams > 15120:
        return (
            jsonify({"Error": f"Can't generate more than 15120 teams"}),
            400,
        )

    try:
        players = fetch_data.get_data_for_match(match_id)
    except:
        return (
            jsonify({"Error": f"Match id {match_id} not found"}),
            404,
        )

    return jsonify(utilities.format_data(utilities.gen_best_n(players, teams))), 200


@app.route("/better", methods=["GET"])
def gen_team_better():
    res = validate_params(request)

    if res is not None:
        return res

    pool_name = request.form.get("pool_name")
    match_name = request.form.get("match_name")
    entry_fee = request.form.get("entry_fee")
    pool_id = request.form.get("pool_id")

    for param in [pool_name, match_name, entry_fee, pool_id]:
        if param is None:
            return (
                jsonify(
                    {
                        "Error": f"One or more parameters of the parameters [pool_name, match_name, entry_fee, pool_id] is missing"
                    }
                ),
                400,
            )

    match_id = request.args.get("match_id")
    teams = int(request.args.get("teams"))

    player_list = fetch_best_player(pool_name, match_name, entry_fee, pool_id)

    if (type(player_list) is tuple) and (player_list[0] is None):
        return player_list[1]

    try:
        players = fetch_data.get_data_for_match(match_id)
    except:
        return (
            None,
            (
                jsonify({"Error": f"Match id {match_id} not found"}),
                404,
            ),
        )

    players.sort(key=lambda x: x.rank)

    users: list = utilities.gen_users(players, 10)

    users.sort(key=lambda x: x.points, reverse=True)

    bots_teams = [
        utilities.gen_better_than(player_list, players) for i in range(int(teams))
    ]

    return jsonify(utilities.format_data(bots_teams)), 200


@app.route("/prize", methods=["GET"])
def prize_distribution():
    res = validate_params(request)

    if res is not None:
        return res

    pool_name = request.form.get("pool_name")
    match_name = request.form.get("match_name")
    entry_fee = request.form.get("entry_fee")
    pool_id = request.form.get("pool_id")

    for param in [pool_name, match_name, entry_fee, pool_id]:
        print(param)
        if param is None:
            return (
                jsonify(
                    {
                        "Error": f"One or more parameters of the parameters [pool_name, match_name, entry_fee, pool_id] is missing"
                    }
                ),
                400,
            )

    match_id = request.args.get("match_id")

    res = prize_distribution.distribute_prize(pool_name, match_id, entry_fee, pool_id)

    if res is None:
        return (
            jsonify({"Error": "Could not determine what happened"}),
            500,
        )
    else:
        return res


if __name__ == "__main__":
    app.run(debug=True, port=os.getenv("PORT", default=5000))
