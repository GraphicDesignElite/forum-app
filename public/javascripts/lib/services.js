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
  
  
  return o;
}]);

// voting functionality
app.factory('vote', function() {
    return {
        upvote: function(post) {      
            post.upvotes += 1;
        },
        downvote: function(post) {      
            post.downvotes += 1;
        },
    };
});


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