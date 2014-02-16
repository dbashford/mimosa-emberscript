mimosa-emberscript
===========

## Overview

This is a EmberScript compiler for the Mimosa build tool. This module is for use with Mimosa `2.0+`.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'emberscript'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will compile EmberScript files during `mimosa watch` and `mimosa build`.

By default, during `mimosa watch` this module will also generate source maps. Source maps map lines of compiled JavaScript back to lines of the original EmberScript source. So when something breaks in the compiled JavaScript, tools like the Chrome Dev Tools will show you the responsible line of EmberScript. Source maps are turned off by default for `mimosa build`. [Dynamic source maps](http://fitzgeraldnick.com/weblog/46/) are used by default, unless minifying code, in which case source maps are generated as separate files.

EmberScript, by default, wraps compiled JavaScript in a safety wrapper to protect scope. This module turns this wrapping off by compiling `bare` by default. It does this because it assumes code is already being wrapped in AMD or CommonJS/AMD functions `define` or `require`.

All EmberScript configuration options can be provided in the `options` object, `sourceMap` and `bare` are the only ones provided values by this module.

## Default Config

```emberscript
emberscript:
  lib: undefined
  extensions: ["em"]
  sourceMapDynamic: true
  sourceMapExclude: [/\/specs?\//, /_spec.js$/]
  sourceMapConditional: false
  options:
    sourceMap:true
    bare:true
```

* `lib`: You may want to use this module but may not be ready to use the latest version of EmberScript. Using the `lib` property you can provide a specific version of EmberScript if the one being used by this module isn't to your liking. To provide a specific version, you must have it `npm install`ed into your project and then provide it to `lib`. For instance: `lib: require('ember-script')`.
* `extensions`: an array of strings, the extensions of your EmberScript files.
* `sourceMapDynamic`: a boolean, whether or not to use [Dynamic source maps](http://fitzgeraldnick.com/weblog/46/). Dynamic source maps require no extra network hops to retrieve the original source or the map files.  They are also a necessity for tools like browserify.
* `sourceMapExclude`: an array of strings and regexes. A list of files or patterns matching files to exclude from source map generation. Strings are paths and can be either absolute or relative to `config.watch.javascriptDir`.
* `sourceMapConditional`: a boolean, whether or not to use conditional source maps. See [this thread](https://groups.google.com/d/topic/mozilla.dev.js-sourcemap/4uo7Z5nTfUY/discussion) for details.
* `options`: an object, the EmberScript compiler configuration. This object is passed straight to the EmberScript compiler. New properties can be added here to tweak EmberScript compilation.
* `options.sourceMap`: a EmberScript compiler option to turn on/off source maps.
* `options.bare`: a EmberScript compiler option to turn on/off the safety wrapper.
