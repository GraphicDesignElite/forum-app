app.controller('DeletePostsCtrl', ['$state', '$scope','$location', 'posts', 'post', 'userMessages', function($state, $scope, $location, posts, post, userMessages){
	
    $scope.post = post;
	
	 $scope.deletePost = function(){
        posts.deleteOne(post._id).then(function(){
            $state.go('recentPosts', {}, { reload: true });
            
        });
        $scope.showMessage = true;
        
        userMessages.setMessage("Your Post was Deleted Successfully");
    }
    
}]);