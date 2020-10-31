import { environment } from '@express-rest-service/environment';
import { JsonWebTokenError, Secret, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { promisify } from 'util';

type Payload = string | Record<string, unknown> | Buffer;

const asyncSign = promisify<Payload, Secret, SignOptions, string>(sign);
const asyncVerify = promisify<string, Secret, VerifyOptions, Record<string, unknown>>(verify);

export interface ITokenPayload {
  exp: number;
  iat: number;
}

export async function generateToken(payload: Payload): Promise<string> {
  return await asyncSign(payload, environment.JWT_SECRET_KEY, { expiresIn: 3600 });
}

export async function verifyAuthorizationHeader<T extends ITokenPayload>(token: string): Promise<T> {
  if (isToken(token)) {
    token = token.replace(/Bearer\s/, '');
    return (await asyncVerify(token, environment.JWT_SECRET_KEY, null)) as T;
  }

  throw new JsonWebTokenError('Invalid Authorization token.');
}

export function isToken(token: string): boolean {
  return /Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token);
}
