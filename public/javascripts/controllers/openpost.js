app.controller('OpenPostsCtrl', ['$state', '$scope','$location', 'posts', 'post', 'userMessages', function($state, $scope, $location, posts, post, userMessages){
	
    $scope.post = post;
	
	 $scope.openPost = function(){
        posts.open(post);
        $scope.showMessage = true;
        $state.go('recentPosts');
        userMessages.setMessage("Your Post was Reopened Successfully");
    }
    
}]);