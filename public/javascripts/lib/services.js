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
    o.create = function(post, category) {
        return $http.post('/posts/' + category, post).success(function(data){
            o.posts.push(data);
        });
    };
    o.edit = function(updateData, post, category) {
        return $http.post('/post/edit/' + post._id + '/' + category, updateData).success(function(data){
           o.posts.push(data);
        });
    };
    o.upvote = function(post) {
        return $http.put('/post/upvote/' + post._id)
            .success(function(data){
            post.upvotes += 1;
        });
   };
   o.downvote = function(post) {
        return $http.put('/post/downvote/' + post._id)
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
        return $http.delete('/post/delete/' + id).then(function(res){
            return res.data;
        });
    }
    o.close = function(post) {
        return $http.put('/post/close/' + post._id)
            .success(function(data){
            post.active = false;
        });
    };
    o.open = function(post) {
        return $http.put('/post/open/' + post._id)
            .success(function(data){
            post.active = true;
        });
    };
    o.addComment = function(id, comment) {
        return $http.post('/post/' + id + '/comments', comment);
    };
    o.upvoteComment = function(post, comment) {
    return $http.put('/comment/upvote/'+ comment._id)
        .success(function(data){
        comment.upvotes += 1;
        });
    };
    o.downvoteComment = function(post, comment) {
    return $http.put('/comment/downvote/'+ comment._id)
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
            categoryslug: 'test',
            created: Date.now(),
            categorydescription: 'Debug Model',
            views: 0
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
    o.getOneBySlug = function(slug) {
        return $http.get('/categories/view/' + slug).then(function(res){
            return res.data;
        });
    };
    o.deleteOne = function(id) {
        return $http.delete('/categories/delete/' + id).then(function(res){
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
        },
        autoHide: function(){
            
        }
    };
});
