import requests
import sys
import json
import pprint

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
        #print request_link
        response = requests.get(request_link, headers=head)

        all_games = response.json()
        #pp = pprint.PrettyPrinter(indent=4)
        ##pp.pprint(all_games)
        keys = all_games["resultSets"][0]['headers']
        games = all_games["resultSets"][0]["rowSet"]
        for game in games:
            self.games.append(dict(zip(keys, game)))

    def compare_games(self, game_two):
        better_matchup = Game
        if self.teams[0] != game_two.teams[0]:
            print "teams for comparison don't match"
            sys.exit("400")
        else:
            selfWL = self.winlose_to_number(0)
            game_twoWL = game_two.winlose_to_number(0)

            if selfWL > game_twoWL:
                better_matchup = self
            elif game_twoWL > selfWL:
                better_matchup = game_two
            else:
                better_matchup = self
                if self.games[0]["PLUS_MINUS"] > game_two.games[0]["PLUS_MINUS"]:
                    better_matchup = self
                else:
                    better_matchup = game_two

        return self.teams[0] + " " + "performed better in the game against the " + better_matchup.teams[1]

    def winlose_to_number(self, game):
        if self.games[game]["WL"] == "W":
            return 1
        else:
            return 0

#for testing purposes
pp = pprint.PrettyPrinter(indent=4)
datgame = Game("Los Angeles Lakers", "Boston Celtics", "2016-17")
datgame2 = Game("Los Angeles Lakers", "Minnesota Timberwolves", "2016-17")
datgame3 = Game("Minnesota Timberwolves", "Los Angeles Lakers", "2016-17")
datgame4 = Game("Los Angeles Lakers", "Golden State Warriors", "2016-17")
#pp.pprint(datgame.games)
#pp.pprint(datgame4.games)
#print datgame2.games
print datgame.compare_games(datgame2)
print datgame.compare_games(datgame4)
#print datgame.compare_games(datgame3)



def main():
    data = read_in()
    if data[1] == 'get':
        game = Player(data[1], data[2],"2016-17")
        print json.dumps(player1.player_dict)
    #if data[1] == 'compare':
        #player1 = Player(data[2],"Base","2016-17")
        #player2 = Player(data[3],"Base","2016-17")

        print json.dumps(player1.compare_player(player2))
