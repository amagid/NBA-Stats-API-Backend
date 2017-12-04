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
    datgame5 = Game("Golden State Warriors", "Los Angeles Lakers", "2016-17")
    datgame6 = Game("Golden State Warriors", "Cleveland Cavaliers", "2016-17")
    datgame7 = Game("Cleveland Cavaliers", "Golden State Warriors", "2016-17")
    datgame8 = Game("Los Angeles Clippers", "Boston Celtics", "2016-17")
    pp.pprint(datgame3.games)
    # pp.pprint(datgame4.games)
    # print datgame2.games
    #print datgame5.compare_games(datgame6)
    print datgame7.stats
    #print datgame6.stats
    #print datgame5.calculate_combined_shotPCT()
   # print datgame6.calculate_combined_shotPCT()
    # print datgame3.winlose_to_number()
    # print datgame.compare_games(datgame3)