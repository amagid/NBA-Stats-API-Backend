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
		self.oppData = dict()
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



	def helper_find_winner(self,opp_id):
		self.teams_link = []
		self.teams_link = [
			'https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=',
			'&Month=0&OpponentTeamID=',
			'&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2016-17&SeasonSegment=&SeasonType=Regular Season&ShotClockRange=&StarterBench=&TeamID=',
			'&VsConference=&VsDivision=']
		self.stats_link = self.teams_link[0] + self.statType + self.teams_link[1] + str(opp_id) + self.teams_link[
			2] + str(self.Id) + self.teams_link[3]
		response = requests.get(self.stats_link, headers=self.head)
		keys = response.json()['resultSets'][0]['headers']
		values = response.json()['resultSets'][0]['rowSet']
		self.oppData = dict(zip(keys, values[0]))
		return  self.oppData

	def f_winner(self,opp):
		team1 = self.helper_find_winner(opp.Id)
		team2 = opp.helper_find_winner(self.Id)



	def search_team(self, stat_type,year):
		if stat_type not in ['Base', 'Advanced', 'Misc', 'Four Factors', 'Scoring', 'Opponent','Usage']:
			sys.exit("404")
		if year == "":
			sys.exit("404")

		if stat_type == 'Base':
			return self.team_dict

	def helper_search_team(self,**kwargs):
		list_of_params = ["Measure_type","Conference","Outcome","Season","TeamId","Season_type"]
		stats = dict()
		stats["Measure_type"] = "Base"
		stats["Conference"] = ""
		stats["Outcome"] = ""
		stats["Season"] = "2017-18"
		stats["TeamId"] = self.Id
		stats["Season_type"] = "Regular+Season"
		stats["OpponentID"] = str(0)
		link = [
			'https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=',
			'&Month=0&OpponentTeamID=',
			'&Outcome=',
			'&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=',
			'&SeasonSegment=&SeasonType=',
			'&ShotClockRange=&StarterBench=&TeamID=',
			'&VsConference=',
			'&VsDivision=']

		for key,value in kwargs.items():
			if key in list_of_params:
				stats[key] = value


		links = link[0] + stats["Measure_type"] + link[1] + str(stats["OpponentID"]) + link[2] + stats["Outcome"] + link[3] + stats["Season"] + link[4] + stats["Season_type"] + link[5] +str(stats["TeamId"]) + link[6]+ stats["Conference"] + link[7]
		return links

	def search_team_utility(self, **input_dict):
		head = {"USER-AGENT": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
		link = self.helper_search_team(**input_dict)
		response = requests.get(link, headers=head)
		keys = response.json()['resultSets'][0]['headers']
		values = response.json()['resultSets'][0]['rowSet']
		stats = dict(zip(keys,values[0]))
		return stats


	def year_over_year(self,**kwargs):
		params = ["year1","year2","Season_type","TeamID","Measure_type"]
		stats["Measure_type"] = "None"
		stats["year1"] = "2017-18"
		stats["year2"] = "2015-16"
		stats["Season_type"] = "Regular+Season"

		for key,value in kwargs.items():
			if key in params:
				stats[key] = value


		link = ['https://stats.nba.com/stats/teamdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base',
				'&Month=0&OpponentTeamID=0&Outcome=',
				'&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&TeamID=',
				'&VsConference=&VsDivision=']
		head = {"USER-AGENT": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
		super_link = link[0] + link[1] + link[2] + str(self.Id) + link[3]
		response = requests.get(super_link, headers=head)
		keys = response.json()['resultSets'][1]['headers']
		values = response.json()['resultSets'][1]['rowSet']
		self.year_over_year_data = pd.DataFrame(values,columns=keys)
		frame = self.year_over_year_data
		frame1 = frame["GROUP_VALUE"]
		frame = pd.DataFrame(values,columns=keys,index=frame1)
		print frame.loc[stats["year1"]:stats["year2"]]




	def playoff_sim(self,opp):
		stats_wt1 = dict()
		stats_wt2 = dict()
		stats_lt1 = dict()
		stats_lt1 = dict()
		stats_oppt1 = dict()
		stats_oppt2 = dict()
		stats_wt1 = self.helper_search_team(Measure_type = "Base",Season_type = "Regular+Season",Season = "2016-17",Outcome = "W")
		stats_wt2 = opp.helper_search_team(Measure_type = "Base",Season_type = "Regular+Season",Season = "2016-17",Outcome = "W")
		stats_lt1 = self.helper_search_team(Measure_type ="Base",Season_type = "Regular+Season",Season = "2016-17",Outcome = "L" )
		stats_lt2 = opp.helper_search_team(Measure_type = "Base",Season_type = "Regular+Season",Season = "2016-17",Outcome = "L")
		stats_oppt1 = self.helper_search_team(Measure_type = "Base",Season_type = "Regular+Season",Season = "2016-17",OppnentId = opp.Id)
		stats_oppt2 = opp.helper_search_team(Measure_type = "Base",Season_type = "Regular+Season",Season = "2016-17",OppnentId = self.Id)













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
	#team2 = Team("New York Knicks","hello","Base")
	#team1.search_team_utility( Measure_type = "Defense",)
	team1.year_over_year()






if __name__ == '__main__':
	main()
