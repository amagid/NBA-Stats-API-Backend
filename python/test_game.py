from unittest import TestCase
from game import Game
import pprint

class TestGame(TestCase):
    # tests creating a valid player
    def test_create_validGame(self):
        x = 1

    # for testing purposes
    pp = pprint.PrettyPrinter(indent=4)
    datgame = Game("Los Angeles Lakers", "Boston Celtics", "2016-17")
    datgame2 = Game("Los Angeles Lakers", "Minnesota Timberwolves", "2008-09")
    datgame3 = Game("Minnesota Timberwolves", "Los Angeles Lakers", "2006-07")
    datgame4 = Game("Los Angeles Lakers", "Golden State Warriors", "2016-17")
    pp.pprint(datgame3.games)
    # pp.pprint(datgame4.games)
    # print datgame2.games
    print datgame.compare_games(datgame2)
    print datgame.compare_games(datgame4)
    print datgame.stats
    print datgame2.stats
    print datgame3.stats
    print datgame4.stats
    print datgame.calculate_combined_shotPCT()
    print datgame4.calculate_combined_shotPCT()
    # print datgame3.winlose_to_number()
    # print datgame.compare_games(datgame3)