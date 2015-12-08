var app = angular.module('forum-app', []);
app.controller('MainCtrl', ['$scope', function($scope){
    $scope.test = 'Hello world!';

    $scope.posts = [
        {title: 'post 1', upvotes: 5},
        {title: 'post 2', upvotes: 2},
        {title: 'post 3', upvotes: 15},
        {title: 'post 4', upvotes: 9},
        {title: 'post 5', upvotes: 4}
    ];
    
    // add posts
    $scope.addPost = function(){
        if(!$scope.newPostTitle || $scope.newPostTitle === '') { return; }
        $scope.posts.push({title: $scope.newPostTitle , upvotes: 0 });
        $scope.newPostTitle = '';
    }
    
    // display ordering functions
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
}]);