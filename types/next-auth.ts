/* eslint-disable no-unused-vars */
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { User } from "./api";

interface Token {
  errorMessage: string;
  exp: number;
  iat: number;
  jti: string;
  token: string;
  user: User;
}
declare module "next-auth/jwt" {
  interface JWT extends Token {
    name: string | null | undefined;
  }
}

declare module "next-auth" {
  interface Session {
    user: Token;
  }
}
