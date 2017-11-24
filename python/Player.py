#import numpy
import requests
#import pandas as pd
#import pickle
#import itertools
import sys
import json

players_link = 'http://www.nba.com/players/active_players.json'
head = {"USER-AGENT":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
response = requests.get(players_link, headers=head)

player_information = dict()

players = response.json()

#for front-end
playerID = dict()

for player in players:
    name = player['firstName'] + ' ' + player['lastName']
    player_information[name] = player
    playerID[name] = player_information[name]['personId']



class Player:

    def __init__(self, name, statType, year):
        if name == "":
            sys.exit("400")

        if statType not in ['Base', 'Advanced', 'Misc', 'Four Factors', 'Scoring', 'Opponent',
                            'Usage']:
            sys.exit("404")

        self.name = name
        self.year = year
        self.statType = statType
        try:
            self.id= player_information[name]['personId']
        except Exception, e:
            sys.exit("404")
#        print player_information[name]

        self.stats = dict()
        self.stats['Base'] = 0
        self.stats['Advanced'] = 0
        self.stats['Misc'] = 0
        self.stats['Four Factors'] = 0
        self.stats['Scoring'] = 0
        self.stats['Oponent'] = 0
        self.stats['Usage'] = 0

        #get player basic data
        self.height = player_information[name]['heightFeet'] + """'""" + player_information[name]['heightInches'] + '"'
        self.weight = player_information[name]['weightPounds']
        self.position = player_information[name]['pos']
        self.team = player_information[name]['teamData']['city'] + ' ' + player_information[name]['teamData']['nickname']

        stats_link = ['http://stats.nba.com/stats/playerdashboardbygeneralsplits?' \
                      'DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=' \
                      '&MeasureType=', '&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=' \
                                       'N&PerMode=PerGame&Period=0&PlayerID=', '&PlusMinus=N&Rank=N&Season=',
                      '&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&Vs' \
                      'Conference=&VsDivision=']

        stats_link_param = stats_link[0] + 'Base' + stats_link[1] + self.id + stats_link[2] + self.year + stats_link[
            3]


        response = requests.get(stats_link_param, headers=head)

        keys = response.json()['resultSets'][0]['headers']
        keys = [x.encode('UTF8') for x in keys]
        values = response.json()['resultSets'][0]['rowSet']

        try:
            self.player_dict = dict(zip(keys, values[0]))
        except Exception, e:
            sys.exit("404")

        for stat in self.player_dict:
            print stat

        self.stats['Base'] = self.player_dict



    def get_stats(self, statType):
        stats_link = ['http://stats.nba.com/stats/playerdashboardbygeneralsplits?' \
                      'DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=' \
                      '&MeasureType=', '&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=' \
                                       'N&PerMode=PerGame&Period=0&PlayerID=', '&PlusMinus=N&Rank=N&Season=',
                      '&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&Vs' \
                      'Conference=&VsDivision=']

    #allows for the user to get specific stat type for specific range
    def date_range(self, statType, dateFrom, dateTo):
        ['http://stats.nba.com/stats/playerdashboardbygeneralsplits?' \
         'DateFrom=, &DateTo=, &GameSegment=&LastNGames=0&LeagueID=00&Location=' \
         '&MeasureType=', '&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=' \
                          'N&PerMode=PerGame&Period=0&PlayerID=', '&PlusMinus=N&Rank=N&Season=',
         '&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&Vs' \
         'Conference=&VsDivision=']

        dateFrom = dateFrom.split('/')
        dateFrom = dateFrom[0] + '%2F' + dateFrom[1] + '%2F' + dateFrom[2]
        dateTo = dateTo.split('/')
        dateTo = dateTo[0] + '%2F' + dateTo[1] + '%2F' + dateTo[2]

    def player_score(self):
        type = self.pg_type()
        print type



    def compare_player(self, otherPlayer):
        player_one = self.player_dict['BLK']*2 + self.player_dict['REB'] + self.player_dict['AST'] + self.player_dict['PTS'] - self.player_dict['TOV']
        player_two = otherPlayer.player_dict['BLK']*2 + otherPlayer.player_dict['REB'] + otherPlayer.player_dict['AST'] + otherPlayer.player_dict['PTS'] - otherPlayer.player_dict['TOV']

        if(player_one > player_two):
            return self.name
        elif(player_one == player_two):
            return "equal"
        else:
            return otherPlayer.name

    def select_info(self):
        x = 2

    def compare_league(self, season):
        season = 'x'

    def compare_stat(self, otherPlayer, statType):
        x = 2

    #puts more weight on assists
    def pg_score(self):
        type = self.pg_type()
        if type is 'superstar':
            x = 2
        elif type is 'pass-first':
            x = 2
        elif type is 'scoring':
            x = 2
        elif type is 'around':
            x = 2
        else: #defensive
            x = 2

    #puts more weight on shooting and defense
    def sg_score(self):
        type = self.pg_type()
        if type is 'superstar':
            x = 2
        elif type is 'pass-first':
            x = 2
        elif type is 'scoring':
            x = 2
        elif type is 'around':
            x = 2
        else:  # defensive
            x = 2

    #puts all-around weight
    def sf_score(self):
        type = self.pg_type()
        if type is 'superstar':
            x = 2
        elif type is 'pass-first':
            x = 2
        elif type is 'scoring':
            x = 2
        elif type is 'around':
            x = 2
        else:  # defensive
            x = 2

    #puts weight on shooting (modern NBA) and inside game (rebounding)
    def pf_score(self):
        type = self.pg_type()
        if type is 'superstar':
            x = 2
        elif type is 'pass-first':
            x = 2
        elif type is 'scoring':
            x = 2
        elif type is 'around':
            x = 2
        else:  # defensive
            x = 2

    #puts weight on rebounding and blocks
    def c_score(self):
        type = self.pg_type()
        if type is 'superstar':
            x = 2
        elif type is 'pass-first':
            x = 2
        elif type is 'scoring':
            x = 2
        elif type is 'around':
            x = 2
        else:  # defensive
            x = 2

    #pass-first, scoring, defensive, scoring, all-around, superstar
    def pg_type(self):
        stats = self.player_dict
        # check for superstar status
        if stats['PTS'] > 25:
            if stats['AST'] > 5.5:
                return "superstar"
            else:
                return "scoring"
        elif stats['AST'] > 9:
            if stats['PTS'] > 19:
                return "superstar"
            elif stats['PTS'] > 15:
                return "around"
            else:
                return "pass-first"
        elif stats['STL'] > 1.5:
            return "defensive"
        elif stats['PTS']/stats['AST'] < 2.5:
            return "pass-first"
        elif stats['PTS']/stats['AST'] > 2.5:
            return "scoring"
        else:
            return "around"



    #shooting, all-around scorer, defensive, shooting, all-around, superstar
    def sg_type(self):
        x = 2
        #check for superstar status

    #slasher, defender, scorer, all-around, superstar
    def sf_type(self):
        x = 2
        # check for superstar status

    #labels as a stretch-4, defensive-minded player, scorer, all-around, superstar
    def pf_type(self):
        x = 2
        # check for superstar status

    #labels the center as a defensive player, scorer, all-around, or shooter
    def c_type(self):
        x = 2
        # check for superstar status



link = 'http://stats.nba.com/stats/playerdashboardbygeneralsplits?' \
       'DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=' \
       '&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=' \
       'N&PerMode=PerGame&Period=0&PlayerID=1626156&PlusMinus=N&Rank=N&Season=2016-17' \
       '&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&Vs' \
       'Conference=&VsDivision='

def read_in():
    lines = sys.argv
    # Since our input would only be having one line, parse our JSON data from that
    return lines


def main():
    data = read_in()
    if data[1] == 'get':
        player1 = Player(data[2],"Base","2016-17")
        print json.dumps(player1.player_dict)
    if data[1] == 'compare':
        player1 = Player(data[2],"Base","2016-17")
        player2 = Player(data[3],"Base","2016-17")

        print json.dumps(player1.compare_player(player2))

jc = Player("Jordan Clarkson", "Base", "2016-17")
jc.player_score()

#run main
#if __name__ == '__main__':
    #main()


#get player by id --> traditional stats ["get", "id"]
#compare --> running comparison on two players ["compare", id1, id2]