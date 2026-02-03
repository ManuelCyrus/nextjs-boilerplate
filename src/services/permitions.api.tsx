"use client";

import { api } from "@/lib/api";
import { create } from "zustand";
import { useUserLoginStore } from "./userLogin.api";
import Cookies from "js-cookie";
import { Descriptograh } from "@/utils/cripto";
import { toast } from "react-toastify";

export interface UsersInterface {
 _id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER' | string;
  status: 'ACTIVE' | 'INACTIVE' | string; 
  isEmailConfirmed: boolean;
  enterpriseId: number;
  createdAt: string; 
  updatedAt: string; 
  __v: number;
  message?:string
}

interface UserLoginStore {
  Get: (id:string) => Promise<void>;
  GetAll: () => Promise<void>;
  Create: (data: Omit<UsersInterface, "_id" | "createdAt" | "atualizadoEm" | "__v">) => Promise<void>;
  Update: (id: string, data: Partial<UsersInterface>) => Promise<void>;
  Delete: (id: string) => Promise<void>;
  List: UsersInterface[]; 
  item:UsersInterface|null
}

//user API with Zustend
export const userStore = create<UserLoginStore>((set, get) => ({
  List: [],
  item:null,
  Get: async (id:string) => {
    try {
      const response = await api.get<UsersInterface>(`/api/auth/user/${id}`);
      set({ item: response.data });
    } catch (err) {
      console.error(err);
    }
  },

  // GET todos usuários
  GetAll: async () => {
    try {  
      
      const response = await api.get<UsersInterface[]>("/auth/permissions/");
    console.log(response)
     const criptographIdUser = Cookies.get("next.id_sinfa");
      const idUser = Descriptograh(criptographIdUser);
      const definitiveList = response.data.filter((item)=>item._id!==idUser);
      
      set({ List: definitiveList });
    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // POST 
  Create: async (data) => {
    try {
      const response = await api.post<any>("/auth/user/", data);
      toast.success(response.data?.message);
      set({ List: [...get().List, response.data?.user] });
    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // PUT 
  Update: async (id, data) => {
    try {
      const response = await api.put<any>(`/auth/user/${id}`, data);
      console.log(response.data)
      const updatedUsers = get().List.map(u => u._id === id ? response.data?.user : u);
      set({ List: updatedUsers });
      toast.success(response.data?.message);
      if (get().item?._id === id) set({ item: response.data });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // DELETE
  Delete: async (id) => {
    try {
      const response = await api.delete(`/auth/user/${id}`);
      const filteredUsers = get().List.filter(u => u._id !== id);
      set({ List: filteredUsers });
      toast.success(response.data?.message);
      if (get().item?._id === id) set({ item: null });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },
}));
