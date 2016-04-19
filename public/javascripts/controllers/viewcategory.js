app.controller('ViewCategoryCtrl', ['$scope', 'posts', 'category', 'userMessages', 'auth', function($scope, posts, category, userMessages, auth){
	
    $scope.category = category;
    
    // USER INFORMATION
    $scope.isLoggedIn = auth.isLoggedIn();
    // HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    
    // DISPLAY ORDERING
    $scope.orderByTitle = function(){
        if($scope.rowFilter == 'title'){
            $scope.rowFilter = '-title';
        }
        else{
            $scope.rowFilter = 'title';
        }
    };
    $scope.orderByVotes = function(){
        if($scope.rowFilter == '-upvotes'){
            $scope.rowFilter = 'upvotes';
        }
        else{
            $scope.rowFilter = '-upvotes';
        }
    };
    $scope.orderByReplies= function(){
        if($scope.rowFilter == '-comments.length'){
            $scope.rowFilter = 'comments.length';
        }
        else{
            $scope.rowFilter = '-comments.length';
        }
    };
    $scope.orderByView = function(){
        if($scope.rowFilter == '-views'){
            $scope.rowFilter = 'views';
        }
        else{
            $scope.rowFilter = '-views';
        }
    };
	

}]);