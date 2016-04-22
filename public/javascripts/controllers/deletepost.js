app.controller('DeletePostsCtrl', ['$state', '$scope','$location', 'posts', 'post', 'userMessages','auth', function($state, $scope, $location, posts, post, userMessages, auth){
	
    // GET THE POST TO BE DELETED FOR REVIEW
    $scope.post = post;
    
    // GET USER INFORMATION
    $scope.currentUser = auth.currentUser();
	
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    
    // DELETE A POST
	$scope.deletePost = function(){
        posts.deleteOne(post._id).then(function(){
            $state.go('recentPosts', {}, { reload: true });   
        });
    }
}]);