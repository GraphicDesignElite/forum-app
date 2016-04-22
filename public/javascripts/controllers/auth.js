app.controller('AuthCtrl', ['$scope', '$state', 'auth','userMessages', function($scope, $state, auth, userMessages){
    $scope.user = {};
    
    
    // HOLD OUR SERVER ERRORS FOR USER REGISTRATION
    $scope.serverError = '';
    
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }

    // USER REGISTRATION - CREATE A NEW USER
    $scope.register = function(){
        auth.register($scope.user).error(function(error){
        $scope.error = error;
        if(error.search('E11000')){
            $scope.serversideError ="The Username or Email Already Exists";
        }
        else{
            $scope.serversideError ="Unknown Error.";
        }
        
        }).then(function(){
            $state.go('categoryList',{},{ reload: true });
        });
    };

    $scope.logIn = function(){
        auth.logIn($scope.user).error(function(error){
        $scope.error = error;
        $scope.serverError = error.message;
        
        }).then(function(){
          // return user to previous action
            
            $state.go('categoryList',{},{ reload: true });
            
        });
    }; 
}]);

// HANDLE PASSWORD CONFIRMATION
app.directive('confirmPwd', function($interpolate, $parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModelCtrl) {

      var pwdToMatch = $parse(attr.confirmPwd);
      var pwdFn = $interpolate(attr.confirmPwd)(scope);

      scope.$watch(pwdFn, function(newVal) {
          ngModelCtrl.$setValidity('password', ngModelCtrl.$viewValue == newVal);
      })

      ngModelCtrl.$validators.password = function(modelValue, viewValue) {
        var value = modelValue || viewValue;
        return value == pwdToMatch(scope);
      };

    }
  }
});