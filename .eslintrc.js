module.exports = {
  extends: ['@aiou'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
}
