app.controller('ViewPostsCtrl', ['$scope','$stateParams', 'posts', function($scope, $stateParams, posts){
	$scope.posts = posts.posts;
    
    $scope.post = posts.posts[$stateParams.id];
}]);