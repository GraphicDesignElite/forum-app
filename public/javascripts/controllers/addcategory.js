app.controller('AddCategoryCtrl', ['$state', '$scope', '$location' ,'categories', 'userMessages', function($state, $scope, $location, categories, userMessages){

    $scope.message = '';
    $scope.maxPostContentSize = 230;
    
    
    
    // add posts function
    $scope.addCategory = function(valid){
        if(!valid || !$scope.newCategoryTitle || $scope.newCategoryTitle === ''){ return; }
        categories.create({
            categoryname: $scope.newCategoryTitle,
            categoryslug: $scope.newCategorySlug,
            categorydescription: $scope.newCategoryDescription,
            views: 0,
        }).then(function(){
            $scope.newCategoryTitle = '';
            $scope.showMessage = true;
            $scope.addcategoryform.$setUntouched();
            $state.go('categoryList');
            userMessages.setMessage("Your Category was Added Successfully"); 
            
        },function(error){
           userMessages.setMessage("This Category Cannot Be Added!");
           $scope.message = userMessages.getMessage();
        }
        );
        
    }
    
    $scope.hideMessage = function(){
        userMessages.setMessage('');
        $scope.message = userMessages.getMessage();
    }
    
}]);

