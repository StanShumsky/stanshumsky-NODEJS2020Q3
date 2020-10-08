import { TransformOptions } from 'stream';
import { CaesarTransform } from './caesar-transform';

export class CaesarEncoder extends CaesarTransform {
  constructor(shift: number, options?: TransformOptions) {
    super(options);
    this.shift = shift;
  }
}
