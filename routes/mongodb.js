
/*
 * Test connect mongodb
 */

/*
var mongodb = require('../models/db');
mongodb.open(function(err, db) {
  if (err) {
    console.log("Open mongodb failure");
  } else {
    console.log("Open mongodb success");
  }
});
*/

// exports.list = function(req, res){
//   res.send('Test connect mongodb.');
// };


var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');

module.exports = function(app) {
  app.get('/mongodb', function(req, res) {
    res.send('Test connect mongodb.');
  });
}

