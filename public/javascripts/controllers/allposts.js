
app.controller('RecentPostsCtrl', ['$scope','posts', 'userMessages', function($scope, posts, userMessages){

    
    $scope.message = "";
       
    $scope.posts = posts.posts; // add [posts] from our factory in angularapp
    $scope.message = userMessages.getMessage();
  
    // upvote a post with our vote service
    $scope.upvotePost = function(post){
        posts.upvote(post);
    }
    // downvote a post with our vote service
	$scope.downvotePost = function(post){
        posts.downvote(post);
    }
      
    // display and ordering functions
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
    $scope.hideMessage = function(){
        userMessages.setMessage('');
        $scope.message = userMessages.getMessage();
    }
}]);

