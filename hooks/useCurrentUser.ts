"use client";
import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data } = useSession();

  if (!data) return { token: null, user: null };

  const { expires, user } = data;
  const { errorMessage, exp, iat, jti, token } = user;

  return {
    token: { expires, errorMessage, exp, iat, jti, token },
    user: user.user,
  };
}
