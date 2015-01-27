#! /usr/bin/env node
var fnw = require('../');
var directory = (process.argv.length > 2 && process.argv[2]) || process.cwd();

fnw(directory)
  .then(
    function(results) {
      if (!results.root) {
        console.error("could not find a parent package for the directory '" + directory + "'");
      }
      else if (results.nwVersion) {
        console.log("root package at '" + results.root + "' uses node-webkit/nw.js v"
        + results.nwVersion);
      }
      else if (results.asVersion) {
        console.log("root package at '" + results.root + "' uses atom-shell v"
        + results.asVersion);
      }
      else {
        console.log("root package at '" + results.root
        + "' does not use node-webkit/nw.js or atom-shell");
      }
    },
    function(err) {
      console.error(err.message);
    }
  );
