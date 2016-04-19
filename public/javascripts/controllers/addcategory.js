app.controller('AddCategoryCtrl', ['$state', '$scope', '$location' ,'categories', 'userMessages','auth', function($state, $scope, $location, categories, userMessages, auth){

    $scope.userMessage = '';
    $scope.maxPostContentSize = 230;
    
    $scope.currentUser = auth.currentUser();
    
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    
    // ADD A NEW POST
    $scope.addCategory = function(valid){
        if(!valid || !$scope.newCategoryTitle || $scope.newCategoryTitle === ''){ return; }
        categories.create({
            categoryname: $scope.newCategoryTitle,
            categoryslug: $scope.newCategorySlug,
            categorydescription: $scope.newCategoryDescription,
            views: 0,
            createdby: $scope.currentUser,
        }).then(function(){
            $scope.newCategoryTitle = '';
            $scope.addcategoryform.$setUntouched();
            $state.go('categoryList');
            
        },function(error){
           userMessages.setMessage("A Duplicate Category Cannot Be Added");
           $scope.userMessage = userMessages.getMessage();
        }
        );
        
    }
    
    $scope.hideMessage = function(){
        userMessages.setMessage('');
        $scope.userMessage = userMessages.getMessage();
    }
    
}]);

