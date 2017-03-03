var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {


  var encoding = {encoding: 'utf8'};
//1. check in public folder ...
  fs.readFile(archive.paths.siteAssets + asset, encoding, function(err, data) {
    if (err) {

    //2. Site doesn't exist in the public folder

      fs.readFile( archive.paths.archivedSites + asset, encoding, function(err, data) {
        if (err) {
          callback ? callback() : exports.send404(res);
        } else {
          //file exists, serve it
          exports.sendResponse(res, data);
        }
      });
    } else {
      // file exists, serve it
      exports.sendResponse(res, data);
    }
  });



};

//NEED:
exports.sendRedirect = function (response, location, status) {
  var status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();

};
exports.collectData = function (request, calback) {
  var data = '';
  request.on(function(chunk) {
    data += chunk;
  });
  calback(data);
};
exports.sendResponse = function (response, data, status) {
  var status = status || 200;
  response.writeHead(status, exports.headers);
  response.end(data);
};
exports.send404 = function (response) {
  exports.sendResponse(response, '404: Not Found', 404);
};

// As you progress, keep thinking about what helper functions you can put here!
