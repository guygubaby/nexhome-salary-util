module.exports = {
  extends: [require.resolve('@nexhome/standard/lib/eslint-config/vue'), 'prettier', 'plugin:prettier/recommended'],
  rules: {
    'no-console': ['off'],
    'vue/no-duplicate-attributes': ['off'],
  },
}
