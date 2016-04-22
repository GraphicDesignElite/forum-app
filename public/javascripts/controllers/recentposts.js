
app.controller('RecentPostsCtrl', ['$scope','posts', 'userMessages', 'auth', function($scope, posts, userMessages, auth){
    // GET THE POSTS
    $scope.posts = posts.posts;
    
    // GET USER INFORMATION
    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.isAdmin = auth.isAdmin();
    
    //HANDLE USER MESSAGES
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
    $scope.orderByView = function(){
        if($scope.rowFilter == '-views'){
            $scope.rowFilter = 'views';
        }
        else{
            $scope.rowFilter = '-views';
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
    
}]);

