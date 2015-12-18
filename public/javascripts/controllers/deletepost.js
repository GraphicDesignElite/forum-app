app.controller('DeletePostsCtrl', ['$state', '$scope','$location', 'posts', 'post', 'userMessages', function($state, $scope, $location, posts, post, userMessages){
	
    $scope.post = post;
	
	 $scope.deletePost = function(){
        posts.deleteOne(post._id);
        $scope.showMessage = true;
        $state.go('recentPosts');
        userMessages.setMessage("Your Post was Deleted Successfully");
    }
    
}]);