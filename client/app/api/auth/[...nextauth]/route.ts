import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import api from "@/utils/axios";
import { AxiosError } from "axios";

interface LoginResponse {
  user: {
    id: string;
    email: string;
    username: string;
  };
  token: string;
}

interface CustomUser extends User {
  id: string;
  email: string;
  username: string;
  token: string;
}

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      username: string;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    token?: string;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    username?: string;
    accessToken?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Name", type: "text", placeholder: "John Doe" },
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
        isSignup: { label: "Is Signup", type: "text" }, // "true" | "false"
      },

      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials.password) return null;

        const isSignup = credentials.isSignup === "true";

        if (isSignup && !credentials.username) return null;

        const url = isSignup ? `auth/signup` : `auth/login`;

        try {
          const res = await api.post(`${process.env.BACKEND_BASE_URL}/api/${url}`, {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
          });

          if (!res || !res.data) return null;

          const data: LoginResponse = res.data.result;

          if (!data?.token) return null;

          return {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username,
            token: data.token,
          };
        } catch (error) {
          
          // Handle Axios errors properly
          if (error instanceof AxiosError) {

            const errorMessage = 
              error.response?.data?.message || 
              error.response?.data?.error || 
              error.message || 
              "Authentication failed";
            
            throw new Error(errorMessage);
          }
          
          // Handle other errors
          throw new Error("Something went wrong during authentication");
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
        token.username = (user as CustomUser).username;
        token.accessToken = (user as CustomUser).token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.id && token.email && token.username) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
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