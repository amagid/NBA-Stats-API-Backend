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

        self.stats = dict()
        self.stats['W/L'] = self.winlose_to_number()
        self.stats['PLUS_MINUS'] = self.plusminus_avg()
        self.stats['FG_PCT'] = 0
        self.stats['FG3_PCT'] = 0
        self.stats['FT_PCT'] = 0
        self.stats['AST'] = 0
        self.stats['BLK'] = 0
        self.stats['REB'] = 0
        self.stats['STL'] = 0

    # method to compare a team across two matchups
    def compare_games(self, game_two):
        better_matchup = self

        # check to see if we are comparing two valid teams
        if self.teams[0] != game_two.teams[0]:
            print "teams for comparison don't match"
            sys.exit("400")
        else:
            selfWL = self.winlose_to_number()
            game_twoWL = game_two.winlose_to_number()

            # If the team for comparison won either game return that game
            if selfWL > game_twoWL:
                better_matchup = self
            elif game_twoWL > selfWL:
                better_matchup = game_two
            else:

                # If the team won or lost both games pick the better team based on PLUS_MINUS
                if self.plusminus_avg() > game_two.plusminus_avg():
                    better_matchup = self
                elif self.plusminus_avg() < game_two.plusminus_avg():
                    better_matchup = game_two
                else:
                    better_matchup = self
                    # If

        return self.teams[0] + " " + "performed better against the " + better_matchup.teams[1]

    # calculates the average winlose rate for a matchup of two teams
    def winlose_to_number(self):
        winlose_count = 0
        total_games = len(self.games)

        for x in range(0, total_games):
            if self.games[x]["WL"] == "W":
                winlose_count += 1
            else:
                winlose_count -= 1

        return winlose_count / total_games

    # calculates the average plus/minus for a matchup of two teams
    def plusminus_avg(self):
        plusminus_total = 0
        total_games = len(self.games)

        for x in range(0, total_games):
            plusminus_total += self.games[x]["PLUS_MINUS"]

        return plusminus_total / total_games


    def calculate_combined_shotPCT(self, game):
        shot_PCT_total = 0
        shot_types = 3

        shot_PCT_total += self.games[game]["FG_PCT"]
        shot_PCT_total += self.games[game]["FG3_PCT"]



# for testing purposes
pp = pprint.PrettyPrinter(indent=4)
datgame = Game("Los Angeles Lakers", "Boston Celtics", "2016-17")
datgame2 = Game("Los Angeles Lakers", "Minnesota Timberwolves", "2016-17")
datgame3 = Game("Minnesota Timberwolves", "Los Angeles Lakers", "2016-17")
datgame4 = Game("Los Angeles Lakers", "Golden State Warriors", "2016-17")
#pp.pprint(datgame3.games)
#pp.pprint(datgame4.games)
#print datgame2.games
print datgame.compare_games(datgame2)
print datgame.compare_games(datgame4)
#print datgame3.winlose_to_number()
#print datgame.compare_games(datgame3)

def main():
    data = read_in()
    if data[1] == 'get':
        game1 = Game(data[2],data[3],data[4])
        print json.dumps(game1.stats)
    if data[1] == 'compare':
        game1 = Game(data[2],data[3],data[4])
        game2 = Game(data[5],data[6],data[7])

        print json.dumps(game1.compare_games(game2))
