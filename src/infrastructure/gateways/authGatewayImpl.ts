import { AuthGateway } from "../../domain/gateways/auth.gateway";
import { signIn, getSession, signOut } from "next-auth/react";
import { User } from "../../domain/entities/user.entitiy";

export class AuthGatewayImpl implements AuthGateway {
  async login(email: string, password: string): Promise<string> {
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    return response?.url || "";
  }

  async logout(): Promise<void> {
    await signOut({ redirect: false });
  }

  async getCurrentUser(): Promise<User | null> {
    const session = await getSession();

    if (!session || !session.user) {
      return null;
    }

    // Map session user to your User entity
    const user: User = {
      id: session.user.image ?? "",// Ensure to provide an id field
      name: session.user.name ?? "",
      email: session.user.email ?? "",
    };

    return user;
  }
}
