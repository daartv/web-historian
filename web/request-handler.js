var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.writeHead(200);
  var responseBody;

  responseBody = '/<input/';

  console.log('HEY WEE GOT HERE!!!!!!!!!!!!!!!');
  res.end(responseBody);
};
