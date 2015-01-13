#! /usr/bin/env node
var fnw = require('../');
var directory = (process.argv.length > 2 && process.argv[2]) || process.cwd();

fnw(directory)
  .then(
    function(results) {
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
    }
  );
