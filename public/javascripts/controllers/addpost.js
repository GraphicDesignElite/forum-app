app.controller('AddPostCtrl', ['$state', '$scope','posts', 'userMessages', 'categories', function($state, $scope, posts,  userMessages, categories){
    //AUTO POPULATE SYSTEMWIDE CATEGORIES
    $scope.categories = categories.categories;
    
    // SET SENSIBLE DEFAULTS
    $scope.maxPostContentSize = 400;
    $scope.maxTitleSize = 80;
    
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    
    // ADD A NEW POST
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
        }, $scope.newPostCategory).then(function(){
            $state.go('categoryList', {}, { reload: true });
            $scope.newPostTitle = '';
            $scope.newPostContent = '';
            $scope.showMessage = true;
            $scope.addpostform.$setUntouched();
        });
        
    }
    
}]);

