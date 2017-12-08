import json
import requests

players_link = 'http://www.nba.com/players/active_players.json'
head = {"USER-AGENT":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
response = requests.get(players_link, headers=head)

player_information = dict()

players = response.json()
playerID = dict()

for player in players:
    name = player['firstName'] + ' ' + player['lastName']
    name = name.rstrip()
    player_information[name] = player
    playerID[name] = player_information[name]['personId']

stats_link = 'https://stats.nba.com/stats/leaguedashplayerstats?College=' \
             '&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=' \
             '&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00' \
             '&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0' \
             '&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=' \
             '&PlusMinus=N&Rank=N&Season=&SeasonSegment=&SeasonType=Regular+Season&' \
             'ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight='

stats_link = stats_link.split('Season=')
seasons = []

for i in range(1985, 2016):
    second_half = i % 100
    second_half = second_half + 1
    if second_half < 10:
        second_half = '0' + str(second_half)
    else:
        second_half = str(second_half)
    season_string = str(i) + '-' + second_half
    seasons.append(season_string)

stats_link = stats_link[0] + "Season=" + '2016-17' + stats_link[1]
response = requests.get(stats_link, headers=head)
response = response.json()

headers = response['resultSets']
stats = response['rowSet']
print headers
print stats

#Points
#Rebounds
#Assists
#Blocks
#Steals
#Turnovers
#Three Pointers
#Free Throws



