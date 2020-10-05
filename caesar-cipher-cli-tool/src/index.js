const minimist = require('minimist');
const app = require('./app');
const { handleError } = require('./utils');

const argv = minimist(process.argv, {
  string: ['shift', 'input', 'output', 'action'],
  alias: {
    s: 'shift',
    i: 'input',
    o: 'output',
    a: 'action',
  },
});

app(argv)
  .then(() => console.log('Successfully done!'))
  .catch((error) => handleError(error));
