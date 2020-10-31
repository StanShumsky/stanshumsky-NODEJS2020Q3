import { environment } from '@express-rest-service/environment';
import { compare, genSalt, hash as genHash } from 'bcrypt';

export async function encryptPassword(password: string): Promise<string> {
  const salt = await genSalt(environment.SALT_WORK_FACTOR);
  return await genHash(password, salt);
}

export async function comparePasswordsAsync(password: string, hash: string): Promise<boolean> {
  const isMatch = await compare(password, hash);

  if (isMatch) {
    return Promise.resolve(isMatch);
  }

  return Promise.reject(isMatch);
}
