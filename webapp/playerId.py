import json
import requests

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

print json.dumps(playerID)