"use client";

import { api } from "@/lib/api";
import { create } from "zustand";
import { useUserLoginStore } from "./userLogin.api";
import Cookies from "js-cookie";
import { Descriptograh } from "@/utils/cripto";
import { toast } from "react-toastify";

export interface CompanyInterface {
 data:{ name: string; // Nome fantasia
  legalName?: string; // Razão social
  nif?: string;
  email?: string; // Contato principal
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  status: "ACTIVE" | "INACTIVE";
  plan?: "FREE" | "STANDARD" | "PREMIUM";
  createdAt?: Date;
  updatedAt?: Date;
_id?:string
}
}

interface CompanyStore {
  GetCompany: (id:string) => Promise<void>;
  GetAllCompany: () => Promise<void>;
  CreateCompany: (data: Omit<CompanyInterface, "_id" | "createdAt" | "atualizadoEm" | "__v">) => Promise<void>;
  UpdateCompany: (id: string, data: Partial<CompanyInterface>) => Promise<void>;
  DeleteCompany: (id: string) => Promise<void>;
  ListCompany: CompanyInterface[]; 
  itemCompany:CompanyInterface|null
  company:string,
  GetLocalCompany:() => Promise<void>;
}

//Company API with Zustend
export const CompanyStore = create<CompanyStore>((set, get) => ({
  ListCompany: [],
  itemCompany:null,
  company:"",
  GetLocalCompany:async()=>{
   try {
       const criptographCompany = Cookies.get("next.companyid_sinfa");
       const companyDescriptograph = Descriptograh(criptographCompany);
       set({ company: companyDescriptograph as string});

    } catch (err) {
      console.error(err);
    }
  },
  GetCompany: async (id:string) => {
    try {

      const response = await api.get<CompanyInterface>(`/company/693c01d77717f90f375e0fc1`);
   
      set({ itemCompany: response.data});
    } catch (err) {
      console.error(err);
    }
  },

  // GET 
  GetAllCompany: async () => {
   try {  
      
      const response = await api.get<CompanyInterface[]>("/company/allcompany");
      console.log(response)
      set({ ListCompany: response.data });
    } catch (err:any) {
     toast.error(err?.response.data?.message);
   }
  },

  // POST 
  CreateCompany: async (data) => {
    try {
      const response = await api.post<any>("/company/create", data);
      console.log(response)
      toast.success(response.data?.message);
      set({ ListCompany: [...get().ListCompany, response.data?.data] });
    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // PUT 
  UpdateCompany: async (id, data) => {
    try {
      const response = await api.put<any>(`/company/update/${id}`, data);
      console.log(response.data)
      const updatedUsers = get().ListCompany.map(u => u.data._id === id ? response.data?.data : u);
      set({ ListCompany: updatedUsers });
      toast.success(response.data?.message);
      if (get().itemCompany?.data._id === id) set({ itemCompany: response.data });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // DELETE
  DeleteCompany: async (id) => {
    try {
      const response = await api.delete(`/Company/Company/${id}`);
      const filteredUsers = get().ListCompany.filter(u => u.data._id !== id);
      set({ ListCompany: filteredUsers });
      toast.success(response.data?.message);
      if (get().itemCompany?.data._id === id) set({ itemCompany: null });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },
}));
