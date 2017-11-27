var app = angular.module('nbaApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.disableTheming();
});
app.controller('myController', function($scope, $http) {

  $scope.players = [];

  $scope.teams = [];

  $scope.modes = ['Overall', 'Offense', 'Defense'];

  $scope.years = [2014, 2015, 2016, 2017];

  // On app start, grab all the players for the autofill lists
  $http.get('/api/players').
  then(function(response) {
    //$scope.player1data = response.data
    $scope.players = response['data'];
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
    //$scope.player1data = response.data
    $scope.teams = response['data'];
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
 console.log($scope.player1)
 $http.get('/api/teams/' + id).
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
  $scope.getPlayerStats(item.id, whichInput);

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

// function that md-autocomplete calls to search the array
$scope.querySearch = function(query) {
  if (!query) return [];
  return $scope.players.filter($scope.createFilterFor(query));
}

// autocomplete for teams
$scope.querySearchTeam = function(query) {
  if (!query) return [];
  return $scope.teams.filter($scope.createFilterFor(query));
}

// need a custom function for the md-autocomplete filter to
// ensure it is searching the way we want (search the whole name list, not exact matches)
$scope.createFilterFor = function(query) {
  var lowercaseQuery = angular.lowercase(query);

  return function filterFn(currentValue) {
    //return (state.value.indexOf(lowercaseQuery) === 0);
    return (currentValue.value.includes(lowercaseQuery));
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

      $scope.leftBar.width = response['data'].player1 + "%";
	  $scope.rightBar.width = response['data'].player2 + "%";

	  if (response['data'].player1 > response['data'].player2 ) {
		  $scope.leftBar.backgroundColor = "LightGreen";
		  $scope.rightBar.backgroundColor = "LightPink";
	  } else if (response['data'].player1 < response['data'].player2 ) {
		  $scope.leftBar.backgroundColor = "LightPink";
		  $scope.rightBar.backgroundColor = "LightGreen";
	  } else {
		  $scope.leftBar.backgroundColor = "LightGreen";
		  $scope.rightBar.backgroundColor = "LightGreen";
	  }

    }, function(response) {
		// temp comment this error handling to test
      //console.log("Error getting player comparison result!");
      //console.log(response.data);
	  console.log(response['data']);

	  response.data = {
		  player1:76,
		  player2:30
	  }


    $scope.leftBar.width = response['data'].player1 + "%";
	  $scope.rightBar.width = response['data'].player2 + "%";

	  if (response['data'].player1 > response['data'].player2 ) {
		  $scope.leftBar.backgroundColor = "LightGreen";
		  $scope.rightBar.backgroundColor = "LightPink";
	  } else if (response['data'].player1 < response['data'].player2 ) {
		  $scope.leftBar.backgroundColor = "LightPink";
		  $scope.rightBar.backgroundColor = "LightGreen";
	  } else {
		  $scope.leftBar.backgroundColor = "LightGreen";
		  $scope.rightBar.backgroundColor = "LightGreen";
	  }
    });
  }
}

$scope.compareTeams = function() {
  if (typeof $scope.lpStats !== 'undefined' && typeof $scope.rpStats !== 'undefined') {
    $http.get('/api/teams/' + $scope.searchText1 + '/compare/' + $scope.searchText2).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
	  $scope.betterTeam = response['data'];

    $scope.leftBar.width = response['data'].player1 + "%";
	  $scope.rightBar.width = response['data'].player2 + "%";

	  if (response['data'].player1 > response['data'].player2 ) {
		  $scope.leftBar.backgroundColor = "LightGreen";
		  $scope.rightBar.backgroundColor = "LightPink";
	  } else if (response['data'].player1 < response['data'].player2 ) {
		  $scope.leftBar.backgroundColor = "LightPink";
		  $scope.rightBar.backgroundColor = "LightGreen";
	  } else {
		  $scope.leftBar.backgroundColor = "LightGreen";
		  $scope.rightBar.backgroundColor = "LightGreen";
	  }

    }, function(response) {
		// temp comment this error handling to test
      //console.log("Error getting player comparison result!");
      //console.log(response.data);
	  console.log(response['data']);

    $scope.leftBar.width = response['data'].player1 + "%";
	  $scope.rightBar.width = response['data'].player2 + "%";

	  if (response['data'].player1 > response['data'].player2 ) {
		  $scope.leftBar.backgroundColor = "LightGreen";
		  $scope.rightBar.backgroundColor = "LightPink";
	  } else if (response['data'].player1 < response['data'].player2 ) {
		  $scope.leftBar.backgroundColor = "LightPink";
		  $scope.rightBar.backgroundColor = "LightGreen";
	  } else {
		  $scope.leftBar.backgroundColor = "LightGreen";
		  $scope.rightBar.backgroundColor = "LightGreen";
	  }
    });
  }
}

})
