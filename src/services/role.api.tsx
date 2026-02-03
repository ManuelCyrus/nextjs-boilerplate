"use client";

import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { create } from "zustand";
import { CompanyStore } from "./company.api";
import Cookies from "js-cookie";
import { Descriptograh } from "@/utils/cripto";

export interface PermissionInterface {
  _id: string;
  area: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
}

export interface RoleInterface {
  _id: string;
  name: string,
  description: string,
  companyId: string,
  branchId: string,
  permissions: string[],
  createdAt: string;
  updatedAt: string;
}

export interface ResponseInterface {
  data: RoleInterface[]
}

interface roleStore {
  GetRole: (id: string) => Promise<void>;
  GetAllRole: () => Promise<void>;
  CreateRole: (data: RoleInterface) => Promise<void>;
  UpdateRole: (id: string, data: Partial<RoleInterface>) => Promise<void>;
  DeleteRole: (id: string) => Promise<void>;
  ListRole: RoleInterface[];
  itemRole: RoleInterface | null
}

//Role API with Zustend
export const roleStore = create<roleStore>((set, get) => ({
  ListRole: [],
  itemRole: null,

  // "next.companyid_sinfa"
  GetRole: async (id: string) => {
    try {
      const response = await api.get<RoleInterface>(`/roles/${id}`);
      set({ itemRole: response.data });
    } catch (err) {
      console.error(err);
    }
  },

  // GET 
  GetAllRole: async () => {
    try {
      const criptographCompany = Cookies.get("next.companyid_sinfa");
      const companyDescriptograph = Descriptograh(criptographCompany);

      const response = await api.get<ResponseInterface>("/roles/getall/" + companyDescriptograph);
      console.log(response)
      set({ ListRole: response.data.data });

    } catch (err: any) {
      toast.error(err?.response.data?.message);
    }
  },

  // POST 
  CreateRole: async (data) => {
    try {
      const criptographCompany = Cookies.get("next.companyid_sinfa");
      const companyDescriptograph = Descriptograh(criptographCompany);
      data["companyId"] = companyDescriptograph as string;
      data["permissions"] = [];
      const response = await api.post<any>("/roles/create", data);
      toast.success("Cargo criado com sucesso!");
      set({ ListRole: [...get().ListRole, response.data.data] });
    } catch (err: any) {
      toast.error("Ouve um erro ao criar a Cargo!");
    }
  },

  // PUT 
  UpdateRole: async (id, data) => {
    try {
      const criptographCompany = Cookies.get("next.companyid_sinfa");
      const companyDescriptograph = Descriptograh(criptographCompany);
      data["companyId"] = companyDescriptograph as string;
      
      const response = await api.put<any>(`/roles/update/${id}`, data);
      const updatedUsers = get().ListRole.map(u => u._id === id ? response.data.data : u);
      toast.success("Cargo atualizado com sucesso!");
      set({ ListRole: updatedUsers });

      if (get().itemRole?._id === id) set({ itemRole: response.data.data });

    } catch (err: any) {
      toast.error("Ouve um erro ao atualizar o cargo!");
    }
  },

  // DELETE
  DeleteRole: async (id) => {
    try {
      const response = await api.delete(`/roles/delete/${id}`);
      const filteredUsers = get().ListRole.filter(u => u._id !== id);
      set({ ListRole: filteredUsers });
      toast.success(response.data?.message);
      if (get().itemRole?._id === id) set({ itemRole: null });

    } catch (err: any) {
      toast.error(err?.response.data?.message);
    }
  },
}));
