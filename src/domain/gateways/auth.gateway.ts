import { User } from "../entities/user.entitiy";

export interface AuthGateway {
    login(email: string, password: string): Promise<string>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
}

