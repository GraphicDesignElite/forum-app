var app = angular.module('forum-app', ['slugifier','ngMessages', 'ui.router', 'ui.bootstrap']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('categoryList', {
  url: '/categories',
  templateUrl: 'angularTemplates/all-categories.html',
  controller: 'CategoryCtrl',
  resolve: {
        postPromise: ['categories', function(categories){
        return categories.getAll();
        }]
    }
  });
  
  $stateProvider
    .state('addCategory', {
      url: '/add-category',
      templateUrl: 'angularTemplates/add-category.html',
      controller: 'AddCategoryCtrl'
   }); 
   
  $stateProvider
    .state('recentPosts', {
  url: '/recent-posts',
  templateUrl: 'angularTemplates/recent-posts.html',
  controller: 'RecentPostsCtrl',
  resolve: {
        postPromise: ['posts', function(posts){
        return posts.getAll();
        }]
    }
  });  
  
  $stateProvider
    .state('addPost', {
      url: '/add-post',
      templateUrl: 'angularTemplates/add-post.html',
      controller: 'AddPostCtrl',
      resolve: {
        postPromise: ['categories', function(categories){
        return categories.getAll();
        }]
    }
    });  
      
  $stateProvider  
  .state('viewPost', {
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
   
   $stateProvider  
  .state('viewCategory', {
    url: '/category/{id}',
    templateUrl: 'angularTemplates/view-category.html',
    controller: 'ViewCategoryCtrl',
    resolve: {
      category: ['$stateParams', 'categories', function($stateParams, categories) {
        return categories.getOne($stateParams.id);
       }]
    }
   });
   
    $stateProvider  
  .state('deletePostConfirm', {
    url: '/deletepost/{id}',
    templateUrl: 'angularTemplates/delete-post.html',
    controller: 'DeletePostsCtrl',
    resolve: {
      post: ['$stateParams', 'posts', function($stateParams, posts) {
        return posts.getOne($stateParams.id);
       }]
       
    }
   });  

  $urlRouterProvider.otherwise('recent-posts');
}]);
