module.exports = {
  name: 'talks',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/talks',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
