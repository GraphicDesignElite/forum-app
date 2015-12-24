app.controller('ViewPostsCtrl', ['$scope', 'posts', 'post', function($scope, posts, post){
	
	$scope.posts = posts.posts;  // if we want to display recent posts below
    $scope.post = post;
	
	
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
	
	$scope.addComment = function(valid){
	if(!valid || $scope.newComment === '' || $scope.newComment === 'null' ){ return; }
		posts.addComment(post._id, {
			body: $scope.newComment,
			author: 'user',
		}).success(function(comment) {
			$scope.post.comments.push(comment);
		});
		$scope.newComment = '';
		$scope.addcommentform.$setUntouched();
		
	};
}]);