var app = angular.module('nbaApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.disableTheming();
});
app.controller('myController', function($scope, $http) {

  $scope.players = [];

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

  $scope.lpImage = ""

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

$scope.getPlayerStats = function(id, whichSide){
  console.log($scope.player1)
  $http.get('/api/players/' + id).
  then(function(response) {
    //$scope.player1data = response.data
    console.log(response['data']);
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
$scope.selectedItemChange = function(item, whichInput) {
  // Get the info; the id is {{item.id}}
  // Should come in correct format so hopefully no
  // json manipulation needed
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

$scope.querySearch = function(query) {
  if (!query) return [];
  return $scope.players.filter($scope.createFilterFor(query));
}

$scope.createFilterFor = function(query) {
  var lowercaseQuery = angular.lowercase(query);

  return function filterFn(currentValue) {
    //return (state.value.indexOf(lowercaseQuery) === 0);
    return (currentValue.value.includes(lowercaseQuery));
  }
}

$scope.comparePlayers = function() {
  if (typeof $scope.lpStats !== 'undefined' && typeof $scope.rpStats !== 'undefined') {
    $http.get('/api/players/' + $scope.searchText1 + '/compare/' + $scope.searchText2).
    then(function(response) {
      //$scope.player1data = response.data
      console.log(response['data']);
      $scope.rpStats = response['data'];
    }, function(response) {
      console.log("Error getting player comparison result!");
      console.log(response.data);
    });
  }
}

$scope.chartInputData = [{
  "type": "points",

  "time": 1500552000,
  "value": 22

},
{
  "type": "points",
  "time": 1500724800,
  "value": 25
},
{
  "type": "points",
  "time": 1500897600,
  "value": 23
},
{
  "type": "rebounds",
  "time": 1500552000,
  "value": 8
},
{
  "type": "rebounds",
  "time": 1500724800,
  "value": 6
},
{
  "type": "rebounds",
  "time": 1500897600,
  "value": 9
},

{
  "type": "assists",
  "time": 1500552000,
  "value": 14
},
{
  "type": "assists",
  "time": 1500724800,
  "value": 18
},
{
  "type": "assists",
  "time": 1500897600,
  "value": 10
}
]


var ctx = $("#myChart");
//console.log(ctx);
$scope.myChart = new Chart(ctx, {
  type: 'line',
  // data: {
  //   label: "Stats",
  //   xAxisID: "Date",
  //   yAxisID: "Amount",
  //   backgroundColor: "rgba(0, 0, 0, 0.5)"
  // }
  data: {
    datasets: [
      {
        data: [
          {
            x: 10,
            y: 20
          },
          {
            x: 15,
            y: 22
          }
        ]
      }
    ]
  }
});
})
