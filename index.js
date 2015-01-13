#! /usr/bin/env node
var Promise = require('nodegit-promise');
var findParentDir = require('find-parent-dir');
var path = require('path');
var nodeWebkit = null;

module.exports = function detectNodeWebkit(directory) {
  if (!directory) {
    throw new Error ("directory parameter is required");
  }

  directory = path.resolve(directory);

  return findRoot(directory)
    .then(function(root) {
      var nwVersion;
      var pkg;
      if (root) {
        var pkg = require(path.join(root, "package.json"));
      }
      if (!pkg) {
        root = null;
      }
      else {
        nwVersion = (pkg.engines && pkg.engines["node-webkit"]) || null;
      }
      var output = {
        root: (root ? root : null),
        nwVersion: ((root && nwVersion) ? nwVersion : null)
      };

      return Promise.resolve(output);
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

if (require.main === module) {
  var directory = (process.argv.length > 2 && process.argv[2]) || process.cwd();
  module.exports(directory)
    .then(function(results) {
      if (!results.root) {
        console.error("could not find a parent package for the directory '" + directory + "'");
      }
      else if (!results.nwVersion) {
        console.log("root package at '" + results.root
          + "' does not use node-webkit");
      }
      else {
        console.log("root package at '" + results.root + "' uses node-webkit v"
          + results.nwVersion);
      }
    },
    function(err) {
      console.error(err.message);
    });
}
