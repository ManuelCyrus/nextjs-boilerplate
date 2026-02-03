"use client";

import { api } from "@/lib/api";
import { create } from "zustand";
import { useUserLoginStore } from "./userLogin.api";
import Cookies from "js-cookie";
import { Descriptograh } from "@/utils/cripto";
import { toast } from "react-toastify";

export interface ServicesInterface {
  _id?:string
  name: string;
  description?: string;
  sku: string; // Stock Keeping Unit (Código do Produto)
  price: number; // Preço unitário base (antes de impostos/descontos)
  unitOfMeasure: string; // Ex: "unidade", "hora", "kg", "serviço"
  taxRate: number; // Taxa de imposto aplicável (em percentagem, ex: 23 para 23%)
  isService: boolean; // Indica se é um serviço (true) ou um produto físico (false)
  stockQuantity?: number; // Quantidade em stock (opcional, aplicável a produtos físicos)
  minStockThreshold?: number; // Limite mínimo de stock para alerta
  status: "ACTIVE" | "INACTIVE"; // Estado do produto
  companyId: string; // Empresa principal a que o produto pertence
  branchId?: string; // Filial (branch) a que o produto pertence (opcional)
}

export interface GetServicesInterface {
  _id?:string
  name: string;
  description?: string;
  sku: string; // Stock Keeping Unit (Código do Produto)
  price: number; // Preço unitário base (antes de impostos/descontos)
  unitOfMeasure: string; // Ex: "unidade", "hora", "kg", "serviço"
  taxRate: number; // Taxa de imposto aplicável (em percentagem, ex: 23 para 23%)
  isService: boolean; // Indica se é um serviço (true) ou um produto físico (false)
  stockQuantity?: number; // Quantidade em stock (opcional, aplicável a produtos físicos)
  minStockThreshold?: number; // Limite mínimo de stock para alerta
  status: "ACTIVE" | "INACTIVE"; // Estado do produto
  companyId:  {
    _id:string,
    name:string
  }; // Empresa principal a que o produto pertence
  branchId?: {
    _id:string,
    name:string
  }; // Filial (branch) a que o produto pertence (opcional)
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResponseInterface {
  data:GetServicesInterface[]
}


interface ServicesStore {
  GetServices: (id:string) => Promise<void>;
  GetAllServices: () => Promise<void>;
  CreateServices: (data: Omit<ServicesInterface, "_id" | "createdAt" | "atualizadoEm" | "__v">) => Promise<void>;
  UpdateServices: (id: string, data: Partial<ServicesInterface>) => Promise<void>;
  DeleteServices: (id: string) => Promise<void>;
  ListServices: GetServicesInterface[]; 
  itemServices:ServicesInterface|null
}

//Services API with Zustend
export const ServicesStore = create<ServicesStore>((set, get) => ({
  ListServices: [],
  itemServices:null,
  GetServices: async (id:string) => {
    try {
      const response = await api.get<ServicesInterface>(`/product/${id}`);
      set({ itemServices: response.data });
    } catch (err) {
      console.error(err);
    }
  },

  // GET 
  GetAllServices: async () => {
   try {  
      
      const response = await api.get<ResponseInterface>("/product");
      const filter = response.data.data.filter(item=>item.isService==true)
      set({ ListServices: filter});
    } catch (err:any) {
     toast.error(err?.response.data?.message);
   }
  },

  // POST 
  CreateServices: async (data:ServicesInterface) => {
    try {

      //fazendo conversoes de dados
      data["companyId"]="693c01d77717f90f375e0fc1";
      data["isService"]=false;
      data["price"]=Number(data["price"]);
      data["taxRate"]=Number(data["taxRate"]);
      data["stockQuantity"]=Number(data["stockQuantity"]);
      data["minStockThreshold"]=Number(data["minStockThreshold"]);

      const response = await api.post<any>("/product/", data);
      toast.success(response.data?.message);
      set({ ListServices: [...get().ListServices, response.data.data] });
    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // PUT 
  UpdateServices: async (id, data) => {
    try {

      //fazendo conversoes de dados
      data["companyId"]="693c01d77717f90f375e0fc1";
      data["isService"]=true;
      data["price"]=Number(data["price"]);
      data["taxRate"]=Number(data["taxRate"]);
      data["stockQuantity"]=Number(data["stockQuantity"]);
      data["minStockThreshold"]=Number(data["minStockThreshold"]);

      const response = await api.put<any>(`/product/${id}`, data);
      const updatedUsers = get().ListServices.map(u => u._id === id ? response.data.Services : u);
      set({ ListServices: updatedUsers });
      toast.success(response.data?.message);
      if ((get().itemServices?._id )== id) set({ itemServices: response.data.Services });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // DELETE
  DeleteServices: async (id) => {
    try {
      const response = await api.delete(`/Services/${id}`);
      const filteredUsers = get().ListServices.filter(u => u._id !== id);
      set({ ListServices: filteredUsers });
      console.log(
        response.data?.message
      )
      toast.success(response.data?.message);
      if (get().itemServices?._id === id) set({ itemServices: null });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },
}));
