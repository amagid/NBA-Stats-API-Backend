var app = angular.module('nbaApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.disableTheming();
});
app.controller('myController', function($scope, $http) {

  $scope.players = [];

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

  // TODO make this call players.init instead
  $scope.players = [{
    "value": "LeBron James".toLowerCase(),
    "display":"LeBron James",
    "id": "1"
  },
  {
    "value": "Stephen Curry".toLowerCase(),
    "display":"Stephen Curry",
    "id": "2"
  }
]

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

$scope.add = function(){
  console.log($scope.player1)
  $http.get('/player1/' + $scope.player1).
  then(function(response) {
    //$scope.player1data = response.data
    console.log(response['data']);
    // this callback will be called asynchronously
    // when the response is available
  }, function(response) {
    console.log(response.data)
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
};

$scope.searchTextChange - function(text) {
  $log.info('Text changed to ' + text);
}

// item is the json from players.init, whichInput = 0 for left and 1 for right
$scope.selectedItemChange = function(item, whichInput) {
  // 1) Get the info; the id is {{item.id}}
  // $http.get('/player1/' + item.id).
  // then(function(response) {
  //   // 2) Set each value in $scope.lpStats or rpSTats
  //   // depending on whichInput from the response
  // });

  // Also try using the nba headshot api?
  // First we need to format for search (wants underscores)
  var headshotQuery = 'https://nba-players.herokuapp.com/players/' + item.display.replace(" ", "_");

  // lmao actually you dont have to do a real ajax call
  // you can just set the var to the URL hahahahahahhahaha
  if (whichInput === 0) {
    $scope.lpImage = headshotQuery;
  } else {
    $scope.rpImage = headshotQuery;
  }

  // $http.get('https://nba-players.herokuapp.com/players/' + headshotQuery).
  // then(function(response) {
  //   if (whichInput === 0) {
  //     $scope.rpImage = response['data'];
  //     console.log($scope.rpImage);
  //   } else {
  //     $scope.lpImage = response['data'];
  //     console.log($scope.lpImage);
  //   }
  // });

}

$scope.querySearch = function(query) {
  if (!query) return [];
  return $scope.players.filter($scope.createFilterFor(query));
}

$scope.createFilterFor = function(query) {
  var lowercaseQuery = angular.lowercase(query);

  return function filterFn(currentValue) {
    console.log(currentValue);
    //return (state.value.indexOf(lowercaseQuery) === 0);
    return (currentValue.value.includes(lowercaseQuery));
  }
}

})
