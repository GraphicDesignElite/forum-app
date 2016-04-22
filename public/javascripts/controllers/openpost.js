app.controller('OpenPostsCtrl', ['$state', '$scope','$location', 'posts', 'post', 'userMessages', 'auth', function($state, $scope, $location, posts, post, userMessages, auth){
	
    // GET THE POST TO OPEN
    $scope.post = post;
	
    // HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    // OPEN A POST
	$scope.openPost = function(){
        posts.open(post).then(
            function(){
                $state.go('recentPosts', {}, { reload: true });
            }
        );
    }
    
}]);