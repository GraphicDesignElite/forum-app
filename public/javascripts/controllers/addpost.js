app.controller('AddPostCtrl', ['$scope', '$location','posts', 'userMessages', 'categories', function($scope, $location, posts,  userMessages, categories){

    
    $scope.categories = categories.categories;
    $scope.maxPostContentSize = 230;
    
    
    // add posts function
    $scope.addPost = function(valid){
        if(!valid || !$scope.newPostTitle || $scope.newPostTitle === '' || !$scope.newPostContent || $scope.newPostContent === ''){ return; }
        posts.create({
            title: $scope.newPostTitle ,
            postcontent: $scope.newPostContent,
            upvotes: 0,
            downvotes: 0,
            views: 0,
            active: true,
            author: 'Developer',
        }, $scope.newPostCategory);
        $scope.newPostTitle = '';
        $scope.newPostContent = '';
        $scope.showMessage = true;
        $scope.addpostform.$setUntouched();
        $location.path('home');
        userMessages.setMessage("Your Post was Added Successfully");
    }
    
}]);

