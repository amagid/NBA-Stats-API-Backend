var app = angular.module('nbaApp', ['ngMaterial'])
                  .config(function($mdThemingProvider) {
                    $mdThemingProvider.disableTheming();
                  });
app.controller('myController', function($scope, $http) {
  $scope.data = [];

  $scope.player1selected = "";
  $scope.searchText1="";

  var vm = null;

  $scope.players = [];

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

  $scope.rsData = [];
  $scope.lsData = [];
  $scope.player1data = [];
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

  $scope.selectedItemChange = function(item) {
    // 1) Get the info
    // 2) Set the
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
