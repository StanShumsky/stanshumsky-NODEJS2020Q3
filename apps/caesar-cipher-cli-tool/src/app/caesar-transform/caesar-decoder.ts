import { TransformOptions } from 'stream';
import { CaesarTransform } from './caesar-transform';

export class CaesarDecoder extends CaesarTransform {
  constructor(shift: number, options?: TransformOptions) {
    super(options);
    this.shift = 26 - shift;
  }
}
