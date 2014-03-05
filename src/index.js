"use strict";

var path = require( "path" )
  , _ = require( "lodash" )
  , config = require( "./config" )
  , getExtensions = function ( mimosaConfig ) {
    return mimosaConfig.emberscript.extensions;
  };

var compile = function ( mimosaConfig, file, cb ) {
  var error
    , output
    , sourceMap
    , emberscriptConfig = mimosaConfig.emberscript
    , compiler = emberscriptConfig.lib
    , options = _.extend( {}, mimosaConfig.emberscript.options, { sourceFiles:[ path.basename( file.inputFileName ) + ".src" ] } );

  // Check if source maps have been excluded for this file
  if ( options.sourceMap ) {
    if ( emberscriptConfig.sourceMapExclude && emberscriptConfig.sourceMapExclude.indexOf( file.inputFileName ) > -1 ) {
      options.sourceMap = false;
    } else {
      if ( emberscriptConfig.sourceMapExcludeRegex && file.inputFileName.match( emberscriptConfig.sourceMapExcludeRegex ) ) {
        options.sourceMap = false;
      }
    }
  }

  options.raw = options.raw || options.sourceMap;

  try {
    var cs = compiler.parse( file.inputFileText, options );
    var ast = compiler.compile( cs, options );
    output = compiler.js( ast );

    // set source maps if available
    if ( options.sourceMap ) {
      sourceMap = compiler.sourceMap( ast, path.basename( file.inputFileName ) + ".src" );
    }
  } catch ( err ) {
    error = err;
  }

  cb ( error, output, emberscriptConfig, sourceMap );
};

module.exports = {
  name: "emberscript",
  compilerType: "javascript",
  compile: compile,
  extensions: getExtensions,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate,
  cleanUpSourceMaps: true
};
