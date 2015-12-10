// posts service, make accessible the posts db

app.factory('posts', [function(){
  // create temporary model
  var o = {
    posts: [ 
        {
            title: 'post 1 title is so long that it actually gets truncated at the end due to the filter',
            postcontent: 'something',
            created: Date.now(),
            upvotes: 5,
            comments: 
            [
                {author: 'Joe', body: 'Cool post!', upvotes: 0, created: Date.now()},
                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0, created: Date.now()}
            ]
        },
        {title: 'post 2', postcontent: 'something', created: Date.now(), upvotes: 2, comments: [{author: 'Joe', body: 'Cool post!', upvotes: 0, created: Date.now()},{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0, created: Date.now()}]},
        {title: 'post 3', postcontent: 'something', created: Date.now(), upvotes: 15, comments: [{author: 'Joe', body: 'Cool post!', upvotes: 0, created: Date.now()},{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0, created: Date.now()}]},
        {title: 'post 4', postcontent: 'something', created: Date.now(), upvotes: 9, comments: [{author: 'Joe', body: 'Cool post!', upvotes: 0, created: Date.now()},{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0, created: Date.now()}]},
        {title: 'post 5', postcontent: 'something', created: Date.now(), upvotes: 4, comments: [{author: 'Joe', body: 'Cool post!', upvotes: 0, created: Date.now()},{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0, created: Date.now()}]}
        ]
  };
  return o;
}]);

// voting functionality
app.factory('vote', function() {
    return {
        upvote: function(post) {      
            post.upvotes += 1;
        }
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