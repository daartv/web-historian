var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var urlParser = require('url');
var utils = require('./http-helpers');

var actions = {
  'GET': function (req, res) {
    var UrlPath = url.parse(req.url).pathname;
    if (UrlPath === '/') {
      UrlPath = '/index.html';
    }
    utils.serveAssets(res, UrlPath, function () {
      if (UrlPath[0] === '/') {
        UrlPath = UrlPath.slice(1);
      }

      archive.isUrlInList(UrlPath, function(exists) {
        if (exists) {
          utils.sendRedirect(res, '/loading.html');
        } else {
          utils.send404(res);
        }
      });
    });
  },

//   'POST':
//     utils.collectData(request, function(data) {
//       var url = //??
//       //in sites.txt?
//         // if yes . . 
//           //is it archived?
//             //if yes
//               //display page
//           //if no
//             //display loading
//           // if no
//             //append to sites.txt
//     });

};
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var handler = actions[req.method];

  if (handler) {
    handler(req, res);
  } else {
    utils.send404(res);
  }
};
