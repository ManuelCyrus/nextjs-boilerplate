"use client";

import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface DataInterface {
  nome: string;
  email: string;
  senha: string;
}

interface CreateAccountStoreInterface {
  Create: (data:DataInterface) => Promise<boolean>;
}

//create acount API with Zustend
export const createAccountStore = create<CreateAccountStoreInterface>((set, get) => ({
  // POST 
  Create: async (data:DataInterface) => {
    try {
      const response = await api.post<any>("/auth/signup", data);
      toast.success(response.data?.message);
      return true;
    } catch (err:any) {
      toast.error(err?.response.data?.message);
      return false;
    }
  },

}));
