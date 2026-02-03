"use client";

import { createContext, useEffect, ReactNode, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from "next/navigation";
import { SignInRequest } from "@/features/auth/auth.service";
import { Delay } from "@/utils/delay";
import { useUserLoginStore } from "@/services/userLogin.api";

interface SignInInterface {
  email: string;
  password: string;
  rememberMe: boolean
}

export type AuthContextType = {
  signIn: (data: { email: string; password: string, rememberMe: boolean }) => Promise<boolean | undefined>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {

  const { user } = useUserLoginStore();
  const router = useRouter();

 
  /* login function */
  async function SignIn({ email, password, rememberMe }: SignInInterface) {
    try {
      const Data = await SignInRequest({ email, password, rememberMe });
      if (Data) {
        router.push("/dashboard");
        return true;
      }
      else
        return false
    } catch (error) { }
  }

  return (
    <AuthContext.Provider
      value={{ signIn: SignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
