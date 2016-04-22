var app = angular.module('forum-app', ['ngMessages', 'ui.router', 'ui.bootstrap', 'yaru22.angular-timeago','slugifier',]);

app.config([
'$stateProvider',
'$urlRouterProvider',
'$httpProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    
    // Expose XHR requests to server
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $locationProvider.html5Mode(true);
    // Root Functions
    // Control mobile menu
    function NavBarCtrl($scope) {
        $scope.isCollapsed = true;
    }
    
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
        controller: 'AddCategoryCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(!auth.isAdmin()){
                $state.go('login');
            }
        }]
    }); 
    
    //View a Single Category By ID
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

    //View a Single Category By Name
    $stateProvider.state('viewCategoryByName', {
        url: '/categories/{slug}',
        templateUrl: 'angularTemplates/view-category.html',
        controller: 'ViewCategoryCtrl',
        resolve: {
        category: ['$stateParams', 'categories', function($stateParams, categories) {
            return categories.getOneBySlug($stateParams.slug);
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
        },
        onEnter: ['$state', 'auth', function($state, auth){
            if(!auth.isAdmin()){
                $state.go('login');
            }
        }]
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
        },
        onEnter: ['$state', 'auth', function($state, auth){
            if(!auth.isLoggedIn()){
                $state.go('login');
            }
        }]
    });
    
    //View a Single Post With Comments    
    $stateProvider.state('viewPost', {
        url: '/view-post/{id}/{slug}',
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

    //View a Single Post With Comments    
    $stateProvider.state('editPost', {
        url: '/editpost/{id}',
        templateUrl: 'angularTemplates/edit-post.html',
        controller: 'EditPostsCtrl',
        resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.getOne($stateParams.id);
        }],
        postPromise: ['categories', function(categories){
            return categories.getAll();
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
        },
        onEnter: ['$state', 'auth', function($state, auth){
            if(!auth.isLoggedIn()){
                $state.go('login');
            }
        }]
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
        },
        onEnter: ['$state', 'auth', function($state, auth){
            if(!auth.isLoggedIn()){
                $state.go('login');
            }
        }]
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
        },
        onEnter: ['$state', 'auth', function($state, auth){
            if(!auth.isLoggedIn()){
                $state.go('login');
            }
        }]
    });      

    // User info State    
    $stateProvider.state('userProfile', {
        url: '/user-profile/{username}',
        templateUrl: 'angularTemplates/user-profile.html',
        controller: 'UserProfileCtrl',
        resolve: {
        user: ['$stateParams', 'users', function($stateParams, users) {
            return users.getOne($stateParams.username);
        }]
        },
        onEnter: ['$state', 'auth', function($state, auth){
            if(!auth.isLoggedIn()){
                $state.go('login');
            }
        }]
    });

    // Log in State
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'angularTemplates/login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
                $state.go('categoryList');
            }
        }]
    }); 
    
    // Registration state
    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'angularTemplates/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
                $state.go('categoryList');
            }
        }]
    }); 

    $urlRouterProvider.otherwise('categories');
}]);
