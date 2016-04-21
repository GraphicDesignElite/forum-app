app.controller('DeleteCategoryCtrl', ['$state','$scope', 'categories', 'category', 'userMessages', 'auth', function($state, $scope, categories, category, userMessages, auth){
    
    // GET THE POST TO BE DELETED FOR REVIEW
    $scope.category = category;
    
    //HANDLE USER MESSAGES
    $scope.userMessage = userMessages.getMessage();
    $scope.hideMessage = function(){
        userMessages.hideMessage();
        $scope.userMessage = userMessages.getMessage();
    }
    
    // DELETE A CATEGORY AND ALL POSTS AND COMMENTS INSIDE OF IT
    $scope.deleteCategory = function(){
        categories.deleteOne(category._id).then(function(){
            window.history.go(-1);
        },
        function(){
           $state.go('categoryList', {}, { reload: true });
            userMessages.setMessage("Error: The Category was not deleted."); 
        }
        );
        
    }
}]);