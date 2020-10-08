import { Transform, TransformCallback, TransformOptions } from 'stream';
import { StringDecoder } from 'string_decoder';
import { ShiftRangeError } from '../models';
import { EOL } from 'os';

export class CaesarTransform extends Transform {
  decoder: StringDecoder;
  shift = 0;

  constructor(options?: TransformOptions) {
    super(options);
    this.decoder = new StringDecoder('utf-8');
  }

  _transform(chunk: Buffer | string, encoding: string, done: TransformCallback) {
    try {
      if (this.shift < 0 || this.shift >= 26) {
        throw new ShiftRangeError();
      }

      if (encoding === 'buffer') {
        chunk = this.decoder.write(chunk as Buffer);
      }

      if (chunk === '\u0003') {
        process.exit(0);
      }

      let output = '';

      for (const char of chunk as string) {
        const charCode = char.charCodeAt(0);

        if (charCode >= 65 && charCode <= 90) {
          output += String.fromCharCode(((charCode - 65 + this.shift) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
          output += String.fromCharCode(((charCode - 97 + this.shift) % 26) + 97);
        } else {
          output += String.fromCharCode(charCode);
        }
      }

      output += EOL;

      done(null, output);
    } catch (error) {
      done(error);
    }
  }
}
