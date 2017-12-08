from . import Team
from . import teamId

teams_link = 'https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision='
head = {"USER-AGENT":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
response = requests.get(teams_link, headers=head)
teams = response.json()
team_id = dict()

	#for team in teams:
keys = teams["resultSets"][0]['headers']
stats = teams["resultSets"][0]["rowSet"]

for each in range(len(stats)):
    team_id[stats[each][1]] = stats[each][0]


def year_over_year(team_id, **kwargs):
    stats = dict()
    params = ["year1", "year2", "Season_type", "TeamID", "Measure_type"]
    stats["Measure_type"] = "None"
    stats["year1"] = "2017-18"
    stats["year2"] = "2015-16"
    stats["Season_type"] = "Regular+Season"

    for key, value in kwargs.items():
        if key in params:
            stats[key] = value

    link = [
        'https://stats.nba.com/stats/teamdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base',
        '&Month=0&OpponentTeamID=0&Outcome=',
        '&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&TeamID=',
        '&VsConference=&VsDivision=']
    head = {
        "USER-AGENT": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
    super_link = link[0] + link[1] + link[2] + str(team_id) + link[3]
    response = requests.get(super_link, headers=head)
    keys = response.json()['resultSets'][1]['headers']
    values = response.json()['resultSets'][1]['rowSet']
    year_over_year_data = pd.DataFrame(values, columns=keys)
    frame = year_over_year_data
    frame1 = frame["GROUP_VALUE"]
    year_over_year_frame = pd.DataFrame(values, columns=keys, index=frame1)
    return year_over_year_frame.to_json()

class team_averages:
    def __init__(self):
        for each in team_id:
            year_over_year(each)





