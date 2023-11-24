import indian_names
from models import Player, User
from itertools import combinations
import random


def gen_users(players_list, num):
    """
    Generates a list of users with random players
    """
    users = []

    # players_list = list(filter(lambda x: x.points > 0, players_list))

    # if len(players_list) < 11:
    #     players_list.extend(
    #         random.sample(
    #             list(filter(lambda x: x.points == 0, players_list)),
    #             11 - len(players_list),
    #         )
    #     )

    for _ in range(num):
        selected = random.sample(players_list, 11)
        users.append(
            User(
                selected.copy(),
                calc_points(selected, selected[0], selected[1]),
                selected[0],
                selected[1],
            )
        )

    return users[:]


def calc_points(players_list, captain, vice_captain):
    points = 0
    for player in players_list:
        if player == captain:
            points += player.points * 2
        elif player == vice_captain:
            points += player.points * 1.5
        else:
            points += player.points
    return points


def json_to_player(players_list):
    """
    Converts list of players json data to Player objects
    """
    players = []

    for player in players_list:
        p = Player()
        p.from_json(player)
        players.append(p)

    return players.copy()


def gen_better_than(player_lst, players):
    """generate a team from a list of players
    whoose points will be more than the given team-list"""
    new_players = []

    for p in sorted(player_lst, key=lambda x: x.rank, reverse=True):
        # loop through the list of players

        if p.rank >= 2:
            # select a player whoose rank is 1 or 2 less than the current player
            rank = p.rank - (random.randint(1, 2))
            f = list(filter(lambda x: x.rank == rank, players))

            if len(f) == 0:
                # if no player is found, select the current player
                new = p
            else:
                new = random.choice(f)
        else:
            # if the rank is 1 or 2 then select the current player
            new = p

        if new not in new_players:
            # add the player to the new team if it is not already present
            new_players.append(new)
            continue

        else:
            # if the player is already present in the new team
            # then select a player whoose rank is less than the current player
            short = list(filter(lambda x: x.rank < p.rank, players))

            if len(short) == 0:
                # if no player is found, select the current player
                short = list(filter(lambda x: x.rank == p.rank, players))

            # this loop will add a player to the new team
            # if the player is not already present in the new team
            flg = False
            for i in short:
                if i not in new_players:
                    new_players.append(i)
                    flg = True
                    break
            if flg:
                # if a player is added to the new team continue
                continue

            # if all players in "short" are already present in the new team
            # then select a random player from the list of all players
            x = random.choice(players)
            while x in new_players:
                x = random.choice(players)
            new_players.append(x)

    return new_players


def gen_best_n(players, teams):
    generated_teams = []
    players.sort(key=lambda x: x.rank)

    selected = players[:15]

    capt = selected[0]
    vcapt = selected[1]

    others = combinations(selected[2:], 9)

    for i in range(teams):
        team = [capt, vcapt]
        team.extend(next(others))
        generated_teams.append(team)

    return generated_teams


def gen_rand_name():
    lst = [
        "male",
        "male",
        "male",
        "male",
        "male",
        "male",
        "male",
        "male",
        "female",
        "female",
    ]
    random.shuffle(lst)

    return (
        indian_names.get_first_name(gender=random.choice(lst))
        + " "
        + indian_names.get_last_name()
    )


def format_data(lst):
    res = []
    for i in lst:
        usr = {"name": gen_rand_name()}
        usr["players"] = [j.player_key for j in i]
        res.append(usr)

    return res.copy()
