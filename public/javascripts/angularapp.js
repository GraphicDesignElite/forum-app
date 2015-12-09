var app = angular.module('forum-app', ['ngMessages', 'ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'angularTemplates/home.html',
      controller: 'MainCtrl'
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
  controller: 'ViewPostsCtrl'
    });   

  $urlRouterProvider.otherwise('home');
}]);


app.factory('posts', [function(){
  var o = {
    posts: [ 
        {title: 'post 1', postcontent: 'something', created: Date.now(), upvotes: 5},
        {title: 'post 2', postcontent: 'something', created: Date.now(), upvotes: 2},
        {title: 'post 3', postcontent: 'something', created: Date.now(), upvotes: 15},
        {title: 'post 4', postcontent: 'something', created: Date.now(), upvotes: 9},
        {title: 'post 5', postcontent: 'something', created: Date.now(), upvotes: 4}
        ]
  };
  return o;
}]);