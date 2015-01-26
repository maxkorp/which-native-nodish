which-native-nodish
=============

Formerly for-node-webkit.

which-native-nodish is a tool for detecting if a given directory or package is
contained within a node-webkit/nw.js or atom-shell project, particularly useful for build time applications in native modules, where `nw-gyp` must be used instead of `node-gyp` for nw.js, or a series of flags must be passed for atom-shell.
It works by finding the root most package.json from the specified directory, and checking it's `engines` property for `node-webkit` or `nw.js` and `atom-shell` properties.

##Commandline usage:
Specify the directory to check against (which-native-nodish will search it's immediate parent and up), or if unspecified, it defaults to the current working directory.
```
which-native-nodish "./mydir/someprojectiwanttoknowabout"
which-native-nodish
```

##Module usage:
The module returns a function that returns a promise, resolving with
3 properties: `root`, `nwVersion` and `asVersion`.

To find out if the current module resides in a node webkit project:
```
  var wnn = require('which-native-nodish');
  wnn(__dirname).then(function(results) {
    if (!results.root) {
      // Couldnt find a parent module
    }
    else if (results.nwVersion) {
      // nwVersion is the version of node-webkit/nw.js
    }
    else if (results.asVersion) {
      // asVersion is the version of atom-shell
    }
    else {
      // Root module doesnt use node webkit or atom-shell 
    }
  });
```
