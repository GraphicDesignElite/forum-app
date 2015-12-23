var app = angular.module('forum-app', ['slugifier','ngMessages', 'ui.router', 'ui.bootstrap']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  
//All Categories
$stateProvider.state('categoryList', {
  url: '/categories',
  templateUrl: 'angularTemplates/all-categories.html',
  controller: 'CategoryCtrl',
  resolve: {
        postPromise: ['categories', function(categories){
        return categories.getAll();
        }]
    }
});
  
//Add a New Category
$stateProvider.state('addCategory', {
      url: '/add-category',
      templateUrl: 'angularTemplates/add-category.html',
      controller: 'AddCategoryCtrl'
}); 
   
//View a Single Category
$stateProvider.state('viewCategory', {
    url: '/category/{id}',
    templateUrl: 'angularTemplates/view-category.html',
    controller: 'ViewCategoryCtrl',
    resolve: {
      category: ['$stateParams', 'categories', function($stateParams, categories) {
        return categories.getOne($stateParams.id);
       }]
    }
});
   
//Delete a Category
$stateProvider.state('deleteCategory', {
    url: '/delete-category/{id}',
    templateUrl: 'angularTemplates/delete-category.html',
    controller: 'DeleteCategoryCtrl',
    resolve: {
      category: ['$stateParams', 'categories', function($stateParams, categories) {
        return categories.getOne($stateParams.id);
       }]
    }
});
  
//View all Recent Posts Regardless of Category
$stateProvider.state('recentPosts', {
    url: '/recent-posts',
    templateUrl: 'angularTemplates/recent-posts.html',
    controller: 'RecentPostsCtrl',
    resolve: {
        postPromise: ['posts', function(posts){
        return posts.getAll();
        }]
    }
});  
  
//Add a New Post
$stateProvider.state('addPost', {
    url: '/add-post',
    templateUrl: 'angularTemplates/add-post.html',
    controller: 'AddPostCtrl',
    resolve: {
        postPromise: ['categories', function(categories){
        return categories.getAll();
        }]
    }
});
 
//View a Single Post With Comments    
$stateProvider.state('viewPost', {
    url: '/viewpost/{id}',
    templateUrl: 'angularTemplates/view-post.html',
    controller: 'ViewPostsCtrl',
    resolve: {
      post: ['$stateParams', 'posts', function($stateParams, posts) {
        return posts.getOne($stateParams.id);
       }],
       postPromise: ['posts', function(posts){
        return posts.getAll();
       }] 
    }
});
   
//Delete a post
$stateProvider.state('deletePostConfirm', {
    url: '/deletepost/{id}',
    templateUrl: 'angularTemplates/delete-post.html',
    controller: 'DeletePostsCtrl',
    resolve: {
      post: ['$stateParams', 'posts', function($stateParams, posts) {
        return posts.getOne($stateParams.id);
       }] 
    }
});

//Close a Post / Discussion 
$stateProvider.state('closePostConfirm', {
    url: '/closepost/{id}',
    templateUrl: 'angularTemplates/close-post.html',
    controller: 'ClosePostsCtrl',
    resolve: {
      post: ['$stateParams', 'posts', function($stateParams, posts) {
        return posts.getOne($stateParams.id);
       }]  
    }
});

//Reopen a Post / Discussion    
$stateProvider.state('openPostConfirm', {
    url: '/openpost/{id}',
    templateUrl: 'angularTemplates/open-post.html',
    controller: 'OpenPostsCtrl',
    resolve: {
      post: ['$stateParams', 'posts', function($stateParams, posts) {
        return posts.getOne($stateParams.id);
       }]   
    }
});      

  $urlRouterProvider.otherwise('categories');
}]);
