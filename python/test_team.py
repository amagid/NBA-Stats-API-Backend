from unittest import TestCase
from Team import Team

class TestTeam(TestCase):

    def test_create_validTeam(self):
        wolves = Team("Minnesota Timberwolves", '2016-17', 'Base')

    def test_create_nonActiveTeam(self):
        self.assertEquals(Team("Minneapolis Lakers", '2016-17', 'Base'), "404")

    def test_create_nonExistentTeam(self):
        self.assertEquals(Team("Monstars", '2016-17', 'Base'), "404")

    def test_create_nullTeam(self):
        self.assertEquals(Team("", '2016-17', 'Base'), "404")

    def test_compare_sameTeam(self):

    def test_compare_nonExistentTeams(self):

    def test_compare_differentValidTeams(self):

