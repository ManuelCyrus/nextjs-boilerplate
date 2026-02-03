"use client";

import { api } from "@/lib/api";
import { create } from "zustand";
import { useUserLoginStore } from "./userLogin.api";
import Cookies from "js-cookie";
import { Descriptograh } from "@/utils/cripto";
import { toast } from "react-toastify";

export interface BranchInterface {
  _id: string;
  name: string; // Nome da filial
  code?: string; // Código interno ou identificador da filial
  companyId:string; // Referência para a empresa principal
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  status: "ACTIVE" | "INACTIVE";
  managerId?: string; // Usuário responsável pela filial (opcional)
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResponseInterface {
  data:BranchInterface[]
}


interface BranchLoginStore {
  GetBranch: (id:string) => Promise<void>;
  GetAllBranch: () => Promise<void>;
  CreateBranch: (data: Omit<BranchInterface, "_id" | "createdAt" | "atualizadoEm" | "__v">) => Promise<void>;
  UpdateBranch: (id: string, data: Partial<BranchInterface>) => Promise<void>;
  DeleteBranch: (id: string) => Promise<void>;
  ListBranch: BranchInterface[]; 
  itemBranch:BranchInterface|null
}

//branch API with Zustend
export const branchStore = create<BranchLoginStore>((set, get) => ({
  ListBranch: [],
  itemBranch:null,
  GetBranch: async (id:string) => {
    try {
      const response = await api.get<BranchInterface>(`/branch/branch/${id}`);
      set({ itemBranch: response.data });
    } catch (err) {
      console.error(err);
    }
  },

  // GET 
  GetAllBranch: async () => {
   try {  
      
      const response = await api.get<ResponseInterface>("/branch");
      set({ ListBranch: response.data.data });
    } catch (err:any) {
     toast.error(err?.response.data?.message);
   }
  },

  // POST 
  CreateBranch: async (data) => {
    try {
      const response = await api.post<any>("/branch/create", data);
      toast.success(response.data?.message);
      set({ ListBranch: [...get().ListBranch, response.data.data] });
    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // PUT 
  UpdateBranch: async (id, data) => {
    try {
      const response = await api.put<any>(`/branch/${id}`, data);
      console.log(response.data)
      const updatedUsers = get().ListBranch.map(u => u._id === id ? response.data.data : u);
      set({ ListBranch: updatedUsers });
      toast.success(response.data?.message);
      if (get().itemBranch?._id === id) set({ itemBranch: response.data });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // DELETE
  DeleteBranch: async (id) => {
    try {
      const response = await api.delete(`/branch/${id}`);
      const filteredUsers = get().ListBranch.filter(u => u._id !== id);
      set({ ListBranch: filteredUsers });
      console.log(
        response.data?.message
      )
      toast.success(response.data?.message);
      if (get().itemBranch?._id === id) set({ itemBranch: null });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },
}));
