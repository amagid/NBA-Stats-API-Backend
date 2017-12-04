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
            Game("New York Fakes", "Minnesota NotRealTeam", "2016-17")
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "400")

    # tests creating a game with invalid year
    def test_create_invalidYearGame(self):
        with self.assertRaises(SystemExit) as cm:
            Game("Minnesota Timberwolves", "Los Angeles Lakers", "2018-19")
        the_exception = cm.exception
        self.assertEqual(the_exception.code, "400")


    # tests a valid comparison
    def test_create_validComparison(self):
        game1 = Game("Minnesota Timberwolves", "Los Angeles Lakers", "2016-17")
        game2 = Game("Minnesota Timberwolves", "Golden State Warriors", "2016-17")

        self.assertEquals(game1.compare_games(game2), "Minnesota Timberwolves performed better against the Los Angeles Lakers")