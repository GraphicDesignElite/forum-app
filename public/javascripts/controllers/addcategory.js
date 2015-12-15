app.controller('AddCategoryCtrl', ['$scope', '$location' ,'categories', 'userMessages', function($scope, $location, categories, userMessages){


    $scope.maxPostContentSize = 230;
    
    // add posts function
    $scope.addCategory = function(valid){
        if(!valid || !$scope.newCategoryTitle || $scope.newCategoryTitle === ''){ return; }
        categories.create({
            categoryname: $scope.newCategoryTitle ,
        });
        $scope.newCategoryTitle = '';
        $scope.showMessage = true;
        $scope.addpostform.$setUntouched();
        $location.path('home');
        userMessages.setMessage("Your Category was Added Successfully");
    }
    
}]);

