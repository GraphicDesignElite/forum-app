var app = angular.module('forum-app', ['ngMessages']);
app.controller('MainCtrl', ['$scope','posts', function($scope, posts){

    $scope.showPosts = true;
    $scope.showForm = false;
    $scope.message = "";
    $scope.showMessage = false;
    
    $scope.posts = posts.posts;
    
    $scope.posts = [
        {title: 'post 1', upvotes: 5},
        {title: 'post 2', upvotes: 2},
        {title: 'post 3', upvotes: 15},
        {title: 'post 4', upvotes: 9},
        {title: 'post 5', upvotes: 4}
    ];
    
    
    
    // add posts
    $scope.addPost = function(valid){
        if(!valid || !$scope.newPostTitle || $scope.newPostTitle === '' || !$scope.newPostContent || $scope.newPostContent === ''){ return; }
        $scope.posts.push({title: $scope.newPostTitle , postcontent: $scope.newPostContent, upvotes: 0, created: Date.now() });
        $scope.newPostTitle = '';
        $scope.newPostContent = '';
        $scope.message = "Your Post Was Successfully Added";
        $scope.showMessage = true;
        $scope.switchPostViews();
        $scope.addpostform.$setUntouched();
    }
    // upvote a post
    $scope.upvotePost = function(post){
        post.upvotes += 1;
    }
    // display and ordering functions
    $scope.orderByTitle = function(){
        if($scope.rowFilter == 'title'){
            $scope.rowFilter = '-title';
        }
        else{
            $scope.rowFilter = 'title';
        }
    };
    $scope.orderByVotes = function(){
        if($scope.rowFilter == '-upvotes'){
            $scope.rowFilter = 'upvotes';
        }
        else{
            $scope.rowFilter = '-upvotes';
        }
    };
    $scope.orderByDate= function(){
        if($scope.rowFilter == '-created'){
            $scope.rowFilter = 'created';
        }
        else{
            $scope.rowFilter = '-created';
        }
    };
    $scope.switchPostViews = function(){
        if($scope.showPosts){
            $scope.showPosts = false;
            $scope.showForm = true;
        }
        else{
            $scope.showPosts = true;
            $scope.showForm = false;
        }
    }
    $scope.hideMessage = function(){
        $scope.message = "";
        $scope.showMessage = false;
    }
}]);

app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);