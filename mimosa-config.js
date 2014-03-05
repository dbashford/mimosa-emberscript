exports.config = {
  minMimosaVersion: "2.0.4",
  modules: ["eslint", "copy"],
  watch: {
    sourceDir: "src",
    compiledDir: "lib",
    javascriptDir: null
  },
  eslint: {
    options: {
      rules: {
        "no-global-strict": 0,
        "no-underscore-dangle": 0
      },
      env: {
        node: true
      }
    }
  }
}
