import requests
import sys
import json

#pull team ids


game_link = 'https://stats.nba.com/stats/leaguegamefinder?Conference=&DateFrom=&DateTo=' \
            '&Division=&DraftNumber=&DraftRound=&DraftYear=&GB=N&LeagueID=00&Location=&Outcome=' \
            '&PlayerOrTeam=T&Season=&SeasonType=&StatCategory=PTS&TeamID=1610612747' \
            '&VsConference=&VsDivision=&VsTeamID='

game_link = game_link.split("Team")

class Game:

    def __init__(self, team1, team2, year):
        if (team1 == "" or team2 == ""):
            sys.exit("400")

        self.teams = (team1, team2)
        self.year = year

        request_link =

    def compare_games(game):


def main():
    data = read_in()
    if data[1] == 'get':
        player1 = Player(data[2],"Base","2016-17")
        print json.dumps(player1.player_dict)
    if data[1] == 'compare':
        player1 = Player(data[2],"Base","2016-17")
        player2 = Player(data[3],"Base","2016-17")

        print json.dumps(player1.compare_player(player2))