app.controller('NavCtrl', ['$scope','$state','$location','auth', function($scope, $state,$location, auth){
  
  // NAVIGATION ACTIVATION
 $scope.isCurrentPath = function(path){
    var pathin = $location.path();
    return !pathin.search(path);
  };
  
  // NAVIGATION BAR USER INFORMATION
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser; // set our nav bar variable to the current user
  $scope.logOut = function(){
      auth.logOut();
      $state.go('categoryList',{},{ reload: true });
  }

}]);