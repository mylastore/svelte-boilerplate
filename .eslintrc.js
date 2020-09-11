module.exports = {
  "extends": "plugin:prettier/recommended",
  parser: "babel-eslint",
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3"
    }
  ]
};
