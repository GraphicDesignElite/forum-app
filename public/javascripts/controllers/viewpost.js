app.controller('ViewPostsCtrl', ['$scope', 'posts', 'post', 'userMessages', 'auth', function($scope, posts, post, userMessages, auth){
	
	$scope.posts = posts.posts;  // GET POSTS FOR RECENTS
    $scope.post = post; // GET POST TO DISPLAY
	
    // GET THE CURRENT USER, ONLY USERS CAN COMMENT
    $scope.currentUser = auth.currentUser();
    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.ownsPost = (auth.currentUser() == post.author);
    
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
	
    //SOCIAL INTERACTION
	$scope.upvotePost = function(post){
        posts.upvote(post);
    }
	$scope.downvotePost = function(post){
        posts.downvote(post);
    }
	$scope.upvoteComment = function(comment){
        posts.upvoteComment(post, comment);
    }
	$scope.downvoteComment = function(comment){
        posts.downvoteComment(post, comment);
    }
    
	//ADD A COMMENT
	$scope.addComment = function(valid){
	if(!valid || $scope.newComment === '' || $scope.newComment === 'null' || !$scope.isLoggedIn ){ return; }
		posts.addComment(post._id, {
			body: $scope.newComment,
			author: $scope.currentUser,
		}).success(function(comment) {
			$scope.post.comments.push(comment);
		});
		$scope.newComment = '';
		$scope.addcommentform.$setUntouched();
		
	};
}]);