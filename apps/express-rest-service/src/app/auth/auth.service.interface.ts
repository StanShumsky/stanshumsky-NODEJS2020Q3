export interface IAuthService {
  login(login: string, password: string): Promise<string>;
}
