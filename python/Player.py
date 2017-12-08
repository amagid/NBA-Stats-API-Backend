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
    name = name.rstrip()
    player_information[name] = player
    playerID[name] = player_information[name]['personId']
#print player_information['Jordan Clarkson']
positions = list()
positions2 = list()
#G, C, F, F-C, F-G, G-F, C-F player_information[player]['pos']
#group together C and C-F as centers
#G-F will be shooting guards, G and above 6'5
#F-G will be treated like small forwards --> factor in assists
#F will be treated like small forwards unless weight is bigger than 230
#F-C will be power forward

for player in player_information:
    pos = player_information[player]['pos']
    pos2 = player_information[player]['posExpanded']
    if pos not in positions:
        positions.append(pos)
    if pos2 not in positions2:
        positions2.append(pos2)

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

        #print stats_link_param
        response = requests.get(stats_link_param, headers=head)

        keys = response.json()['resultSets'][0]['headers']
        keys = [x.encode('UTF8') for x in keys]
        values = response.json()['resultSets'][0]['rowSet']

        try:
            self.player_dict = dict(zip(keys, values[0]))
        except Exception, e:
            sys.exit("404")

        #for stat in self.player_dict:
            #print stat

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
        position = player_information[self.name]['pos']
        heightFeet = float(player_information[name]['heightFeet'])
        heightInches = float(player_information[name]['heightInches'])
        weight = float(player_information[self.name]['weightPounds'])
        truePos = ''
        if position == 'C-F' or position == 'F':
            truePos = 'C'
        elif position == 'F-C':
            truePos = 'PF'
        elif position == 'F':
            if weight > 230:
                truePos = 'PF'
            else:
                truePos = 'SF'
        elif position == 'F-G':
            truePos = 'SF'
        elif position == 'G-F':
            truePos = 'SG'
        elif position == 'G':
            if heightFeet < 6:
                truePos = 'PG'
            else:
                if heightInches < 4:
                    truePos = 'PG'
                else:
                    truePos = 'SG'
        #print truePos
        type = self.pg_type()
        #print type



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

    def year_over_year(self, statType):
        year_link = ['https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0' \
                    '&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=' \
                    'PerGame&Period=0&PlayerID=', '&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&' \
                    'ShotClockRange=&Split=yoy&VsConference=&VsDivision=']
        year_link = year_link[0] + self.id + year_link[1]
        #print stats_link_param
        response = requests.get(year_link, headers=head)

        keys = response.json()['resultSets'][1]['headers']
        keys = [x.encode('UTF8') for x in keys]
        values = response.json()['resultSets'][1]['rowSet']

        year_dict = dict()

        for year in values:
            season = year[len(year) - 1]
            season_dict = dict(zip(keys, year))
            year_dict[season] = season_dict


        # Points
        # Rebounds
        # Assists
        # Blocks
        # Steals
        # Turnovers
        # Three Pointers
        # Free Throws

        year_over_year = dict()
        for key in keys:
            stat_dict = dict()
            for year in year_dict:
                stat_dict[year] = year_dict[year][key]
            stat_dict = sorted(stat_dict.items())
            year_over_year[key] = stat_dict
        return year_over_year


        # try:
        #     year_dict = dict(zip(keys, values))
        # except Exception, e:
        #     sys.exit("404")

        #print json.dumps(sorted(year_dict.items()))

    #puts more weight on assists
    def pg_score(self):
        type = self.pg_type()
        if type is 'superstar': #weigh wins into the calculation
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
        type = self.sg_type()
        if type is 'superstar': #weigh wins into the calculation
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
        type = self.sf_type()
        if type is 'superstar': #weigh wins into the calculation
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
        type = self.pf_type()
        if type is 'superstar': #weigh wins into the calculation
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
        type = self.c_type()
        if type is 'superstar': #weigh wins into the calculation
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
        if stats['PTS'] > 23:
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
        elif stats['MIN'] / stats['STL'] >= 24:
            return "defensive"
        elif stats['PTS']/stats['AST'] < 2.5:
            return "pass-first"
        elif stats['PTS']/stats['AST'] > 2.5:
            return "scoring"
        else:
            return "around"



    #shooting, all-around scorer, defensive, shooting, all-around, superstar
    def sg_type(self):
        min = stats['MIN']
        if stats['PTS'] > 24:
            if stats['AST'] > 4.5:
                return "superstar"
            else:
                return "scoring"
        elif stats['AST'] > 6:
            if stats['PTS'] > 19:
                return "superstar"
            elif stats['PTS'] > 15:
                return "around"
            else:
                return "pass-first"
        elif (stats['PTS']/min) * 36 > 19:
            return "scoring"
        elif stats['FG3_PCT'] > .375:
            return "shooter"
        elif stats['MIN']/stats['STL'] >= 24:
            return "defensive"
        elif stats['PTS']/stats['AST'] < 2.5:
            return "around"
        elif stats['PTS']/stats['AST'] > 2.5:
            return "scoring"
        else:
            return "around"


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
        player1 = Player(data[2],"Base","2017-18")
        y_over_y = player1.year_over_year("Base")
        print json.dumps(y_over_y)
    if data[1] == 'compare':
        player1 = Player(data[2],"Base","2017-18")
        player2 = Player(data[3],"Base","2017-18")

        print json.dumps(player1.compare_player(player2))

jb = Player("Jimmy Butler", "Base", "2017-18")
jb.year_over_year('Base')
#print jb.player_dict

#run main
if __name__ == '__main__':
    main()


#get player by id --> traditional stats ["get", "id"]
#compare --> running comparison on two players ["compare", id1, id2]
