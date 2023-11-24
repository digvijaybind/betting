import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask.json import jsonify

from fetch_data import get_data_for_match
from utilities import calc_points

cred = credentials.Certificate("./luck24-7-05fb79646d78.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()


def ids_to_player(all_players, lst, c, vc):
    new_c = next(filter(lambda x: x.player_key == c, all_players))
    new_vc = next(filter(lambda x: x.player_key == vc, all_players))

    new_lst = [
        new_c,
        new_vc,
    ]
    lst.pop(lst.index(c))
    lst.pop(lst.index(vc))

    for p in lst:
        new_lst.append(next(filter(lambda x: x.player_key == p, all_players)))

    return new_lst


def fetch_best_player(pool_name, match_id, entry_fee, pool_id):
    doc_ref = (
        db.collection("pools")
        .document(pool_name)
        .collection("matchName")
        .document(match_id)
        .collection("entryFee")
        .document(entry_fee)
        .collection("pool")
        .document(pool_id)
    )

    doc = doc_ref.get()
    if not doc.exists:
        return (
            jsonify({"Error": f"Match id {match_id} not found"}),
            404,
        )

    max = 0
    max_list = []
    data = doc.to_dict().get("user")
    all_players = get_data_for_match(match_id)

    for user in data:
        sel_players = [p.get("key") for p in user.get("DATA").get("players")]
        c = user.get("DATA").get("caption").get("key")
        vc = user.get("DATA").get("viceCaption").get("key")

        players = ids_to_player(all_players, sel_players, c, vc)

        points = calc_points(players, players[0], players[1])

        if points >= max:
            max = points
            max_list = players.copy()

    return max_list


def fetch_users_teams(pool_name, match_id, entry_fee, pool_id):
    doc_ref = (
        db.collection("pools")
        .document(pool_name)
        .collection("matchName")
        .document(match_id)
        .collection("entryFee")
        .document(entry_fee)
        .collection("pool")
        .document(pool_id)
    )

    doc = doc_ref.get()
    if not doc.exists:
        return (
            jsonify({"Error": f"Match id {match_id} not found"}),
            404,
        )

    data = doc.to_dict().get("user")

    return data


def add_amount(amount, mob_num):
    doc_ref = db.collection("Users").document(mob_num)
    doc = doc_ref.get()
    if not doc.exists:
        return (
            jsonify({"Error": f"User with mobile number {mob_num} not found"}),
            404,
        )

    doc_dict = doc.to_dict()
    doc_dict["winningAmount"] += amount
    doc_ref.set(doc_dict)

    return jsonify({"Success": "Amount added"}), 200
