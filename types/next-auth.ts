/* eslint-disable no-unused-vars */
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserDetails = {
  remoteAddress: string;
  sessionId?: string;
};

type UserPrincipal = {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: string[];
  credentialsNonExpired: boolean;
  dn: string;
  enabled: boolean;
  graceLoginsRemaining: number;
  password?: string;
  timeBeforeExpiration: number;
  username: string;
};

interface Token {
  errorMessage: string;
  exp: number;
  iat: number;
  jti: string;
  token: string;
}

type UserId = string;

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
