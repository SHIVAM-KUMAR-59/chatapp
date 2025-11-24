import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import api from "@/utils/axios";

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

interface CustomUser extends User {
  id: string;
  email: string;
  name: string;
  token: string;
}

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    token?: string;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    accessToken?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
        isSignup: { label: "Is Signup", type: "text" }, // "true" | "false"
      },

      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials.password) return null;

        const isSignup = credentials.isSignup === "true";

        const url = isSignup ? `auth/signup` : `auth/login`;

        try {
          const res = await api.post(`http://localhost:8000/api/${url}`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (!res || !res.data) return null;

          const data: LoginResponse = res.data.result;

          if (!data?.token) return null;

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            token: data.token,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // initial login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = (user as CustomUser).token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.id && token.email && token.name) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // redirect user here if not logged in
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };