// posts service

app.factory('posts',  ['$http', 'userMessages', function($http, userMessages){
    var o = {
      //Debug model
    posts: [ 
        {
            title: 'post 1 title is so long that it actually gets truncated at the end due to the filter',
            postcontent: 'something',
            created: Date.now(),
            upvotes: 5,
            downvotes: 0,
            comments: 
            [
                {author: 'Joe', body: 'Cool post!', upvotes: 0, downvotes: 0, created: Date.now()},
                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0, downvotes: 0, created: Date.now()}
            ]
        }
        ]
    };
    o.getAll = function() {
        return $http.get('/api/posts').success(function(data){
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post, category) {
        return $http.post('/api/posts/' + category, post).success(function(data){
            o.posts.push(data);
            userMessages.setMessage("Your Post was Added Successfully");
        });
    };
    o.edit = function(updateData, post, category) {
        return $http.post('/api/posts/edit/' + post._id + '/' + category, updateData).success(function(data){
           o.posts.push(data);
           userMessages.setMessage("Your Post was Edited Successfully");
        });
    };
    o.upvote = function(post) {
        return $http.put('/api/posts/upvote/' + post._id)
            .success(function(data){
            post.upvotes += 1;
        });
    };
   o.downvote = function(post) {
        return $http.put('/api/posts/downvote/' + post._id)
            .success(function(data){
            post.downvotes += 1;
        });
    };
    o.getOne = function(id) {
        return $http.get('/api/posts/' + id).then(function(res){
            return res.data;
        });
    };
    o.deleteOne = function(id) {
        return $http.delete('/api/posts/delete/' + id).then(function(res){
            userMessages.setMessage("Your Post was Deleted");
            return res.data;
        });
    }
    o.close = function(post) {
        return $http.put('/api/posts/close/' + post._id)
            .success(function(data){
            post.active = false;
            userMessages.setMessage("The Post has been closed: " +  post.title );
        });
    };
    o.open = function(post) {
        return $http.put('/api/posts/open/' + post._id)
            .success(function(data){
            post.active = true;
            userMessages.setMessage("The Post has been reopened: " +  post.title );
        });
    };
    o.addComment = function(id, comment) {
        return $http.post('/api/comment/' + id + '/comments', comment);
    };
    o.upvoteComment = function(post, comment) {
    return $http.put('/api/comment/upvote/'+ comment._id)
        .success(function(data){
        comment.upvotes += 1;
        });
    };
    o.downvoteComment = function(post, comment) {
    return $http.put('/api/comment/downvote/'+ comment._id)
        .success(function(data){
        comment.downvotes += 1;
        });
    };
  return o;
}]);

// CATEGORIES service
app.factory('categories',  ['$http', 'userMessages', function($http, userMessages){
    var o = {
      //Debug model
    categories: [ 
            {
            categoryname: 'Test',
            categoryslug: 'test',
            created: Date.now(),
            categorydescription: 'Debug Model',
            views: 0
            }
        ]
    };
    o.getAll = function() {
        return $http.get('/api/categories').success(function(data){
            angular.copy(data, o.categories);
        });
    };
     o.create = function(category) {
        return $http.post('/api/categories', category).success(function(data){
            o.categories.push(data);
            userMessages.setMessage("The New Category: " + category.categoryslug + " was Added Successfully");
        });
    };
    o.getOne = function(id) {
        return $http.get('/api/categories/' + id).then(function(res){
            return res.data;
        });
    };
    o.getOneBySlug = function(slug) {
        return $http.get('/api/categories/view/' + slug).then(function(res){
            return res.data;
        });
    };
    o.deleteOne = function(id) {
        return $http.delete('/api/categories/delete/' + id).then(function(res){
            userMessages.setMessage("The Category was Deleted Successfully");
            return res.data;
        });
    };
    
  return o;
}]);

//AUTHORIZATION service
app.factory('auth', ['$http','$window', '$timeout', 'userMessages', function($http, $window, $timeout, userMessages){
    var auth = {};
    auth.saveToken = function (token){
        $window.localStorage['forum-token'] = token;
    };

    auth.getToken = function (){
        return $window.localStorage['forum-token'];
    }
    auth.isLoggedIn = function(){
        var token = auth.getToken();

        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };
    auth.register = function(user){
        return $http.post('/api/register', user).success(function(data){
            auth.saveToken(data.token);
            userMessages.setMessage("Your Account Has Been Created.")
        });
    };
    auth.logIn = function(user){
        return $http.post('/api/login', user).success(function(data){
            auth.saveToken(data.token);
            userMessages.setMessage( user.username + "has succesfully logged in.")
        });
    };
    auth.logOut = function(){
        userMessages.setMessage("You have succesfully logged out.")
        $window.localStorage.removeItem('forum-token');
    };
    
    return auth;   
}]);

// create and destroy user messages
app.service('userMessages', function () {
    var usermessage = '';
    return {
        getMessage: function () {
            return usermessage;
        },
        setMessage: function(value) {
            usermessage = value;
        },
        hideMessage: function() {
            usermessage = '';
        }
    };
});
