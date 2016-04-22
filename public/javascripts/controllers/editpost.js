app.controller('EditPostsCtrl', ['$state','$scope', 'posts', 'post', 'userMessages', 'categories', function($state, $scope, posts, post, userMessages, categories){
	
    // GET ASSIGNABLE CATEGORIES
    $scope.categories = categories.categories;
    
    // GET THE POST TO EDIT
    $scope.post = post;
    
    // CREATE SENSIBLE DEFAULTS
    $scope.maxPostContentSize = 400;
    $scope.maxTitleSize = 80;
    
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    
    // DISPLAY CHANGED FIELDS TO USER
    $scope.oldPostTitle = $scope.post.title;
	$scope.oldPostContent = $scope.post.postcontent;
    $scope.oldPostCategory = $scope.post.category;
    $scope.newPostTitle = $scope.post.title;
	$scope.newPostContent = $scope.post.postcontent;
    $scope.newPostCategory = $scope.post.category;
    
    // EDIT THE POST
	$scope.editPost = function(valid){
        if(!valid || !$scope.newPostTitle || $scope.newPostTitle === '' || !$scope.newPostContent || $scope.newPostContent === ''){ return; }
        posts.edit({
            title: $scope.newPostTitle,
            postcontent: $scope.newPostContent,
            category: $scope.newPostCategory
        }, $scope.post, $scope.oldPostCategory).then(function(){
            window.history.go(-1);
            $scope.newPostTitle = '';
            $scope.newPostContent = '';
            $scope.showMessage = true;
            $scope.addpostform.$setUntouched();
        });
        
    }
	
}]);