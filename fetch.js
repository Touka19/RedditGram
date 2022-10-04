module.exports = {
  obtain: function(feed) {
    // Create and return a promise object using the 'new' keyword -> this is special to Bluebird's implementation
    // Promises will be native in ES6 and will use the same syntax as Bluebird
    return new Promise(function(resolve, reject) {
      var FeedParser = require('feedparser')
        , request = require('request');

      var req = request(feed)
        , feedparser = new FeedParser();

        req.on('error', function (error) {
          // handle any request errors
        });
        req.on('response', function (res) {
          var stream = this;

          if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

          stream.pipe(feedparser);
        });


        feedparser.on('error', function(error) {
          // always handle errors
        });
        feedparser.on('readable', function() {
          // This is where the action is!
          var stream = this
            , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
            , item;

           while (item = stream.read()) {
              console.log(item);
              resolve(JSON.stringify({"title": item.title, "url":item.link, "guid":item.guid, "test":item.image}));
          }
        });
    });
  }
}
