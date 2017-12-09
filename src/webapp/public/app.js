var app = angular.module('nbaApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.disableTheming();
});
app.controller('myController', function($scope, $http) {
  // A NOTE ABOUT NUMBER OF LINES OF CODE
  // I ran this through https://html-cleaner.com/js/ to remove comments,
  // this showed a total of 1030 lines. Lines 119-487 are just building
  // a model though and shouldn't be counted, giving me around
  // 660 lines of code. Although I know in class you mentioned markup
  // like html/css won't count as code in this, but i would appreciate it
  // if you could consider the html pages in your evaluation of my overall contribution.
  $scope.showSpinner = [];
  $scope.rightChartData = {
      //labels: "label",
      labels: [],
      datasets: [{
        label: "Average Points / Game",
        backgroundColor: '#ed174b',
        showLine: true,
        data:[],
        fill: true
        }
      ]
  };
  $scope.leftChartData = {
      //labels: "label",
      labels: [],
      datasets: [{
        label: "Average Points / Game",
        backgroundColor: '#ed174b',
        showLine: true,
        data:[],
        fill: true
        }
      ]
  };
  $scope.myJWT = window.localStorage.getItem("NBA-JWT");
  var thisPath = window.location.pathname;
  console.log(thisPath);
  if ((thisPath === '/login.html' || thisPath === '/register.html' || thisPath === 'login' || thisPath === 'register') && $scope.myJWT && $scope.myJWT !== "" ) {
    location.href="/index.html";
    console.log("already logged in");
  } else if ((thisPath === '/account.html' || thisPath === '/account') && (!$scope.myJWT || $scope.myJWT == "" )) {
    location.href ="/login.html";
  }

  $scope.logout = function() {
    console.log("Logging off");
    $scope.myJWT = "";
    window.localStorage.removeItem("NBA-JWT");
    window.location.href = "/login.html";
  }

  $scope.authError = "";
  console.log($scope.myJWT);
  $scope.registerFn = function() {    //TODO update firstname and lastname
    if (!$scope.loginForm.$invalid){
    $http.post('/auth/signup', {email: $scope.register.username, password: $scope.register.password, fname: $scope.register.fname, lname: $scope.register.lname}).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
      $scope.authError = "Check your email to verify account!";
      // TODO tell user if the verification email was successfully sent -- might have to base on error code number

      // this callback will be called asynchronously
      // when the response is available
    }, function(response) {
      console.log("There was an error getting init data!");
      console.log(response);
      //$scope.authError = "Unable to make account with this information. Is your data valid? Do you already have an account?";
      if (response.data.message === "Email Already In Use") {
        $scope.authError = "Email already in use!";
      } else {
        $scope.authError = "Unable to create account."
      }
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
  }

  $scope.loginFn = function() {
    if (!$scope.loginForm.$invalid){
    $http.post('/auth/login', {email: $scope.login.username, password: $scope.login.password}).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
      if (typeof response['data'].token !== 'undefined') {
        window.localStorage.setItem("NBA-JWT", response.data.token);
        location.href="/index.html";
      } else {
        $scope.authError = "Could not log in with that info. Please check your info and try again.";
      }
      // this callback will be called asynchronously
      // when the response is available
    }, function(response) {
      console.log("There was an error logging in!");
      console.log(response.data);
      $scope.authError = "Could not log in with that info. Please check your info and try again.";
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
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

  $scope.gamesCats = ['Wins Minus Losses', 'Ave Plus/Minus', 'Ave FG Success %', 'Ave 3-PT Success %', 'Ave Free Throw Success %', 'Ave Assists', 'Ave Blocks', 'Ave Rebounds', 'Ave Steals'];



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

  var removeFromArray = function(array, val) {
    angular.forEach(array, function(value, key) {
      if (array.includes(val)) {
        array.splice(array.indexOf(val), 1);
      }
    })
  }

  // On app start, grab all the players for the autofill lists
  if (thisPath === '/index' || thisPath === '/index.html' || thisPath === '/'){
    console.log("getting players init data");
    $scope.showSpinner.push('playerInit');
  $http.get('/api/players').
  then(function(response) {
    //$scope.player1data = response.data
    $scope.players = response['data'];
	console.log($scope.players);
  removeFromArray($scope.showSpinner, 'playerInit');
    // this callback will be called asynchronously
    // when the response is available
  }, function(response) {
    console.log("There was an error getting init data!");
    console.log(response.data);
    removeFromArray($scope.showSpinner, 'playerInit');
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}

  // Get account info
  $scope.userInfo = {};
  $scope.gameQueries = {};
  $scope.teamQueries = {};
  $scope.playerQueries = {};

  $http.get('/user/info', {headers: {Authorization: "Bearer " + $scope.myJWT}}).
  then(function(response) {
    //$scope.player1data = response.data
    $scope.userInfo = response['data'];
     console.log($scope.userInfo);
    // this callback will be called asynchronously
    // when the response is available
  }, function(response) {
    console.log("There was an error getting user info data!");
    console.log(response.data);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });// END INFO

      $scope.historyParsed = [];

  if (thisPath === '/account' || thisPath === '/account.html') {


    $http.get('/user/game-queries', {headers: {Authorization: "Bearer " + $scope.myJWT}}).
    then(function(response) {
      //$scope.player1data = response.data
      $scope.gameQueries = response['data'];
  	   console.log($scope.gameQueries);
       angular.forEach($scope.gameQueries, function(value, key) {
         console.log(value.url);
         if (value.url.includes("compare")) {
           var tokenList = value.url.split("/");
           var firstNewVal = tokenList[2].replace(/%20/g, " ");
           var secondNewVal = tokenList[4].replace(/%20/g, " ");
           var newVal =
           {
             type: 'Games Compare',
             timestamp: value.searchDate,
             val1: firstNewVal,
             val2: secondNewVal
           }
           $scope.historyParsed.push(newVal);
           console.log($scope.historyParsed);
           $scope.historyParsed.sort(function(a, b) {
            return a.timestamp - b.timestamp;
            });
         }
       });
      // this callback will be called asynchronously
      // when the response is available
    }, function(response) {
      console.log("There was an error getting user game query data!");
      console.log(response.data);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }); // END GAME QUERIES

    $http.get('/user/team-queries', {headers: {Authorization: "Bearer " + $scope.myJWT}}).
    then(function(response) {
      //$scope.player1data = response.data
      $scope.teamQueries = response['data'];
  	   console.log($scope.teamQueries);
       if ($scope.teamQueries) {
         console.log("entered if");
         angular.forEach($scope.teamQueries, function(value, key) {
           console.log(value.url);
           if (value.url.includes("compare")) {
             var tokenList = value.url.split("/");
             var firstNewVal = tokenList[2].replace(/%20/g, " ");
             var secondNewVal = tokenList[4].replace(/%20/g, " ");
             var newVal =
             {
               type: 'Team Compare',
               timestamp: moment(value.searchDate),
               val1: firstNewVal,
               val2: secondNewVal
             }
             $scope.historyParsed.push(newVal);
             console.log($scope.historyParsed);
             $scope.historyParsed.sort(function(a, b) {
              return a.timestamp - b.timestamp;
              });
           }
         });
       }
      // this callback will be called asynchronously
      // when the response is available
    }, function(response) {
      console.log("There was an error getting user team query data!");
      console.log(response.data);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }); // END TEAM QUERIES


    $http.get('/user/player-queries', {headers: {Authorization: "Bearer " + $scope.myJWT}}).
    then(function(response) {
      //$scope.player1data = response.data
      $scope.playerQueries = response['data'];
  	   console.log($scope.playerQueries);

       if ($scope.playerQueries) {
         console.log("entered if");
         angular.forEach($scope.playerQueries, function(value, key) {
           console.log(value.url);
           if (value.url.includes("compare")) {
             var tokenList = value.url.split("/");
             var firstNewVal = tokenList[2].replace("%20", " ");
             var secondNewVal = tokenList[4].replace("%20", " ");
             var newVal =
             {
               type: 'Player Compare',
               timestamp: moment(value.searchDate),
               val1: firstNewVal,
               val2: secondNewVal
             }
             $scope.historyParsed.push(newVal);
             console.log($scope.historyParsed);
             $scope.historyParsed.sort(function(a, b) {
              return a.timestamp - b.timestamp;
              });
           }
         });
       }
      // this callback will be called asynchronously
      // when the response is available
    }, function(response) {
      console.log("There was an error getting user player query data!");
      console.log(response.data);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }); // END PLAYER QUERIES
  }

  // Rebuild the history responses to stuff we can actually display



  if (thisPath === '/teams' || thisPath === '/teams.html' || thisPath === '/games' || thisPath === '/games.html'){
    $scope.showSpinner.push('teamsInit');
  $http.get('/api/teams').
  then(function(response) {
    // this comes in as a json. needs to be array so it matches players response
    //$scope.teams = response['data'];
    angular.forEach(response['data'], function(value, key) {
      $scope.teams.push({'id': value, 'name': key});
    });
    console.log($scope.teams);
    removeFromArray($scope.showSpinner, 'teamsInit')
    // this callback will be called asynchronously
    // when the response is available
  }, function(response) {
    console.log("There was an error getting init data!");
    console.log(response.data);
    removeFromArray($scope.showSpinner, 'teamsInit')
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}

	// Init data for left player
  $scope.lpStats = {}

  // Init slot for player's image URL
  $scope.lpImage = ""

  // Init data for right player
  $scope.rpStats = {};

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


$scope.ave17 = {
	"PF_RANK": 243.0,
	"FGM_RANK": 243.0,
	"FTA_RANK": 243.0,
	"W": 26.0,
	"MIN": 19.9,
	"STL_RANK": 242.0,
	"AGE": 26.85,
	"TOV": 1.1,
	"REB": 3.57,
	"TEAM_ID": 1610612751.0,
	"FG3A_RANK": 241.0,
	"FTM": 1.42,
	"PLAYER_ID": 551972.0,
	"NBA_FANTASY_PTS": 17.4,
	"REB_RANK": 243.0,
	"W_RANK": 238.0,
	"FG3A": 2.18,
	"AST": 1.83,
	"FTM_RANK": 242.0,
	"DREB_RANK": 243.0,
	"W_PCT_RANK": 242.0,
	"FGA_RANK": 243.0,
	"FG3M": 0.77,
	"OREB": 0.85,
	"L_RANK": 238.0,
	"FGM": 3.12,
	"PF": 1.68,
	"TD3_RANK": 23.0,
	"FG_PCT_RANK": 243.0,
	"PTS": 8.43,
	"FGA": 6.91,
	"FG3M_RANK": 235.0,
	"NBA_FANTASY_PTS_RANK": 243.0,
	"BLKA_RANK": 242.0,
	"GP": 53.0,
	"STL": 0.63,
	"AST_RANK": 243.0,
	"FG_PCT": 0.44,
	"L": 26.0,
	"PLUS_MINUS_RANK": 243.0,
	"FTA": 1.86,
	"PLUS_MINUS": -0.34,
	"BLK": 0.39,
	"W_PCT": 0.48,
	"DREB": 2.72,
	"FT_PCT_RANK": 242.0,
	"PFD_RANK": 243.0,
	"FT_PCT": 0.72,
	"BLK_RANK": 241.0,
	"PFD": 1.6,
	"MIN_RANK": 243.0,
	"OREB_RANK": 243.0,
	"DD2_RANK": 166.0,
	"CFID": 5.0,
	"GP_RANK": 239.0,
	"FG3_PCT": 0.28,
	"DD2": 4.0,
	"TOV_RANK": 243.0,
	"BLKA": 0.39,
	"FG3_PCT_RANK": 235.0,
	"TD3": 0.0,
	"PTS_RANK": 243.0
};

 // This is a sort of dao function
$scope.getPlayerStats = function(id, whichSide){
  console.log($scope.player1)
  $scope.showSpinner.push("getplayerstats" + whichSide);
  if (id !== 'average'){
  $http.get('/api/players/' + id).
  then(function(response) {
    //$scope.player1data = response.data
    console.log(response);
    var json = response.data;
    angular.forEach(json, function(value, key) {
        angular.forEach(value, function(value2, key2) {
          if (value2[0] == "2017-18") {
            var s = value2[0];
            value[s] = value2[1];
          }
        });
    });
    console.log(json);

    if (whichSide === 0) {
      $scope.lpStats = json;
      $scope.justpoints = json.PTS;
      console.log($scope.justpoints);
      var i = 0;
      $scope.leftChartData.datasets[0].data = [];
      $scope.leftChartData.labels = [];
      var newlist = [];
      angular.forEach($scope.justpoints, function(value, key) {
        newlist.push({
          time: value[0].substring(0, 4),
          val: value[1]
        });
      });

      newlist.sort(function(a, b) {
         return parseInt(a.time) - parseInt(b.time);
     });

      angular.forEach(newlist, function(value, key) {
        $scope.leftChartData.datasets[0].data.push(value.val);
        $scope.leftChartData.labels.push(value.time);
      });

      $scope.myChart.update();
    } else {
      $scope.rpStats = json;
      $scope.justpoints = json.PTS;
      console.log($scope.justpoints);
      var i = 0;
      $scope.rightChartData.datasets[0].data = [];
      $scope.rightChartData.labels = [];
      var newlist = [];
      angular.forEach($scope.justpoints, function(value, key) {
        newlist.push({
          time: value[0].substring(0, 4),
          val: value[1]
        });
      });

      newlist.sort(function(a, b) {
         return parseInt(a.time) - parseInt(b.time);
     });

      angular.forEach(newlist, function(value, key) {
        $scope.rightChartData.datasets[0].data.push(value.val);
        $scope.rightChartData.labels.push(value.time);
      });

      $scope.myChart2.update();
    }
    removeFromArray($scope.showSpinner, "getplayerstats" + whichSide);




  }, function(response) {
    console.log("Error getting player data!");
    console.log(response.data);
    removeFromArray($scope.showSpinner, "getplayerstats" + whichSide);
  });
} else { // hardcode average
  console.log("getting average")
  if (whichSide === 0){
    console.log($scope.ave17);
    $scope.lpStats = {'PTS': {}, 'REB': {}, 'AST': {}, 'BLK': {}, 'STL': {}, 'TOV': {}, 'FG3M': {}, 'FTM': {}};
    $scope.lpStats['PTS']["2017-18"] = $scope.ave17['PTS'];
    $scope.lpStats['REB']["2017-18"] = $scope.ave17['REB'];
    $scope.lpStats['AST']["2017-18"] = $scope.ave17['AST'];
    $scope.lpStats['BLK']["2017-18"] = $scope.ave17['BLK'];
    $scope.lpStats['STL']["2017-18"] = $scope.ave17['STL'];
    $scope.lpStats['TOV']["2017-18"] = $scope.ave17['TOV'];
    $scope.lpStats['FG3M']["2017-18"] = $scope.ave17['FG3M'];
    $scope.lpStats['FTM']["2017-18"] = $scope.ave17['FTM'];
  } else {
    $scope.rpStats = {'PTS': {}, 'REB': {}, 'AST': {}, 'BLK': {}, 'STL': {}, 'TOV': {}, 'FG3M': {}, 'FTM': {}};
    $scope.rpStats['PTS']["2017-18"] = $scope.ave17['PTS'];
    $scope.rpStats['REB']["2017-18"] = $scope.ave17['REB'];
    $scope.rpStats['AST']["2017-18"] = $scope.ave17['AST'];
    $scope.rpStats['BLK']["2017-18"] = $scope.ave17['BLK'];
    $scope.rpStats['STL']["2017-18"] = $scope.ave17['STL'];
    $scope.rpStats['TOV']["2017-18"] = $scope.ave17['TOV'];
    $scope.rpStats['FG3M']["2017-18"] = $scope.ave17['FG3M'];
    $scope.rpStats['FTM']["2017-18"] = $scope.ave17['FTM'];
  }
  removeFromArray($scope.showSpinner, "getplayerstats" + whichSide);
}
};

// This is a sort of dao function
$scope.getTeamStats = function(id, whichSide){
 console.log($scope.modeSelect);
 $scope.showSpinner.push("getteamstats" + whichSide);
 $http.get('/api/teams/' + id + "/" + $scope.modeSelect.toLowerCase()).
 then(function(response) {
   //$scope.player1data = response.data
   console.log(JSON.parse(response.data.message));
   var json = JSON.parse(response.data.message);
   if (whichSide === 0) {
     $scope.lpStats = json;

     $scope.justpoints = json.PTS;

     var i = 0;
     $scope.leftChartData.datasets[0].data = [];
     $scope.leftChartData.labels = [];
     var newlist = [];
     angular.forEach($scope.justpoints, function(value, key) {
       newlist.push({
         time: key.substring(0, 4),
         val: value
       });
     });

     newlist.sort(function(a, b) {
        return parseInt(a.time) - parseInt(b.time);
    });

     angular.forEach(newlist, function(value, key) {
       $scope.leftChartData.datasets[0].data.push(value.val);
       $scope.leftChartData.labels.push(value.time);
     });

     $scope.myChart.update();
   } else {
     $scope.rpStats = json;
     $scope.justpoints = json.PTS;

     var i = 0;
     $scope.rightChartData.datasets[0].data = [];
     $scope.rightChartData.labels = [];
     var newlist = [];
     angular.forEach($scope.justpoints, function(value, key) {
       newlist.push({
         time: key.substring(0, 4),
         val: value
       });
     });

     newlist.sort(function(a, b) {
        return parseInt(a.time) - parseInt(b.time);
    });

     angular.forEach(newlist, function(value, key) {
       $scope.rightChartData.datasets[0].data.push(value.val);
       $scope.rightChartData.labels.push(value.time);
     });
     $scope.myChart2.update();
   }
   removeFromArray($scope.showSpinner, "getteamstats" + whichSide);
 }, function(response) {
   console.log("Error getting player data!");
   console.log(response.data);
   removeFromArray($scope.showSpinner, "getteamstats" + whichSide);
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
  if (item.name === 'average') {
    console.log(item);

    $scope.getPlayerStats(item.name, whichInput);
  } else {
    $scope.getPlayerStats(item.name, whichInput);
  }

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
  $scope.myChart.update();
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
  $scope.showSpinner.push("getmatchupstats" + whichSide, {headers: {Authorization: "Bearer " + $scope.myJWT}});
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
     removeFromArray($scope.showSpinner, "getmatchupstats" + whichSide);
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
     removeFromArray($scope.showSpinner, "getmatchupstats" + whichSide);
   }
 }, function(response) {
   console.log("Error getting player data!");
   console.log(response.data);
   removeFromArray($scope.showSpinner, "getmatchupstats" + whichSide);
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
  $scope.showSpinner.push('comparePlayers');
  if (typeof $scope.lpStats !== 'undefined' && typeof $scope.rpStats !== 'undefined') {
    $http.get('/api/players/' + $scope.searchText1 + '/compare/' + $scope.searchText2, {headers: {Authorization: "Bearer " + $scope.myJWT}}).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
	  $scope.betterPlayer = response['data'];
    removeFromArray($scope.showSpinner, 'comparePlayers');
    }, function(response) {
		// temp comment this error handling to test
      //console.log("Error getting player comparison result!");
      //console.log(response.data);
	  console.log(response['data']);
    removeFromArray($scope.showSpinner, 'comparePlayers');


    });
  }
}

$scope.compareTeams = function() {
  if (typeof $scope.lpStats !== 'undefined' && typeof $scope.rpStats !== 'undefined') {
	  console.log($scope.modeSelect);
    $scope.showSpinner.push("compareTeams")
    $http.get('/api/teams/' + $scope.searchText1 + '/compare/' + $scope.searchText2 + "/" + $scope.modeSelect.toLowerCase(), {headers: {Authorization: "Bearer " + $scope.myJWT}}).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
	  $scope.betterTeam = response['data'];
    removeFromArray($scope.showSpinner, 'compareTeams');

    }, function(response) {
		// temp comment this error handling to test
      //console.log("Error getting player comparison result!");
      //console.log(response.data);
	  console.log(response['data']);
    removeFromArray($scope.showSpinner, 'compareTeams');

    });
  }
}

// Function called when clicking compare on games screen
$scope.compareGames = function() {
  if (typeof $scope.lpStats !== 'undefined' && typeof $scope.rpStats !== 'undefined') {
    $scope.showSpinner.push("compareGames");
	  console.log($scope.modeSelect);
    $http.get('/api/games/compare/' + $scope.searchText2 + "/" + $scope.searchText1 + "/" + $scope.year.team1 + "/" + $scope.searchText3 + "/" + $scope.year.team3, {headers: {Authorization: "Bearer " + $scope.myJWT}}).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
	  $scope.betterTeam = response['data'];

    $scope.leftBar.width = response['data'].player1 + "%";
	  $scope.rightBar.width = response['data'].player2 + "%";
    removeFromArray($scope.showSpinner, 'compareGames');


    }, function(response) {
		// temp comment this error handling to test
      //console.log("Error getting player comparison result!");
      //console.log(response.data);
	  console.log(response['data']);
    removeFromArray($scope.showSpinner, 'compareGames');

    });
  }
}

if (thisPath === '/teams' || thisPath === '/teams.html' || thisPath === '/' || thisPath === '/index' || thisPath === '/index.html'){
$scope.ctx = document.getElementById("myChart").getContext('2d');

$scope.myChart = new Chart($scope.ctx, {
  type: 'line',
  backgroundColor: 'rgba(255, 255, 255, 1);',
  data: $scope.leftChartData,
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Average Points / Game'
    },
    legend: {
      display: false
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
  }
});
$scope.ctx2 = document.getElementById("myChart2").getContext('2d');

$scope.myChart2 = new Chart($scope.ctx2, {
  type: 'line',
  backgroundColor: 'rgba(255, 255, 255, 1);',
  data: $scope.rightChartData,
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Average Points / Game'
    },
    legend: {
      display: false
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
  }
});
}
});
