app.controller('ViewPostsCtrl', ['$scope','$stateParams', 'posts', 'post', function($scope, $stateParams, posts, post){
	
	$scope.posts = posts.posts;  // if we want to display recent posts below
    $scope.post = post;
	
	
	$scope.upvotePost = function(post){
        posts.upvote(post);
    }
	$scope.downvotePost = function(post){
        posts.downvote(post);
    }
	
	$scope.addComment = function(){
		if($scope.newComment =='' || $scope.newComment == null){return;}
		$scope.post.comments.push({
			author: 'Anonymous',
			body: $scope.newComment,
			upvotes: 0,
			downvotes: 0,
			created: Date.now()
		});
		$scope.newComment = '';
	}
}]);