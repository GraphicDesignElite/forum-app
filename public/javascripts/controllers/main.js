
app.controller('MainCtrl', ['$scope','posts', function($scope, posts){

    $scope.showPosts = true;
    $scope.showForm = false;
    $scope.message = "";
    $scope.showMessage = false;
    
    $scope.posts = posts.posts; // add [posts] from our factory in angularapp
    
  
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

