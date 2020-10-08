import * as minimist from 'minimist';
import { app } from './app/app';
import { AppOptions } from './app/models';
import { handleError } from './app/utils';

const options = minimist<AppOptions>(process.argv, {
  string: ['shift', 'input', 'output', 'action'],
  alias: {
    s: 'shift',
    i: 'input',
    o: 'output',
    a: 'action',
  },
});

app(options)
  .then(() => console.log('Successfully done!'))
  .catch((error) => handleError(error));
