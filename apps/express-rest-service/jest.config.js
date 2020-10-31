module.exports = {
  displayName: 'express-rest-service',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/express-rest-service',
  setupFilesAfterEnv: ['./test/setup.js'],
  noStackTrace: true,
};
