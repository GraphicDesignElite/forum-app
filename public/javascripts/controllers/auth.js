app.controller('AuthCtrl', ['$scope', '$state', 'auth','userMessages', function($scope, $state, auth, userMessages){
    $scope.user = {};
  
    // HOLD OUR SERVER ERRORS FOR USER REGISTRATION
    $scope.serversideError = '';
    
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
        $scope.userMessage = userMessages.getMessage();
        
        }).then(function(){
            $state.go('categoryList');
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