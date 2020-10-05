const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const { ShiftRangeError } = require('./errors');
const { EOL } = require('os');

class CaesarTransform extends Transform {
  shift = 0;

  constructor(options) {
    super(options);
    this.decoder = new StringDecoder('utf-8');
  }

  _transform(chunk, encoding, done) {
    try {
      if (this.shift < 0 || this.shift >= 26) {
        throw new ShiftRangeError();
      }

      if (encoding === 'buffer') {
        chunk = this.decoder.write(chunk);
      }

      if (chunk === '\u0003') {
        process.exit(0);
      }

      let output = '';

      for (const char of chunk) {
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

class CaesarDecoder extends CaesarTransform {
  constructor(shift, options) {
    super(options);
    this.shift = 26 - shift;
  }
}

class CaesarEncoder extends CaesarTransform {
  constructor(shift, options) {
    super(options);
    this.shift = shift;
  }
}

module.exports = {
  CaesarDecoder,
  CaesarEncoder,
};
