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




exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    //console.log('-----------------------', callback(data.split('\n')));
    return callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    console.log('this is url: ', url, 'this is data:', data.split('\n'));
    var dataArr = data.split('\n');
    console.log(_.contains(dataArr, url));
    return callback(_.contains(dataArr, url));

  });

};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, function (err) {
    if (err) {
      throw err;
    }
    callback(url);
  });
};


exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log('ARCHIVED SITES:  ', exports.paths.archivedSites);
    console.log('this is data', data);
    return callback(_.contains(data, url));

  });
};


exports.downloadUrls = function(urls) {

  _.each(urls, function(url) {
    if (exports.isUrlArchived(url, callback)) {

    } else {
      fs.readFile(url, 'utf8', function (err, data) {
        var newDir = exports.paths.archivedSites + '/' + url;
        fs.mkdir(newDir);
        fs.writeFile(newDir, data, function(err) {
          if (err) {
            return console.log('hey err writing homeboy!');
          }
        });
      });
    }
  });

  // fs.readdir(exports.paths.archivedSites, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //   }

  // });
  // fs.readFile('./web/archives/sites.txt', 'utf8', function (err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   var urlsArray = [];
  //   urls = data.toString().split('\n');

  // });
  // return urls;
};

// exports.readListOfUrls();
// console.log(ourData);

console.log(5);
// console.log(exports.readListOfUrls());
// console.log(exports.isUrlInList('amazon.com'));
// console.log(exports.addUrlToList('fred.com'));
// console.log(exports.isUrlInList('fred.com'));
// console.log(exports.isUrlArchived('amazon.com'));
// console.log(exports.downloadUrls());



