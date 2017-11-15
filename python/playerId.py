import json
import requests

players_link = 'http://www.nba.com/players/active_players.json'
head = {"USER-AGENT":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
response = requests.get(players_link, headers=head)

player_information = dict()

players = response.json()

#for front-end
playerID = list()

#do in curly brace form
for player in players:
    name = player['firstName'] + ' ' + player['lastName']
    player_information[name] = player
    player_dict = dict()
    player_dict['name'] = name
    player_dict['id'] = player_information[name]['personId']
    playerID.append(player_dict)

print json.dumps(playerID)
#changes