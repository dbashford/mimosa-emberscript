exports.config =
  minMimosaVersion: "2.0.4"
  modules: ["jshint", "copy"]
  watch:
    sourceDir: "src"
    compiledDir: "lib"
    javascriptDir: null
  jshint:
    rules:
      node: true
      laxcomma: true