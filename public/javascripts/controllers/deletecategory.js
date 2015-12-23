app.controller('DeleteCategoryCtrl', ['$state','$scope', 'categories', 'category', 'userMessages', function($state, $scope, categories, category, userMessages){
    $scope.category = category;
    // display and ordering functions
    $scope.deleteCategory = function(){
        categories.deleteOne(category._id).then(function(){
            $state.go('categoryList', {}, { reload: true });
        });
        userMessages.setMessage("The Category was Deleted Successfully");
    }
}]);