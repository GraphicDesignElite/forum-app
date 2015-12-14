var app = angular.module('forum-app', ['ngMessages', 'ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('allPosts', {
  url: '/all-posts',
  templateUrl: 'angularTemplates/home.html',
  controller: 'MainCtrl',
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
      controller: 'AddPostCtrl'
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

  $urlRouterProvider.otherwise('all-posts');
}]);
