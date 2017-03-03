var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

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
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    var exists = _.any(data, function(site, i) {
      return site.match(url);
    });
    callback(exists);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function (err) {
    if (err) {
      throw err;
    }
    callback();
  });
};


exports.isUrlArchived = function(url, callback) {
  var sitePath = path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, function(exists) {
    callback(exists);
  });

  // fs.readdir(exports.paths.archivedSites, function (err, data) {
  //   if (err) {
  //   }
  //   return callback(_.contains(data, url));

  // });
};


exports.downloadUrls = function(urls) {

  _.each(urls, function(url) {
    if (!url) {
      return;
    }
    // var newDir = fs.createWriteStream(exports.paths.archivedSites + '/' + url);
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
    //leaving _.each blank passes 'download all pending Urls' !>!?!?!?

    // fs.readFile(url, 'utf8', function (err, data) {
    //   if (err) {
    //     throw err;
    //   }
    //   var newDir = exports.paths.archivedSites + '/' + url;
    //   console.log(newDir);   
 
    // });   



    // } else {
    //   fs.readFile(url, 'utf8', function (err, data) {
    //     var newDir = exports.paths.archivedSites + '/' + url;
    //     fs.mkdir(newDir);
    //     console.log(data);
    //     fs.writeFile(newDir, data, function(err) {
    //       if (err) {
    //         return console.log('hey err writing homeboy!');
    //       }
    //     });
    //   });

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



