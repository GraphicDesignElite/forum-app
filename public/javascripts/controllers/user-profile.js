app.controller('UserProfileCtrl', ['$scope', 'users', 'user', 'userMessages', 'auth', function($scope, users, user, userMessages, auth){
	
	$scope.user = user;
	
    // GET THE CURRENT USER, ONLY USERS CAN COMMENT
    $scope.currentUser = auth.currentUser();
    $scope.isLoggedIn = auth.isLoggedIn();
    
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
	
    
   
}]);