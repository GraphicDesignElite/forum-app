app.controller('ViewPostsCtrl', ['$scope','$stateParams', 'posts', 'vote', function($scope, $stateParams, posts, vote){
	$scope.posts = posts.posts;  // if we want to display recent posts below
    $scope.post = posts.posts[$stateParams.id];
	
	
	$scope.upvotePost = function(post){
        vote.upvote(post);
    }
	$scope.downvotePost = function(post){
        vote.downvote(post);
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