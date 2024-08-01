import { User } from "../../domain/entities/user.entitiy";
import { AuthGateway } from "../../domain//gateways/auth.gateway";

export class AuthUseCases {
  private authGateway: AuthGateway;

  constructor(authGateway: AuthGateway) {
    this.authGateway = authGateway;
  }

  async login(email: string, password: string): Promise<string> {
    return this.authGateway.login(email, password);
  }

  async logout(): Promise<void> {
    await this.authGateway.logout();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authGateway.getCurrentUser();
  }
}
