from unittest import TestCase
from Player import Player

class TestPlayer(TestCase):

    # tests creating a valid player
    def test_create_validPlayer(self):
        lebron = Player("LeBron James", 'Base', '2016-17')
        westbrook = Player("Russell Westbrook", 'Base', '2016-17')
        pg = Player("Paul George", 'Base', "2016-17")

        self.assertEquals(lebron.id, '2544')
        self.assertEquals(westbrook.id, '201566')
        self.assertEquals(pg.id, '202331')

    # tests creating a player with a non-existing player
    def test_create_nonExistingPlayer(self):
        self.assertEquals(Player("Nate Celeste", 'base', '2016-17'), "404")

    def test_create_nullPlayer(self):
        self.assertEquals(Player("", 'base', '2016-17'), "404")

    # tests creating a player with an invalid stat type
    def test_invalidStatType(self):
        self.assertEquals(Player("LeBron James", 'Fake', '2016-17'), "404")

    # tests creating a player with an invalid season
    def test_invalidSeason(self):
        self.assertEquals(Player("LeBron James", 'Base', '2019-20'), "404")

    # tests comparison of different players
    def test_compare_player(self):
        westbrook = Player("Russell Westbrook", 'Base', '2016-17')
        lebron = Player("LeBron James", 'Base', '2016-17')

        self.assertEqual(westbrook.compare_player(lebron), "Russell Westbrook")

    # tests comparison of same players
    def test_compare_sameplayer(self):
        lebron = Player("LeBron James", 'Base', '2016-17')
        lebron2 = Player("LeBron James", 'Base', '2016-17')

        self.assertEqual(lebron2.compare_player(lebron), "equal")

    # tests getting a player's score for comparison
    def test_get_score(self):
         westbrook = Player("Russell Westbrook", 'Base', '2016-17')
         score = westbrook.select_score()

         self.assertEqual(score, 48.1)

    # tests getting a player's height
    def test_height(self):
        dload = Player("""D'Angelo Russell""", 'Base', '2016-17')
        height = dload.height

        self.assertEqual(height, """6'5\"""")

    # tests getting a player's weight
    def test_weight(self):
        kyrie = Player("Kyrie Irving", 'Base', '2016-17')
        weight = kyrie.weight

        self.assertEqual(weight, "193")

    # tests getting a player's posisiton
    def test_position(self):
        durant = Player("Kevin Durant", 'Base', '2016-17')
        pos = durant.position

        self.assertEqual(pos, 'F')

    # tests getting a player's team
    def test_team(self):
        bigKAT = Player("Karl-Anthony Towns", 'Base', '2016-17')
        team = bigKAT.team

        self.assertEqual(team, "Minnesota Timberwolves")
