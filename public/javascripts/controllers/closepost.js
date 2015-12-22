app.controller('ClosePostsCtrl', ['$state', '$scope','$location', 'posts', 'post', 'userMessages', function($state, $scope, $location, posts, post, userMessages){
	
    $scope.post = post;
	
	 $scope.closePost = function(){
        posts.close(post);
        $scope.showMessage = true;
        $state.go('recentPosts');
        userMessages.setMessage("Your Post was Closed Successfully");
    }
    
}]);