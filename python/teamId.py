import json
import requests
import pandas as pd

teams_link = 'https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision='
head = {
    "USER-AGENT": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
response = requests.get(teams_link, headers=head)

teams = response.json()
team_id = dict()

# for team in teams:
keys = teams["resultSets"][0]['headers']
stats = teams["resultSets"][0]["rowSet"]
keys = [x.encode('UTF8') for x in keys]

#store picture urls
pictures = dict()
teams = pd.read_html('https://en.wikipedia.org/wiki/Wikipedia:WikiProject_National_Basketball_Association/National_Basketball_Association_team_abbreviations')[0]
teams.columns = ['Abbv', 'Name']
teams.drop(teams.index[0], inplace=True)

#add pictures to picture dict
for index, row in teams.iterrows():
    name = row['Name']
    abbv = row['Abbv']
    pictures[name] = "http://stats.nba.com/media/img/teams/logos/season/2016-17/" + abbv + "_logo.svg"


for each in range(len(stats)):
    team_id[stats[each][1]] = stats[each][0]

print json.dumps(team_id)