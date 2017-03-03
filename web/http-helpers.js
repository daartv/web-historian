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



//1. check in public folder ...
  fs.readFile(archive.paths.siteAssets + asset, encoding, function(err, data) {
    if (err) {

    //2. Site doesn't exist in the public folder

      fs.readFile( archive.paths.archivedSites + asset, encoding, function(err, data) {
        if (err) {
          callback ? callback() : exports.send404(res);
        } else {
          //file exists, serve it
          exports.sendRequest(res, data);
        }
      });
    } else {
      // file exists, serve it
      exports.sendResponse(res, data);
    }
  });



};

//NEED:
exports.sendRedirect = function (response, location, status) {};
exports.collectData = function (request, calback) {};
exports.sendResponse = function (response, data, status) {};
exports.send404 = function (response) {};

// As you progress, keep thinking about what helper functions you can put here!
