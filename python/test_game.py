from unittest import TestCase
from game import Game
import pprint


class TestGame(TestCase):

    # tests creating a valid game
    def test_create_validGame(self):
        game1 = Game("Minnesota Timberwolves", "Los Angeles Lakers", "2016-17")

        self.assertEquals(game1.teams[0], "Minnesota Timberwolves")
        self.assertEquals(game1.teams[1], "Los Angeles Lakers")

    # tests creating a game with the same team as both teams
    def test_create_sameTeamGame(self):
        with self.assertRaises(SystemExit) as cm:
            Game("Minnesota Timberwolves", "Minnesota Timberwolves", "2016-17")
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "400")

    # tests creating a game with null as both teams
    def test_create_invalidGame(self):
        with self.assertRaises(SystemExit) as cm:
            Game("", "", "2016-17")
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "400")

    # tests creating a game with fake teams
    def test_create_fakeGame(self):
        with self.assertRaises(SystemExit) as cm:
            Game("New York Fakes", "Minnesota Timberwolves", "2016-17")
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "404")

        with self.assertRaises(SystemExit) as cm:
            Game("New York Knicks", "Minnesota TimberFakes", "2016-17")
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "404")

    # tests creating a game with invalid year
    def test_create_invalidYearGame(self):
        with self.assertRaises(SystemExit) as cm:
            Game("Minnesota Timberwolves", "Los Angeles Lakers", "2018-19")
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "404")

    # tests a valid comparison
    def test_create_validComparison(self):
        game1 = Game("Minnesota Timberwolves", "Los Angeles Lakers", "2016-17")
        game2 = Game("Minnesota Timberwolves", "Golden State Warriors", "2016-17")
        game3 = Game("Los Angeles Lakers", "Boston Celtics", "2016-17")
        game4 = Game("Los Angeles Lakers", "Golden State Warriors", "2016-17")
        game5 = Game("Los Angeles Lakers", "Minnesota Timberwolves", "2008-09")
        game6 = Game("Golden State Warriors", "Los Angeles Lakers", "2016-17")
        game7 = Game("Golden State Warriors", "Cleveland Cavaliers", "2016-17")
        game8 = Game("Cleveland Cavaliers", "Golden State Warriors", "2016-17")
        game9 = Game("Cleveland Cavaliers", "LA Clippers", "2016-17")

        self.assertEquals(game1.compare_games(game2), "Minnesota Timberwolves performed better against the Los Angeles Lakers")
        self.assertEquals(game2.compare_games(game1), "Minnesota Timberwolves performed better against the Los Angeles Lakers")
        self.assertEquals(game3.compare_games(game4), "Los Angeles Lakers played equally against the Boston Celtics and the Golden State Warriors")
        self.assertEquals(game4.compare_games(game3), "Los Angeles Lakers played equally against the Boston Celtics and the Golden State Warriors")
        self.assertEquals(game5.compare_games(game4), "Los Angeles Lakers performed better against the Minnesota Timberwolves")
        self.assertEquals(game4.compare_games(game5), "Los Angeles Lakers performed better against the Minnesota Timberwolves")
        self.assertEquals(game6.compare_games(game7), "Golden State Warriors performed better against the Los Angeles Lakers")
        self.assertEquals(game7.compare_games(game6), "Golden State Warriors performed better against the Los Angeles Lakers")
        self.assertEquals(game8.compare_games(game9), "Cleveland Cavaliers performed better against the Golden State Warriors")
        self.assertEquals(game9.compare_games(game8), "Cleveland Cavaliers performed better against the Golden State Warriors")


    # tests creating an invalid comparison
    def test_create_invalidComparison(self):
        with self.assertRaises(SystemExit) as cm:
            game1 = Game("Minnesota Timberwolves", "Los Angeles Lakers", "2023-24")
            game2 = Game("Minnesota Timberwolves", "Golden State Warriors", "2023-24")
            game1.compare_games(game2)
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "404")

    # tests a comparison with first teams not matching
    def test_create_invalidTeamComparison(self):
        game1 = Game("Minnesota Timberwolves", "Los Angeles Lakers", "2016-17")
        game2 = Game("Los Angeles Lakers", "Golden State Warriors", "2016-17")

        with self.assertRaises(SystemExit) as cm:
            game1.compare_games(game2)
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "400")

    # tests a comparison with null teams
    def test_create_nullComparison(self):
        with self.assertRaises(SystemExit) as cm:
            game1 = Game("Minnesota Timberwolves", "", "2023-24")
            game2 = Game("", "Golden State Warriors", "2023-24")
            game1.compare_games(game2)
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "400")