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
  authenticated: boolean;
  authorities: string[];
  credentials?: string;
  details: UserDetails;
  exp: number;
  iat: number;
  jti: string;
  name: string | null | undefined;
  principal: UserPrincipal;
  status: string;
  update: () => void;
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
