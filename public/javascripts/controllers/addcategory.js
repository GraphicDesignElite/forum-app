app.controller('AddCategoryCtrl', ['$state', '$scope', '$location' ,'categories', 'userMessages', function($state, $scope, $location, categories, userMessages){


    $scope.maxPostContentSize = 230;
    
    // add posts function
    $scope.addCategory = function(valid){
        if(!valid || !$scope.newCategoryTitle || $scope.newCategoryTitle === ''){ return; }
        categories.create({
            categoryname: $scope.newCategoryTitle,
            categoryslug: $scope.newCategorySlug,
        });
        $scope.newCategoryTitle = '';
        $scope.showMessage = true;
        $scope.addcategoryform.$setUntouched();
        $state.go('categoryList');
        userMessages.setMessage("Your Category was Added Successfully");
    }
    
}]);

