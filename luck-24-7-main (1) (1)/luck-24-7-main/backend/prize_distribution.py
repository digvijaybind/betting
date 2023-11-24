from flask.json import jsonify
import fetch_data
import firebase_conn
import utilities
import json


def id_to_player(id, all_players):
    player = list(filter(lambda x: x.player_key == id, all_players))
    if len(player) == 0:
        raise Exception(f"Player with id {id} not found")
    return player[0]


def distribute_prize(pool_name, match_id, entry_fee, pool_id):
    try:
        # get all player for a match_id
        all_players = fetch_data.get_data_for_match(match_id)
    except:
        return (
            jsonify({"Error": f"Match id {match_id} not found"}),
            404,
        )
    # get the teams of all users for a match_id
    user_data = firebase_conn.fetch_users_teams(pool_name, match_id, entry_fee, pool_id)

    if type(user_data) is tuple:
        if user_data[1] != 200 or user_data is None:
            return (
                jsonify({"Error": "unable to find data for the given parameters"}),
                404,
            )

    user_points = []
    try:
        for usr in user_data:
            sel_players = [p.get("key") for p in usr.get("DATA").get("players")]
            c = usr.get("DATA").get("caption").get("key")
            vc = usr.get("DATA").get("viceCaption").get("key")

            users_team = [
                id_to_player(c, all_players),
                id_to_player(vc, all_players),
            ]
            sel_players.remove(c)
            sel_players.remove(vc)
            users_team.extend([id_to_player(p, all_players) for p in sel_players])

            # calculate points for each user
            points = utilities.calc_points(users_team, users_team[0], users_team[1])
            user_points.append((usr.get("mobileNumber"), points))

        # sort users by points
        user_points.sort(key=lambda x: x[1], reverse=True)
        user_ranks = {}
    except Exception as e:
        return jsonify({"Error": "Error in calculating points"}), 500

    try:
        # assign rankings to the users
        curr_rank = 1000
        for i, (user, points) in enumerate(user_points):
            if i == 0:
                user_ranks[curr_rank] = [user]
            else:
                if points == user_points[i - 1][1]:
                    user_ranks[curr_rank].append(user)
                else:
                    curr_rank += 1
                    user_ranks[curr_rank] = [user]
    except Exception as e:
        return jsonify({"Error": "Unable to assign ranks to users"}), 500

    try:
        # impoet json from json file
        with open("./distribution_rules.json", "r") as f:
            data = json.load(f)

        if data.get("49") is None or data.get("49").get("leaderboard") is None:
            return (
                jsonify({"Error": f"Invalid prize distribution rules for given data"}),
                500,
            )

        ranks = sorted(list(user_ranks.keys()))
        for prize in data.get("49").get("leaderboard"):
            for r in ranks:
                if r <= prize.get("rankTo") and r >= prize.get("rankFrom"):
                    winning_amt = prize.get("prize") / len(user_ranks.get(r))
                    for w in user_ranks.get(r):
                        res = firebase_conn.add_amount(winning_amt, w)
                        if res[1] != 200:
                            return res
    except Exception as e:
        return jsonify({"Error": "Unable to distribute prize"}), 500

    return jsonify({"Success": "Prize distributed successfully"}), 200
