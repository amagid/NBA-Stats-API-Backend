import numpy
import requests
import pandas as pd
import pickle
import itertools
import sys
import json



teams_link = 'https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision='
head = {"USER-AGENT":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
response = requests.get(teams_link, headers=head)



teams = response.json()
team_id = dict()

	#for team in teams:
keys = teams["resultSets"][0]['headers']
stats = teams["resultSets"][0]["rowSet"]
keys = [x.encode('UTF8') for x in keys]
	
for each in range(len(stats)): 
	team_id[stats[each][1]]= stats[each][0]


class Team:
	"""docstring for Team"""
	def __init__(self, name,season,statType):
		self.name = name
		self.season = season
		self.statType = statType
		self.Id = team_id[name]
		self.player_link = "https://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=2017-18&TeamID=" + str(self.Id)
       
		plyer_response = requests.get(self.player_link,headers=head)
		self.player_info = dict()
		player_list  = plyer_response.json()
		players = player_list["resultSets"][0]["rowSet"]
		for each in range(len(players)):
			 self.player_info[players[each][3]]= players[each][len(player_list["resultSets"][0]["headers"]) -1]
		
		self.teams_link = ['https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=',
		'&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=',
		'&VsConference=&VsDivision=']
		self.head = {"USER-AGENT":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
		self.stats_link = self.teams_link[0] + self.statType + self.teams_link[1] + str(self.Id) + self.teams_link[2]
		#print self.stats_link
		response = requests.get(self.stats_link, headers=self.head)
		#print response.json()
		keys = response.json()['resultSets'][0]['headers']
		values = response.json()['resultSets'][0]['rowSet']
		self.team_dict = dict(zip(keys,values[0]))
		#print keys

		

	
	def compare_team(self,team2):
		if (self.team_dict["PLUS_MINUS"]> team2.team_dict["PLUS_MINUS"]):
			print self.team_dict["TEAM_NAME"]
		else:
			print team2.team_dict["TEAM_NAME"]





	def find_winner(self,team2):








		







def main():
	# Id = team_id["Boston Celtics"]
	# player_link = "https://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=2017-18&TeamID=" + str(Id)
	# plyer_response = requests.get(player_link,headers=head)
	# player_info = dict()
	# player_list  = plyer_response.json()
	# players = player_list["resultSets"][0]["rowSet"]
	# for each in range(len(players)):
	# 	 player_info[players[each][3]]= players[each][len(player_list["resultSets"][0]["headers"]) -1]
	# print player_info
	team1 = Team("Miami Heat","Hello","Base")
	team2 = Team("New York Knicks","hello","Base")
	print team1.compare_team(team2)






if __name__ == '__main__':
	main()
