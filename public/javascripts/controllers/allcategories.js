
app.controller('CategoryCtrl', ['$scope','$location','categories', 'userMessages', 'auth', function($scope, $location, categories, userMessages, auth){
   
    // GET ALL CATEGORIES
    $scope.categories = categories.categories; 
    
    // GET USER INFORMATION
    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.isAdmin = auth.isAdmin();
    
    // HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    // DELETE A CATEGORY
    $scope.deleteCategory = function(category){
        categories.deleteOne(category);
        $scope.showMessage = true;
        userMessages.setMessage("The Category was Deleted Successfully");
    }
    
    // CATEGORY DISPLAY ORDER
    $scope.orderByTitle = function(){
        if($scope.rowFilter == 'categoryname'){
            $scope.rowFilter = '-categoryname';
        }
        else{
            $scope.rowFilter = 'categoryname';
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
    $scope.orderByTopics= function(){
        if($scope.rowFilter == 'posts.length'){
            $scope.rowFilter = '-posts.length';
        }
        else{
            $scope.rowFilter = 'posts.length';
        }
    };
    $scope.orderByViews = function(){
        if($scope.rowFilter == 'views'){
            $scope.rowFilter = '-views';
        }
        else{
            $scope.rowFilter = 'views';
        }
    };
   
}]);

