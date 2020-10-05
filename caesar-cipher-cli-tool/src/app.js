const fs = require('fs');
const path = require('path');
const stream = require('stream');
const util = require('util');
const { ActionParamError, ShiftParamError, ShiftRangeError, InputParamError, OutputParamError } = require('./errors');
const { CaesarDecoder, CaesarEncoder } = require('./caesar');
const { isNumber } = require('./utils');
const pipeline = util.promisify(stream.pipeline);

const ACTIONS = {
  ENCODE: 'encode',
  DECODE: 'decode',
};

async function app(options) {
  const action = options.action;
  const shift = parseInt(options.shift, 10);
  const input = options.input && path.resolve(options.input);
  const output = options.output && path.resolve(options.output);

  if (![ACTIONS.ENCODE, ACTIONS.DECODE].includes(action)) {
    throw new ActionParamError();
  }

  if (!isNumber(shift)) {
    throw new ShiftParamError();
  } else if (shift < 0 || shift >= 26) {
    throw new ShiftRangeError();
  }

  if (input) {
    try {
      await fs.promises.access(input, fs.constants.F_OK | fs.constants.R_OK);
    } catch {
      throw new InputParamError();
    }
  }

  if (output) {
    try {
      await fs.promises.access(output, fs.constants.F_OK | fs.constants.W_OK);
    } catch {
      try {
        await fs.promises.writeFile(output, '');
        await fs.promises.access(output, fs.constants.F_OK);
      } catch {
        throw new OutputParamError();
      }
    }
  }

  const inputStream = input ? fs.createReadStream(input) : process.stdin;
  const outputStream = output ? fs.createWriteStream(output, { flags: 'a' }) : process.stdout;
  const transformStream = action === ACTIONS.ENCODE ? new CaesarEncoder(shift) : new CaesarDecoder(shift);

  await pipeline(inputStream, transformStream, outputStream);
}

module.exports = app;
