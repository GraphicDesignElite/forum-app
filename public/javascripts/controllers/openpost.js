app.controller('OpenPostsCtrl', ['$state', '$scope','$location', 'posts', 'post', 'userMessages', function($state, $scope, $location, posts, post, userMessages){
	
    $scope.post = post;
	
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    //OPEN A POST
	$scope.openPost = function(){
        posts.open(post);
        $scope.showMessage = true;
        $state.go('recentPosts');
    }
    
}]);