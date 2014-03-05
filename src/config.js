"use strict";

exports.defaults = function() {
  return {
    emberscript: {
      extensions: ["em"],
      sourceMapDynamic: true,
      sourceMapExclude: [/\/specs?\//, /_spec.js$/],
      sourceMapConditional: false,
      options: {
        sourceMap:true,
        bare:true
      }
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  emberscript:               # config settings for the emberscript compiler module\n" +
         "    lib: undefined           # use this property to provide a specific version of EmberScript\n" +
         "    extensions: [\"em\"]       # default extensions for EmberScript files\n" +
         "    sourceMapDynamic: true   # whether or not to inline the source maps in the compiled JavaScript\n" +
         "    sourceMapExclude: [/\\/specs?\\//, /_spec.js$/] # files to exclude from source map generation\n" +
         "    sourceMapConditional: false # whether or not to use conditional source maps\n" +
         "    options:                 # options for the EmberScript compiler\n" +
         "      sourceMap:true         # whether or not to create source maps\n" +
         "      bare:true              # whether or not to use the default safety wrapper\n";
};

exports.validate = function(config, validators) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "emberscript config", config.emberscript ) ) {

    if ( !config.emberscript.lib ) {
      config.emberscript.lib = require( 'ember-script' );
    }

    if ( validators.isArrayOfStringsMustExist( errors, "emberscript.extensions", config.emberscript.extensions ) ) {
      if (config.emberscript.extensions.length === 0) {
        errors.push( "emberscript.extensions cannot be an empty array");
      }
    }

    if ( config.isBuild ) {
      config.emberscript.sourceMap = false;
    } else {
      validators.ifExistsIsBoolean( errors, "emberscript.sourceMapConditional", config.emberscript.sourceMapConditional );

      if ( validators.ifExistsIsBoolean( errors, "emberscript.sourceMapDynamic", config.emberscript.sourceMapDynamic ) ) {
        if (config.isWatch && config.isMinify && config.emberscript.sourceMapDynamic ) {
          config.emberscript.sourceMapDynamic = false;
          config.log.debug( "mimosa watch called with minify, setting emberscript.sourceMapDynamic to false to preserve source maps." );
        }
      }

      validators.ifExistsFileExcludeWithRegexAndStringWithField(
        errors,
        "emberscript.sourceMapExclude",
        config.emberscript,
        'sourceMapExclude',
        config.watch.javascriptDir );
    }
  }

  return errors;
};
