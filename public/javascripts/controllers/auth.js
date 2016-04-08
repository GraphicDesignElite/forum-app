app.controller('AuthCtrl', ['$scope', '$state', 'auth','userMessages', function($scope, $state, auth, usermessages){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('categoryList');
      userMessages.setMessage("Your Account has been created.");
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('categoryList',{},{ reload: true });
    });
  };
}]);