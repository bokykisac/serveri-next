import { NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
// import axios from "@/lib/axios";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProviders({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          const { data } = await axios.post("/auth/login", {
            username,
            password,
          });
          return data;
        } catch (err) {
          console.log(err);
          //TODO: refactor those errors
          if (err instanceof AxiosError) {
            if (err?.response?.status !== 401) {
              throw new Error("Internal Server Error.");
            }

            throw new Error("Invalid credentials.");
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ token, session }) {
      session.user = token;
      return session;
    },
  },
};
