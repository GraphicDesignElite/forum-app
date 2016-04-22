app.controller('ClosePostsCtrl', ['$state', '$scope','$location', 'posts', 'post', 'userMessages', 'auth', function($state, $scope, $location, posts, post, userMessages, auth){
	
    // GET THE POST TO CLOSE FOR REVIEW
    $scope.post = post;
	
    // GET USER INFORMATION
    $scope.currentUser = auth.currentUser();
    
    
    // HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    
    // CLOSE A POST
	$scope.closePost = function(){
        posts.close(post).then(
            function(){
                $state.go('recentPosts', {}, { reload: true });
            }
        );
        
    }
    
}]);