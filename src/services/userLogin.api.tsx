"use client";

import { api } from "@/lib/api";
import { create } from "zustand";
import Cookies from "js-cookie";
import { Descriptograh } from "@/utils/cripto";
import { destroyCookie } from "nookies";
import { Delay } from "@/utils/delay";

export interface UserLoginInterface {
   _id: string;
  name: string;
  email: string;
  password: string;
  isEmailConfirmed: boolean;
  role: "ADMIN" | "USER" | string;
  status: "ACTIVE" | "INACTIVE" | string;
  enterpriseId: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface UserLoginStore {
  user: UserLoginInterface | null;
  GetUserLogin: () => Promise<void>;
  SignOut: () =>void;
  setUser:( user: UserLoginInterface | null )=>void
}

export const useUserLoginStore = create<UserLoginStore>((set) => ({
  user: null,

  GetUserLogin: async () => {
    try {
     
      const criptographIdUser = Cookies.get("next.id_sinfa");
      const criptographToken = Cookies.get("next.token_sinfa");
      const idUser = Descriptograh(criptographIdUser);
      console.log(idUser)
      const response = await api.get<UserLoginInterface>(
        "/users/getone/" + idUser
      );

      console.log(response.data)

      set({ user: response.data });

    } catch (err) {
       console.error("Erro ao buscar usuário:", err);
    }
  },
  SignOut: () => {
    try {

        destroyCookie(null, "next.token_sinfa", { path: "/" });
        destroyCookie(null, "next.id_sinfa", { path: "/" });
        destroyCookie(null, "next.email_sinfa",{ path: "/" })

        set({ user: null });
    } catch (err) {
       console.error(err);
    }
  },
  setUser:(user: UserLoginInterface | null)=>{
     set({ user: user });
  }
}));