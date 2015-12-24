app.controller('EditPostsCtrl', ['$scope', 'posts', 'post', 'userMessages', 'categories', function($scope, posts, post, userMessages, categories){
	
    $scope.categories = categories.categories;
    $scope.post = post;
    
    $scope.maxPostContentSize = 400;
    $scope.maxTitleSize = 80;
    
    $scope.oldPostTitle = $scope.post.title;
	$scope.oldPostContent = $scope.post.postcontent;
    $scope.oldPostCategory = $scope.post.category;
    $scope.newPostTitle = $scope.post.title;
	$scope.newPostContent = $scope.post.postcontent;
    $scope.newPostCategory = $scope.post.category;
    
    
	$scope.EditPost = function(valid){
        if(!valid || !$scope.newPostTitle || $scope.newPostTitle === '' || !$scope.newPostContent || $scope.newPostContent === ''){ return; }
        posts.update({
            title: $scope.newPostTitle ,
            postcontent: $scope.newPostContent,
            upvotes: 0,
            downvotes: 0,
            views: 0,
            active: true,
        }, $scope.newPostCategory).then(function(){
            $state.go('categoryList', {}, { reload: true });
            $scope.newPostTitle = '';
            $scope.newPostContent = '';
            $scope.showMessage = true;
            $scope.addpostform.$setUntouched();
            userMessages.setMessage("Your Post was Added Successfully");
        });
        
    }
	
}]);