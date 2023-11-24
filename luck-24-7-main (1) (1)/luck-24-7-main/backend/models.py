class Player:
    def __init__(self):
        self.player_key = None
        self.rank = None
        self.points = None

    def from_json(self, json_data):
        try:
            self.player_key = json_data["player_key"]
        except KeyError:
            self.player_key = json_data["key"]

        self.rank = int(json_data["rank"])
        self.points = int(json_data["points"])

        return self

    def toJSON(self):
        return {"player_key": self.player_key, "rank": self.rank, "points": self.points}

    def __str__(self):
        return str(self.__dict__)

    def __repr__(self):
        return str(self.__dict__)

    def __eq__(self, other):
        return self.player_key == other.player_key


class User:
    def __init__(self, players, points, captain, vice_captain):
        self.players = players
        self.points = points
        self.captain = captain
        self.vice_captain = vice_captain
