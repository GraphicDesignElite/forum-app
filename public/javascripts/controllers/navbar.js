app.controller('NavCtrl', ['$scope','auth', function($scope, auth){
  
  
  // NAVIGATION BAR USER INFORMATION
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser; // set our nav bar variable to the current user
  $scope.logOut = auth.logOut;


}]);