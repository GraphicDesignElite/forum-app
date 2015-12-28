app.controller('AddPostCtrl', ['$state', '$scope','posts', 'userMessages', 'categories', function($state, $scope, posts,  userMessages, categories){

    
    $scope.categories = categories.categories;
    $scope.maxPostContentSize = 400;
    $scope.maxTitleSize = 80;
    
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
        }, $scope.newPostCategory).then(function(){
            $state.go('categoryList', {}, { reload: true });
            $scope.newPostTitle = '';
            $scope.newPostContent = '';
            $scope.showMessage = true;
            $scope.addpostform.$setUntouched();
            userMessages.setMessage("Your Post was Edited Successfully");
        });
        
    }
    
}]);

