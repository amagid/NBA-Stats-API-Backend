var app = angular.module('nbaApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.disableTheming();
});
app.controller('myController', function($scope, $http) {

  $scope.players = [];

  $scope.teams = [];

  $scope.modes = ['Base', 'Advanced', 'Miscellaneous', 'Scoring', 'Opponent', 'Usage', 'Clutch'];
  $scope.modeSelect = $scope.modes[0];

  $scope.years = ['2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17'];

  $scope.gamesCats = ['Ave Win/Loss', 'Ave Plus/Minus', 'Ave FG %', 'Ave 3-Point %', 'Ave Free Throw %', 'Ave Assists', 'Ave Blocks', 'Ave Rebounds', 'Ave Steals'];

  $scope.gamesLSide = [
    {
      'item': 1
    }
  ]
  $scope.gamesRSide = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  $scope.gamesMid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // On app start, grab all the players for the autofill lists
  $http.get('/api/players').
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
    "points":0,
    "rebounds":0,
    "assists":0,
    "blocks":0,
    "steals":0,
    "turnovers":0,
    "three":0,
    "free":0
  }

  // Init slot for player's image URL
  $scope.lpImage = ""

  // Init data for right player
  $scope.rpStats = {
    "points":0,
    "rebounds":0,
    "assists":0,
    "blocks":0,
    "steals":0,
    "turnovers":0,
    "three":0,
    "free":0
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
  var headshotQuery = 'https://nba-players.herokuapp.com/players/' + nameAsArray[nameAsArray.length - 1];

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
  var headshotQuery = 'https://nba-players.herokuapp.com/players/' + item.name.replace(" ", "_");

  // lmao actually you dont have to do a real ajax call
  // you can just set the var to the URL hahahahahahhahaha
  if (whichInput === 0) {
    $scope.lpImage = headshotQuery;
  } else {
    $scope.rpImage = headshotQuery;
  }
}

// When user clicks item but on the games screen
$scope.selectedItemChangeGames = function(item, whichInput) {
  // Get the info; the id is {{item.id}}
  // Should come in correct format so hopefully no
  // json manipulation needed
  console.log(item.name);
  //$scope.getTeamStats(item.name, whichInput);

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
    $http.get('/api/teams/' + $scope.searchText1 + '/compare/' + $scope.searchText2 + "/" + $scope.modeSelect.toLowerCase()).
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
