// posts service, make accessible the posts db

app.factory('posts',  ['$http', function($http){
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
        return $http.get('/posts').success(function(data){
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post) {
        return $http.post('/posts', post).success(function(data){
            o.posts.push(data);
        });
    };
    o.upvote = function(post) {
        return $http.put('/posts/' + post._id + '/upvote')
            .success(function(data){
            post.upvotes += 1;
        });
   };
   o.downvote = function(post) {
        return $http.put('/posts/' + post._id + '/downvote')
            .success(function(data){
            post.downvotes += 1;
        });
    };
    o.getOne = function(id) {
        return $http.get('/posts/' + id).then(function(res){
            return res.data;
        });
    };
    o.deleteOne = function(id) {
        return $http.delete('/posts/delete/' + id).then(function(res){
            return res.data;
        });
    };
    o.addComment = function(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment);
    };
    o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
        .success(function(data){
        comment.upvotes += 1;
        });
    };
    o.downvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/downvote')
        .success(function(data){
        comment.downvotes += 1;
        });
    };
  return o;
}]);


app.factory('categories',  ['$http', function($http){
    var o = {
      //Debug model
    categories: [ 
            {
            categoryname: 'Test',
            created: Date.now()
            }
        ]
    };
    o.getAll = function() {
        return $http.get('/categories').success(function(data){
            angular.copy(data, o.categories);
        });
    };
     o.create = function(category) {
        return $http.post('/categories', category).success(function(data){
            o.categories.push(data);
        });
    };
    o.getOne = function(id) {
        return $http.get('/categories/' + id).then(function(res){
            return res.data;
        });
    };
    o.deleteOne = function(category) {
        return $http.delete('/categories/delete/' + category._id).then(function(res){
            return res.data;
        });
    };
  return o;
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
        }
    };
});