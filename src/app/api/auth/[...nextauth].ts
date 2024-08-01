import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FakeApiService } from "../../../infrastructure/services/fake-api.services";
import { JWT } from "next-auth/jwt";

const fakeApiService = new FakeApiService({
  API_URL: process.env.API_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
});

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const token = await fakeApiService.login(
            credentials?.email || "",
            credentials?.password || ""
          );
          if (token) {
            // Return a user object
            return {
              id: "1",
              name: "Fake User",
              email: credentials?.email || "",
            } as NextAuthUser;
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt(token: JWT, user?: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id as string;
      return session;
    },
  },
};

export default NextAuth(options);
