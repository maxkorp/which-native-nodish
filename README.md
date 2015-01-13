for-node-webkit
=============

or-node-webkit is a tool for detecting if a given directory or package is
contained within a node-webkit project, particularly useful for build time
applications in native modules, where `nw-gyp` must be used instead of `node-gyp`.
It works by finding the root most package.json from the specified directory, and checking it's `engines` property for a `node-webkit` property.

##Commandline usage:
specify the directory to check against (or-node-webkit will search it's immediate parent and up), or if unspecified, it defaults to the current working directory.
```
forNodeWebkit "./mydir/someprojectiwanttoknowabout"
forNodeWebkit
```

The application automatically aliases fnw as well
```
fnw "./mydir/someprojectiwanttoknowabout"
fnw
```

##Module usage:
The module returns a function that returns a promise, resolving with
2 properties, root and nwVersion.

To find out if the current module resides in a node webkit project:
```
  var fnw = require('for-node-webkit');
  fnw(__dirname).then(function(results) {
    if (!results.root) {
      // Couldnt find a parent module
    }
    else if (!results.nwVersion) {
      // Root module doesnt use node webkit
    }
    else {
      // nwVersion is the version of node webkit
    }
  });
```
