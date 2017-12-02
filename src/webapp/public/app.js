var app = angular.module('nbaApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.disableTheming();
});
app.controller('myController', function($scope, $http) {
  $scope.myJWT = window.localStorage.getItem("NBA-JWT");
  console.log($scope.myJWT);
  $scope.registerFn = function() {    //TODO update firstname and lastname
    console.log("Registering")
    console.log({email: $scope.register.username, password: $scope.register.password, fname: 'FirstName', lname: 'LastName'})
    $http.post('/auth/signup', {email: $scope.register.username, password: $scope.register.password, fname: 'FirstName', lname: 'LastName'}).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
      // TODO tell user if the verification email was successfully sent -- might have to base on error code number

      // this callback will be called asynchronously
      // when the response is available
    }, function(response) {
      console.log("There was an error getting init data!");
      console.log(response.data);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }

  $scope.loginFn = function() {
    $http.post('/auth/login', {email: $scope.login.username, password: $scope.login.password}).
    then(function(response) {
      //$scope.player1data = response.data
      $scope.players = response['data'];
      window.localStorage.setItem("NBA-JWT", response.data.token);
      // this callback will be called asynchronously
      // when the response is available
    }, function(response) {
      console.log("There was an error getting init data!");
      console.log(response.data);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }

  $scope.betterPlayer = {};
  $scope.players = [];
  $scope.year = {};
  $scope.teams = [];

  $scope.currentModel = [];

  $scope.modes = ['Base', 'Advanced', 'Miscellaneous', 'Scoring', 'Opponent', 'Usage', 'Clutch'];
  $scope.modeSelect = $scope.modes[0];

  $scope.years = ['2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17'];
  $scope.year.team1 = '2016-17';
  $scope.year.team3 = '2016-17';

  $scope.gamesCats = ['Ave Win/Loss', 'Ave Plus/Minus', 'Ave FG %', 'Ave 3-Point %', 'Ave Free Throw %', 'Ave Assists', 'Ave Blocks', 'Ave Rebounds', 'Ave Steals'];

  $scope.dataModels = [
    {
      'type': 'base',
      'fields': [
        {
          'att': 'PTS',
          'name': 'Points / Game'
        },
        {
          'att': 'REB',
          'name': 'Rebounds / Game'
        },
        {
          'att': 'AST',
          'name': 'Assists / Game'
        },
        {
          'att': 'BLK',
          'name': 'Blocks / Game'
        },
        {
          'att': 'STL',
          'name': 'Steals / Game'
        },
        {
          'att': 'TOV',
          'name': 'Turnovers / Game'
        },
        {
          'att': 'FG3M',
          'name': 'Three Pointers / Game'
        },
        {
          'att': 'FTM',
          'name': 'Free Throws / Game'
        }
      ]
    },
    {
      'type': 'opponent',
      'fields': [
        {
          'att': "W_PCT",
          'name': "Win %"
        },
        {
          'att': 'OPP_FGM',
          'name': 'FG'
        },
        {
          'att': 'OPP_FG_PCT',
          'name': 'FG %'
        },
        {
          'att': 'OPP_FG3M',
          'name': 'Three Pointers'
        },
        {
          'att': 'OPP_FG3_PCT',
          'name': 'Three Pointer %'
        },
        {
          'att': 'OPP_FTM',
          'name': 'TODO'
        },
        {
          'att': 'OPP_FTA',
          'name': 'FT Attempt Rate'
        },
        {
          'att': 'OPP_FT_PCT',
          'name': 'FT %'
        },
        {
          'att': 'OPP_OREB',
          'name': 'Offensive Rebounds'
        },
        {
          'att': 'OPP_DREB',
          'name': 'Defensive Rebounds'
        },
        {
          'att': 'OPP_REB',
          'name': 'Rebounds'
        },
        {
          'att': 'OPP_AST',
          'name': 'Assists'
        },
        {
          'att': 'OPP_TOV',
          'name': 'Turnovers'
        },
        {
          'att': 'OPP_STL',
          'name': 'Steals'
        },
        {
          'att': 'OPP_BLK',
          'name': 'Blocks'
        }
      ]
    },
    {
      'type': 'scoring',
      'fields': [
        {
          'att': 'W_PCT',
          'name': 'Win %'
        },
        {
          'att': 'PCT_FGA_2PT',
          'name': 'TODO'
        },
        {
          'att': 'PCT_FGA_3PT',
          'name': 'TODO'
        },
        {
          'att': 'PCT_PTS_2PT',
          'name': 'Two Pointers'
        },
        {
          'att': 'PCT_PTS_2PT_MR',
          'name': 'TODO'
        },
        {
          'att': 'PCT_PTS_MidRange',
          'name': 'TODO'
        },
        {
          'att': 'PCT_PTS_3PT',
          'name': 'TODO'
        },
        {
          'att': 'PCT_PTS_FB',
          'name': 'TODO'
        },
        {
          'att': 'PCT_PTS_FT',
          'name': 'TODO'
        },
        {
          'att': 'PCT_PTS_OFF_TOV',
          'name': 'TODO'
        },
        {
          'att': 'PCT_PTS_PAINT',
          'name': 'TODO'
        },
        {
          'att': 'PCT_AST_2PM',
          'name': 'TODO'
        },
        {
          'att': 'PCT_AST_3PM',
          'name': 'TODO'
        },
        {
          'att': 'PCT_AST_FGM',
          'name': 'TODO'
        }
      ]
    },
    {
      'type': 'miscellaneous',
      'fields': [
        {
          'att': 'W_PCT',
          'name': 'TODO'
        },
        {
          'att': 'PTS_OFF_TOV',
          'name': 'TODO'
        },
        {
          'att': 'PTS_2ND_CHANCE',
          'name': 'TODO'
        },
        {
          'att': 'PTS_FB',
          'name': 'Fast Break Points'
        },
        {
          'att': 'PTS_PAINT',
          'name': 'TODO'
        },
        {
          'att': 'OPP_PTS_OFF_TOV',
          'name': 'TODO'
        },
        {
          'att': 'OPP_PTS_2ND_CHANCE',
          'name': 'TODO'
        },
        {
          'att': 'OPP_PTS_FB',
          'name': 'TODO'
        },
        {
          'att': 'OPP_PTS_PAINT',
          'name': 'TODO'
        }
      ]
    },
    {
      'type': 'four factors',
      'fields': [
        {
          'att': 'W_PCT',
          'name': 'Win %'
        },
        {
          'att': 'EFG_PCT',
          'name': 'Effective FG %'
        },
        {
          'att': 'FTA_RATE',
          'name': 'FT Attempt Rate'
        },
        {
          'att': 'TM_TOV_PCT',
          'name': 'Turnover %'
        },
        {
          'att': 'OREB_PCT',
          'name': 'OREB %'
        },
        {
          'att': 'OPP_EFG_PCT',
          'name': 'Effective FG %'
        },
        {
          'att': 'OPP_FTA_RATE',
          'name': 'FT Rate'
        },
        {
          'att': 'OPP_TOV_PCT',
          'name': 'TO %'
        },
        {
          'att': 'OPP_OREB_PCT',
          'name': 'OREB %'
        }
      ]
    },
      {
        'type': 'advanced',
        'fields': [
          {
            'att': 'W_PCT',
            'name': 'Win %'
          },
          {
            'att': 'OFF_RATING',
            'name': 'TODO'
          },
          {
            'att': 'DEF_RATING',
            'name': 'TODO'
          },
          {
            'att': 'NET_RATING',
            'name': 'TODO'
          },
          {
            'att': 'AST_PCT',
            'name': 'Assist %'
          },
          {
            'att': 'AST_TO',
            'name': 'TODO'
          },
          {
            'att': 'AST_RATIO',
            'name': 'TODO'
          },
          {
            'att': 'OREB_PCT',
            'name': 'OREB %'
          },
          {
            'att': 'DREB_PCT',
            'name': 'DREB %'
          },
          {
            'att': 'REB_PCT',
            'name': 'Rebound %'
          },
          {
            'att': 'TM_TOV_PCT',
            'name': 'Turnover %'
          },
          {
            'att': 'EFG_PCT',
            'name': 'Effective FG %'
          },
          {
            'att': 'TS_PCT',
            'name': 'True Shooting'
          },
          {
            'att': 'PACE',
            'name': 'Pace'
          },
          {
            'att': 'PIE',
            'name': 'Player Impact Estimate'
          }
        ]
      },
      {
        'type': 'traditional',
        'fields': [
          {
            'att': 'W',
            'name': 'Wins'
          },
          {
            'att': 'L',
            'name': 'Losses'
          },
          {
            'att': 'FG_PCT',
            'name': 'FG %'
          },
          {
            'att': 'FG3M',
            'name': '3 PT'
          },
          {
            'att': 'FG3_PCT',
            'name': '3 PT %'
          },
          {
            'att': 'FT_PCT',
            'name': 'Free Throw %'
          },
          {
            'att': 'REB',
            'name': 'Rebounds'
          },
          {
            'att': 'OREB',
            'name': 'Offensive Rebounds'
          },
          {
            'att': 'AST',
            'name': 'Assists'
          },
          {
            'att': 'TOV',
            'name': 'Turnovers'
          },
          {
            'att': 'BLK',
            'name': 'Blocks'
          },
          {
            'att': 'STL',
            'name': 'Steals'
          },
          {
            'att': 'PLUS_MINUS',
            'name': '+/-'
          }
        ]
      }
  ];

  $scope.currentModel = $scope.dataModels[0];
  console.log($scope.dataModels);

  $scope.changeMode = function(newMode) {
    angular.forEach($scope.dataModels, function(mode, key) {
      if (mode.type === newMode.toLowerCase()) {
        $scope.currentModel = mode;
        console.log($scope.currentModel);
      }
    })
  };


  $scope.gamesLSide = [
    {
      'item': 1
    }
  ]
  $scope.gamesRSide = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  $scope.gamesMid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // On app start, grab all the players for the autofill lists
  $http.get('/api/players', {headers: {Authorization: "Bearer " + $scope.myJWT}}).
  then(function(response) {
    //$scope.player1data = response.data
    $scope.players = response['data'];
	console.log($scope.players);
    // this callback will be called asynchronously
    // when the response is available
  }, function(response) {
    console.log("There was an error getting init data!");
    console.log(response.data);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $http.get('/api/teams').
  then(function(response) {
    // this comes in as a json. needs to be array so it matches players response
    //$scope.teams = response['data'];
    angular.forEach(response['data'], function(value, key) {
      $scope.teams.push({'id': value, 'name': key});
    });
    console.log($scope.teams);
    // this callback will be called asynchronously
    // when the response is available
  }, function(response) {
    console.log("There was an error getting init data!");
    console.log(response.data);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

	// Init data for left player
  $scope.lpStats = {

  }

  // Init slot for player's image URL
  $scope.lpImage = ""

  // Init data for right player
  $scope.rpStats = {

  };

  $scope.rpImage = "";

  $scope.leftBar = {
    'width': 0 + "%"
	};

  $scope.rightBar = {
    'width': 0 + "%"
	};

  // Function configuring md-autocomplete options
$scope.autoCompleteOptions = {
  minimumChars: 1,
  dropdownHeight: "100px",
  data: function (term) {
    term = term.toUpperCase();
    var match = _.filter($scope.playerNames, function (value) {
      return value.name.startsWith(term);
    });
    return _.pluck(match, 'name');
  },
  itemSelected: function(item) {}
}

 // This is a sort of dao function
$scope.getPlayerStats = function(id, whichSide){
  console.log($scope.player1)
  $http.get('/api/players/' + id).
  then(function(response) {
    //$scope.player1data = response.data
    console.log(response);
    if (whichSide === 0) {
      $scope.lpStats = response['data'];
    } else {
      $scope.rpStats = response['data'];
    }
  }, function(response) {
    console.log("Error getting player data!");
    console.log(response.data);
  });
};

// This is a sort of dao function
$scope.getTeamStats = function(id, whichSide){
 console.log($scope.modeSelect);
 $http.get('/api/teams/' + id + "/" + $scope.modeSelect.toLowerCase()).
 then(function(response) {
   //$scope.player1data = response.data
   console.log(response);
   if (whichSide === 0) {
     $scope.lpStats = response['data'];
   } else {
     $scope.rpStats = response['data'];
   }
 }, function(response) {
   console.log("Error getting player data!");
   console.log(response.data);
 });
};

$scope.leftMatchupData = [];
$scope.rightMatchupData = [];



$scope.searchTextChange - function(text) {
  // If we want to do something every time
  // the user types, do something here
}

// item is the json from players.init, whichInput = 0 for left and 1 for right
// This is the function that's called when the user clicks an item
$scope.selectedItemChange = function(item, whichInput) {
  // Get the info; the id is {{item.id}}
  // Should come in correct format so hopefully no
  // json manipulation needed
  console.log(item);
  $scope.getPlayerStats(item.name, whichInput);

  // Also try using the nba headshot api?
  // First we need to format for search (wants underscores)
  var nameAsArray = item.name.split(" ");
  var headshotQuery = item.picture;

  // lmao actually you dont have to do a real ajax call
  // you can just set the var to the URL hahahahahahhahaha
  if (whichInput === 0) {
    $scope.lpImage = headshotQuery;
  } else {
    $scope.rpImage = headshotQuery;
  }
}

// When user clicks item but on the team screen
$scope.selectedItemChangeTeam = function(item, whichInput) {
  // Get the info; the id is {{item.id}}
  // Should come in correct format so hopefully no
  // json manipulation needed
  console.log(item.name);
  $scope.getTeamStats(item.name, whichInput);

  // Also try using the nba headshot api?
  // First we need to format for search (wants underscores)
  var headshotQuery = item.id;

  // lmao actually you dont have to do a real ajax call
  // you can just set the var to the URL hahahahahahhahaha
  if (whichInput === 0) {
    $scope.lpImage = headshotQuery;
  } else {
    $scope.rpImage = headshotQuery;
  }
}

// This is a sort of dao function
$scope.getMatchupStats = function(team1, team2, year, whichSide){
  console.log("whichside was " + whichSide);
 $http.get('/api/games/' + team1 + "/" + team2 + "/" + year).
 then(function(response) {
   //$scope.player1data = response.data
   if (whichSide === 0) {
     $scope.leftMatchupData[0] = response['data']['W/L'];
     $scope.leftMatchupData[1] = response['data'].PLUS_MINUS;
     $scope.leftMatchupData[2] = response['data'].FG_PCT;
     $scope.leftMatchupData[3] = response['data'].FG3_PCT;
     $scope.leftMatchupData[4] = response['data'].FT_PCT;
     $scope.leftMatchupData[5] = response['data'].AST;
     $scope.leftMatchupData[6] = response['data'].BLK;
     $scope.leftMatchupData[7] = response['data'].REB;
     $scope.leftMatchupData[8] = response['data'].STL;
     console.log($scope.leftMatchupData)
   } else {
     $scope.rightMatchupData[0] = response['data']['W/L'];
     $scope.rightMatchupData[1] = response['data'].PLUS_MINUS;
     $scope.rightMatchupData[2] = response['data'].FG_PCT;
     $scope.rightMatchupData[3] = response['data'].FG3_PCT;
     $scope.rightMatchupData[4] = response['data'].FT_PCT;
     $scope.rightMatchupData[5] = response['data'].AST;
     $scope.rightMatchupData[6] = response['data'].BLK;
     $scope.rightMatchupData[7] = response['data'].REB;
     $scope.rightMatchupData[8] = response['data'].STL;
     console.log($scope.rightMatchupData);
   }
 }, function(response) {
   console.log("Error getting player data!");
   console.log(response.data);
 });
};

// When user clicks item but on the games screen
$scope.selectedItemChangeGames = function(item, whichInput) {
  // Get the info; the id is {{item.id}}
  // Should come in correct format so hopefully no
  // json manipulation needed
  console.log(item.name);
  if (whichInput === 0 || whichInput === 2) {
    if (typeof $scope.player2selected !== 'undefined' && $scope.player2selected != null) {
      if ($scope.player2selected.name != null && $scope.player2selected.name !== ''){
      var whichYear = "";
      if (whichInput === 0) {
        whichYear = $scope.year.team1;
      } else if (whichInput === 2) {
        whichYear = $scope.year.team3;
      }
      $scope.getMatchupStats($scope.player2selected.name, item.name, whichYear, whichInput)
    }
    }
  } else {
    if (typeof $scope.player1selected !== 'undefined' && $scope.player1selected != null) {
      if ($scope.player1selected.name != null && $scope.player1selected.name !== '') {
      $scope.getMatchupStats(item.name, $scope.player1selected.name, $scope.year.team1, 0);
      }
    }
    if (typeof $scope.player3selected !== 'undefined' && $scope.player3selected != null) {
      if ($scope.player3selected.name != null && $scope.player3selected.name !== '') {
      $scope.getMatchupStats(item.name, $scope.player3selected.name, $scope.year.team3, 2);
    }
    }
  }

  // Also try using the nba headshot api?
  // First we need to format for search (wants underscores)
  //var headshotQuery = 'https://nba-players.herokuapp.com/players/' + item.name.replace(" ", "_");

  // lmao actually you dont have to do a real ajax call
  // you can just set the var to the URL hahahahahahhahaha
  if (whichInput === 0) {
    //$scope.lpImage = headshotQuery;
  } else {
    //$scope.rpImage = headshotQuery;
  }
}

// function that md-autocomplete calls to search the array
$scope.querySearch = function(query) {
  if (!query) return $scope.players;
  return $scope.players.filter($scope.createFilterFor(query));
}

// autocomplete for teams
$scope.querySearchTeam = function(query) {
  if (!query) return $scope.teams;
  return $scope.teams.filter($scope.createFilterFor(query));
}

// autocomplete for games
$scope.querySearchGames = function(query) {
  if (!query) return $scope.teams;
  return $scope.teams.filter($scope.createFilterFor(query));
}

// need a custom function for the md-autocomplete filter to
// ensure it is searching the way we want (search the whole name list, not exact matches)
$scope.createFilterFor = function(query) {
  var lowercaseQuery = angular.lowercase(query);

  return function filterFn(currentValue) {
    //return (state.value.indexOf(lowercaseQuery) === 0);
    return (currentValue.name.toLowerCase().includes(lowercaseQuery));
  }
}

// Function that gets called when user clicks 'compare'
$scope.comparePlayers = function() {
  if (typeof $scope.lpStats !== 'undefined' && typeof $scope.rpStats !== 'undefined') {
    $http.get('/api/players/' + $scope.searchText1 + '/compare/' + $scope.searchText2).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
	  $scope.betterPlayer = response['data'];

    }, function(response) {
		// temp comment this error handling to test
      //console.log("Error getting player comparison result!");
      //console.log(response.data);
	  console.log(response['data']);


    });
  }
}

$scope.compareTeams = function() {
  if (typeof $scope.lpStats !== 'undefined' && typeof $scope.rpStats !== 'undefined') {
	  console.log($scope.modeSelect);
    $http.get('/api/teams/' + $scope.searchText1 + '/compare/' + $scope.searchText2 + "/" + $scope.modeSelect.toLowerCase()).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
	  $scope.betterTeam = response['data'];

    }, function(response) {
		// temp comment this error handling to test
      //console.log("Error getting player comparison result!");
      //console.log(response.data);
	  console.log(response['data']);

    });
  }
}

// Function called when clicking compare on games screen
$scope.compareGames = function() {
  if (typeof $scope.lpStats !== 'undefined' && typeof $scope.rpStats !== 'undefined') {
	  console.log($scope.modeSelect);
    $http.get('/api/games/compare/' + $scope.searchText2 + "/" + $scope.searchText1 + "/" + $scope.year.team1 + "/" + $scope.searchText3 + "/" + $scope.year.team3).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
	  $scope.betterTeam = response['data'];

    $scope.leftBar.width = response['data'].player1 + "%";
	  $scope.rightBar.width = response['data'].player2 + "%";


    }, function(response) {
		// temp comment this error handling to test
      //console.log("Error getting player comparison result!");
      //console.log(response.data);
	  console.log(response['data']);

    });
  }
}

})
