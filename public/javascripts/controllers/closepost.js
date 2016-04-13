app.controller('ClosePostsCtrl', ['$state', '$scope','$location', 'posts', 'post', 'userMessages', function($state, $scope, $location, posts, post, userMessages){
	
    // GET THE POST TO CLOSE FOR REVIEW
    $scope.post = post;
	
    // HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    
    // CLOSE A POST
	$scope.closePost = function(){
        posts.close(post);
        $scope.showMessage = true;
        $state.go('recentPosts');
    }
    
}]);