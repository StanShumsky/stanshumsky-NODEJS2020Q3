import { promises as fsp, constants as fsc, createWriteStream, createReadStream } from 'fs';
import { resolve } from 'path';
import { pipeline as _pipeline } from 'stream';
import { promisify } from 'util';
import { ActionParamError, ShiftParamError, ShiftRangeError, InputParamError, OutputParamError } from './models';
import { CaesarDecoder, CaesarEncoder } from './caesar-transform';
import { Action, AppOptions } from './models';
const pipeline = promisify(_pipeline);

export async function app(options: AppOptions) {
  const action = options.action;
  const shift = parseInt(options.shift, 10);
  const input = options.input && resolve(options.input);
  const output = options.output && resolve(options.output);

  if (![Action.Encode, Action.Decode].includes(action)) {
    throw new ActionParamError();
  }

  if (!Number.isInteger(shift)) {
    throw new ShiftParamError();
  } else if (shift < 0 || shift >= 26) {
    throw new ShiftRangeError();
  }

  if (input) {
    try {
      // tslint:disable-next-line: no-bitwise
      await fsp.access(input, fsc.F_OK | fsc.R_OK);
    } catch {
      throw new InputParamError();
    }
  }

  if (output) {
    try {
      // tslint:disable-next-line: no-bitwise
      await fsp.access(output, fsc.F_OK | fsc.W_OK);
    } catch {
      try {
        await fsp.writeFile(output, '');
        await fsp.access(output, fsc.F_OK);
      } catch {
        throw new OutputParamError();
      }
    }
  }

  const inputStream = input ? createReadStream(input) : process.stdin;
  const outputStream = output ? createWriteStream(output, { flags: 'a+' }) : process.stdout;
  const transformStream = action === Action.Encode ? new CaesarEncoder(shift) : new CaesarDecoder(shift);

  await pipeline(inputStream, transformStream, outputStream);
}
