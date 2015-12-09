app.controller('ViewPostsCtrl', ['$scope','$stateParams', 'posts', function($scope, $stateParams, posts){
	$scope.posts = posts.posts;  // if we want to display recent posts below
    $scope.post = posts.posts[$stateParams.id];
	
	
}]);