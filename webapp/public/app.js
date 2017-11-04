var app = angular.module('nbaApp', []);
app.controller('myController', function($scope, $http) {
  $scope.data = [];
  
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


  $scope.curryData = [4,18,1,93,6,43,2,3];
  $scope.irvingData = [2,7,52,6,75,1,88,5];
  
  $scope.leftkeypress = function($event) {
	if ($event.keyCode === 13) {
	if ($scope.inLeft === 'curry') {
			$scope.lsData = $scope.curryData;
			$scope.lsShow = true;
			$scope.leftimg="img/curry.jpg";
	}else if ($scope.inLeft === 'irving' ) {
			$scope.lsData = $scope.irvingData;
			$scope.lsShow=true;
			$scope.leftimg="img/irving.jpg";
    } else {
			$scope.lsData = [];
			$scope.lsShow = false;
			$scope.leftimg="img";
    }
	  }
  }
  
    $scope.rightkeypress = function($event) {
	  if ($event.keyCode === 13) {
	  if ($scope.inRight === 'curry') {
			$scope.rsData = $scope.curryData;
			$scope.rsShow = true;
			$scope.rightimg="img/curry.jpg";
	  }else if ($scope.inRight === 'irving' ) {
			$scope.rsData = $scope.irvingData;
			$scope.rsShow=true;
			$scope.rightimg="img/irving.jpg";
    } else {
			$scope.rsData = [];
			$scope.rsShow = false;
			$scope.rightimg="img";
    }
	  }
  }


})
