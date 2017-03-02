var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!




var readListOfUrls = function(callback) {
  var d;
  fs.readFile('./web/archives/sites.txt', 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    //callbacks!
  });
  return d;
};

exports.isUrlInList = function(url, callback) {
  fs.readFile('./web/archives/sites.txt', 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
  });
  return 5;
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile('./web/archives/sites.txt', 'url', function (err) {
    if (err) {
      throw err;
    } else {
      return;
    }
  });
};


exports.isUrlArchived = function(url, callback) {
  var fileName = './web/archives/sites.txt' + url;
  fs.exists(fileName, function (exists) {
    return exists;

  });
};


exports.downloadUrls = function(urls) {
  var urls;
  fs.readFile('./web/archives/sites.txt', 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    var urlsArray = [];
    urls = data.toString().split('\n');

  });
  return urls;
};

console.log(readListOfUrls);

// console.log(5);
// console.log(exports.readListOfUrls());
// console.log(exports.isUrlInList('amazon.com'));
// console.log(exports.addUrlToList('fred.com'));
// console.log(exports.isUrlInList('fred.com'));
// console.log(exports.isUrlArchived('amazon.com'));
// console.log(exports.downloadUrls());



