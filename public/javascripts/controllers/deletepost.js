app.controller('DeletePostsCtrl', ['$scope','$location', 'posts', 'post', 'userMessages', function($scope, $location, posts, post, userMessages){
	
    $scope.post = post;
	
	 $scope.deletePost = function(){
        posts.deleteOne(post._id);
        $scope.showMessage = true;
        $location.path('home');
        userMessages.setMessage("Your Post was Deleted Successfully");
    }
    
}]);