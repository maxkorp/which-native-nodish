#! /usr/bin/env node
var Promise = require('nodegit-promise');
var findParentDir = require('find-parent-dir');
var path = require('path');
var cache = {};

module.exports = function detectNodeWebkit(directory) {
  if (!directory) {
    throw new Error ("directory parameter is required");
  }

  directory = path.resolve(directory);

  if (cache[directory]) {
    return Promise.resolve(cache[directory]);
  }

  return findRoot(directory)
    .then(function(root) {
      var nwVersion;
      var asVersion;
      var pkg;

      if (root) {
        pkg = require(path.join(root, "package.json"));
      }

      if (!pkg) {
        root = null;
      }

      else if (pkg.engines) {
        nwVersion = pkg.engines["node-webkit"] || pkg.engines["nw.js"] || null;
        asVersion = pkg.engines["electron"] || pkg.engines["atom-shell"] || null;
      }

      var output = {
        root: (root ? root : null),
        nwVersion: ((root && nwVersion) ? nwVersion : null),
        asVersion: ((root && asVersion) ? asVersion : null)
      };

      cache[directory] = output;
      return output;
    });
};

function findRoot (toCheck) {
  var foundDir = null;

  return new Promise(function(resolve, reject) {
    function find(currentDir) {
      currentDir = path.join(currentDir, "..");
      findParentDir(currentDir, "package.json", function(err, dir) {
        if (err) {
          reject(err);
        }
        else if (!dir) {
          resolve(foundDir);
        }
        else {
          foundDir = dir;
          find(dir);
        }
      });
    }

    find(toCheck);
  });
}
