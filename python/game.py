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
             '&PlayerPosition=&PlusMinus=N&Rank=N&Season=2016-17&SeasonSegment=&SeasonType=' \
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
            print "Missing a valid team"
            sys.exit("400")

        if(team1 == team2):
            print "Games between the same team don't exist"
            sys.exit("400")

        self.teams = (team1, team2)
        self.year = year
        self.games = list()

        try:
            team_one_id = team_id[team1]
        except:
            print team1 + " do not exist"
            sys.exit("404")

        try:
            team_two_id = team_id[team2]
        except:
            print team2 + " do not exist"
            sys.exit("404")

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

        if len(self.games) == 0:
            print "No Games exist between " + team1 + " and " + team2 + " in " + year
            sys.exit("404")

        self.stats = dict()
        self.stats['W/L'] = self.winlose_to_number()
        self.stats['PLUS_MINUS'] = self.calculate_avg('PLUS_MINUS')
        self.stats['FG_PCT'] = self.calculate_avg('FG_PCT')
        self.stats['FG3_PCT'] = self.calculate_avg('FG3_PCT')
        self.stats['FT_PCT'] = self.calculate_avg('FT_PCT')
        self.stats['AST'] = self.calculate_avg('AST')
        self.stats['BLK'] = self.calculate_avg('BLK')
        self.stats['REB'] = self.calculate_avg('REB')
        self.stats['STL'] = self.calculate_avg('STL')

    # method to compare a team across two matchups
    def compare_games(self, game_two):
        better_matchup = self
        self_WL = self.winlose_to_number()
        self_PLUSMINUS = self.calculate_avg('PLUS_MINUS')
        self_combined_shot = self.calculate_combined_shotPCT()
        game_two_WL = game_two.winlose_to_number()
        game_two_PLUSMINUS = game_two.calculate_avg('PLUS_MINUS')
        game_two_combined_shot = game_two.calculate_combined_shotPCT()


        # check to see if we are comparing two valid teams
        if self.teams[0] != game_two.teams[0]:
            print "teams for comparison don't match"
            sys.exit("400")
        else:

            # If the team for comparison won either game return that game
            if self_WL > game_two_WL:
                better_matchup = self
            elif self_WL < game_two_WL:
                better_matchup = game_two
            else:

                # If the team won or lost both games pick the better team based on PLUS_MINUS
                if self_PLUSMINUS > game_two_PLUSMINUS:
                    better_matchup = self
                elif self_PLUSMINUS < game_two_PLUSMINUS:
                    better_matchup = game_two
                else:

                    #if the teams have equal PLUS_MINUS calculate based on combined shooting percentage
                    if self_combined_shot > game_two_combined_shot:
                        better_matchup = self
                    elif self_combined_shot < game_two_combined_shot:
                        better_matchup = game_two
                    else:
                        return self.teams[0] + " played equally against the " + self.teams[1] + " and the " + game_two.teams[1]

        return self.teams[0] + " performed better against the " + better_matchup.teams[1]

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

    def calculate_combined_shotPCT(self):
        shot_PCT_total = 0
        shot_types = 3

        shot_PCT_total += self.calculate_avg("FG_PCT")
        shot_PCT_total += self.calculate_avg("FG3_PCT")
        shot_PCT_total += self.calculate_avg("FT_PCT")

        return shot_PCT_total / shot_types

    def calculate_avg(self, stat_type):
        total = 0
        total_games = len(self.games)

        for x in range(0, total_games):
            total += self.games[x][stat_type]

        return round(total / total_games, 2)

def read_in():
    lines = sys.argv
    # Since our input would only be having one line, parse our JSON data from that
    return lines

def main():
    data = read_in()
    if data[1] == 'get':
        game1 = Game(data[2],data[3],data[4])
        print json.dumps(game1.stats)
    if data[1] == 'compare':
        game1 = Game(data[2],data[3],data[5])
        game2 = Game(data[2],data[4],data[6])
        print json.dumps(game1.compare_games(game2))


#run main
if __name__ == '__main__':
    main()