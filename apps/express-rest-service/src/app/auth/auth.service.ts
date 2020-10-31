import { ForbiddenError } from '@express-rest-service/shared';
import { UserRepository } from '@express-rest-service/users';
import { comparePasswordsAsync, generateToken } from '@express-rest-service/utils';
import { IAuthService } from './auth.service.interface';

export class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

  public async login(login: string, password: string): Promise<string> {
    try {
      const user = await this.userRepository.findUserByLogin(login);
      await comparePasswordsAsync(password, user.password);

      return await generateToken({ userId: user.id, login });
    } catch {
      throw new ForbiddenError();
    }
  }
}
