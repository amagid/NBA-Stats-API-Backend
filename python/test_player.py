from unittest import TestCase
from Player import Player

class TestPlayer(TestCase):
    def test_compare_player(self):
        westbrook = Player("Russell Westbrook", 'Base', '2016-17')
        lebron = Player("LeBron James", 'Base', '2016-17')

        self.assertEqual(westbrook.compare_player(lebron), "Russell Westbrook")

    def test_compare_sameplayer(self):
        lebron = Player("LeBron James", 'Base', '2016-17')
        lebron2 = Player("LeBron James", 'Base', '2016-17')

        self.assertEqual(lebron2.compare_player(lebron), "LeBron James")

    def test_get_score(self):
        westbrook = Player("Russell Westbrook", 'Base', '2016-17')
        score = westbrook.select_score()

        self.assertEqual(score, 48.1)

    def test_height(self):
        dload = Player("""D'Angelo Russell""", 'Base', '2016-17')
        height = dload.height

        self.assertEqual(height, """6'5\"""")

    def test_weight(self):
        kyrie = Player("Kyrie Irving", 'Base', '2016-17')
        weight = kyrie.weight

        self.assertEqual(weight, "193")

    def test_position(self):
        durant = Player("Kevin Durant", 'Base', '2016-17')
        pos = durant.position

        self.assertEqual(pos, 'F')

    def test_team(self):
        bigKAT = Player("Karl-Anthony Towns", 'Base', '2016-17')
        team = bigKAT.team

        self.assertEqual(team, "Minnesota Timberwolves")