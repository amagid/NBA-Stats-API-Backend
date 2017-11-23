import requests
import sys
import json

#define request header
head = {"USER-AGENT":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}


#pull team ids
teams_link = 'https://stats.nba.com/stats/leaguedashteamstats?' \
             'Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=' \
             '&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=' \
             '0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=' \
             '&PlayerPosition=&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=' \
             'Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision='

response = requests.get(teams_link, headers=head)

teams = response.json()
team_id=dict()

keys = teams["resultSets"][0]['headers']
stats = teams["resultSets"][0]["rowSet"]
keys = [x.encode('UTF8') for x in keys]



for team in stats:
    team_id[team[1]] = team[0]

#set up game link
game_link = 'https://stats.nba.com/stats/leaguegamefinder?Conference=&DateFrom=&DateTo=' \
            '&Division=&DraftNumber=&DraftRound=&DraftYear=&GB=N&LeagueID=00&Location=&Outcome=' \
            '&PlayerOrTeam=T&Season=&SeasonType=&StatCategory=PTS&TeamID=' \
            '&VsConference=&VsDivision=&VsTeamID='

game_link = ['https://stats.nba.com/stats/leaguegamefinder?Conference=&DateFrom=&DateTo=' \
            '&Division=&DraftNumber=&DraftRound=&DraftYear=&GB=N&LeagueID=00&Location=&Outcome=' \
            '&PlayerOrTeam=T&Season=', '&SeasonType=&StatCategory=PTS&TeamID=','&VsConference=&VsDivision=&VsTeamID=']

class Game:

    def __init__(self, team1, team2, year):
        if (team1 == "" or team2 == ""):
            sys.exit("400")

        self.teams = (team1, team2)
        self.year = year
        self.games = list()

        team_one_id = team_id[team1]
        team_two_id = team_id[team2]

        request_link = game_link[0] + year + game_link[1] + str(team_one_id) + game_link[2] + str(team_two_id)
        print request_link
        response = requests.get(request_link, headers=head)

        all_games = response.json()
        keys = all_games["resultSets"][0]['headers']
        games = all_games["resultSets"][0]["rowSet"]
        for game in games:
            self.games.append(dict(zip(keys, game)))

    def compare_games(game_two):
        if self.teams[0] != game_two.teams[0]:
            print "teams don't match"
            sys.exit("400")


#for testing purposes
datgame = Game("Los Angeles Lakers", "Boston Celtics", "2016-17")
print datgame.games



def main():
    data = read_in()
    if data[1] == 'get':
        player1 = Player(data[2],"Base","2016-17")
        print json.dumps(player1.player_dict)
    if data[1] == 'compare':
        player1 = Player(data[2],"Base","2016-17")
        player2 = Player(data[3],"Base","2016-17")

        print json.dumps(player1.compare_player(player2))