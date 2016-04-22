app.controller('UserProfileCtrl', ['$scope', 'users', 'user', 'userMessages', 'auth', function($scope, users, user, userMessages, auth){
	
    // GET THE USER
	$scope.user = user;
	
    // GET USER INFORMATION
    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.isAdmin = auth.isAdmin();
    $scope.currentUser = auth.currentUser();
    
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
	
    
   
}]);