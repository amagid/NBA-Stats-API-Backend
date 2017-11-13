import numpy
import requests
import pandas as pd
import pickle
import itertools
#import sys
import json

players_link = 'http://www.nba.com/players/active_players.json'
head = {"USER-AGENT":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
response = requests.get(players_link, headers=head)

player_information = dict()

players = response.json()

for player in players:
    player_information[player['firstName'] + ' ' + player['lastName']] = player


class Player:

    def __init__(self, name, statType, year):
        self.name = name
        self.year = year
        self.statType = statType
        #get the player id with name
        self.id= player_information[name]['personId']
        self.stats = dict()
        self.stats['Base'] = 0
        self.stats['Advanced'] = 0
        self.stats['Shooting'] = 0
        self.stats['Hustle'] = 0
        self.stats['Offense'] = 0
        self.stats['Defense'] = 0

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

        self.player_dict = dict(zip(keys, values[0]))
        self.stats[traditional] = self.player_dict



    def get_stats(self, statType):
        stats_link = ['http://stats.nba.com/stats/playerdashboardbygeneralsplits?' \
                      'DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=' \
                      '&MeasureType=', '&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=' \
                                       'N&PerMode=PerGame&Period=0&PlayerID=', '&PlusMinus=N&Rank=N&Season=',
                      '&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&Vs' \
                      'Conference=&VsDivision=']

    #allows for the user to set a date range
    def date_range(self, statType, dateFrom, dateTo):





    def compare_player(self, otherPlayer):
        player_one = self.player_dict['BLK']*2 + self.player_dict['REB'] + self.player_dict['AST'] + self.player_dict['PTS'] - self.player_dict['TOV']
        player_two = otherPlayer.player_dict['BLK']*2 + otherPlayer.player_dict['REB'] + otherPlayer.player_dict['AST'] + otherPlayer.player_dict['PTS'] - otherPlayer.player_dict['TOV']
        print player_one
        print player_two

        if(player_one > player_two):
            return self.name
        else:
            return otherPlayer.name

    def select_info(self):
        x = 2

    def compare_league(self, season):
        season = 'x'

def read_in():
  lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
  
  return json.loads(lines[0])   

def main():
   #data = read_in()
    #data = numpy.array(lines)

   dload = Player(data["name"], 'Base','2016-17')
   #lonzo = Player("Chris Paul", 'Base', '2016-17')
    #lonzo = Player("Chris Paul", 'Base', '2016-17')
   print (dload.player_dict);









link = 'http://stats.nba.com/stats/playerdashboardbygeneralsplits?' \
       'DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=' \
       '&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=' \
       'N&PerMode=PerGame&Period=0&PlayerID=1626156&PlusMinus=N&Rank=N&Season=2016-17' \
       '&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&Vs' \
       'Conference=&VsDivision='

#print main()

other_link = 'http://stats.nba.com/stats/playerdashboardbygeneralsplits?' \
             'DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=' \
             '&MeasureType=Advanced&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame' \
             '&Period=0&PlayerID=1626156&PlusMinus=N&Rank=N&Season=2017-18' \
             '&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&VsConference=&VsDivision='

if __name__ == '__main__':
    main()