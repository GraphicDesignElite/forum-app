app.controller('DeleteCategoryCtrl', ['$scope','$location', 'categories', 'userMessages', function($scope, $location, categories, userMessages){
	
    $scope.post = post;
	
	 $scope.deletePost = function(){
        posts.deleteOne(post._id);
        $scope.showMessage = true;
        $location.path('home');
        userMessages.setMessage("Your Post was Deleted Successfully");
    }
    
}]);