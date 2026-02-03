"use client";

import { api } from "@/lib/api";
import { create } from "zustand";
import { useUserLoginStore } from "./userLogin.api";
import Cookies from "js-cookie";
import { Descriptograh } from "@/utils/cripto";
import { toast } from "react-toastify";

export interface ProductInterface {
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

export interface GetProductInterface {
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
  data:GetProductInterface[]
}


interface ProductStore {
  GetProduct: (id:string) => Promise<void>;
  GetAllProduct: () => Promise<void>;
  CreateProduct: (data: Omit<ProductInterface, "_id" | "createdAt" | "atualizadoEm" | "__v">) => Promise<void>;
  UpdateProduct: (id: string, data: Partial<ProductInterface>) => Promise<void>;
  DeleteProduct: (id: string) => Promise<void>;
  ListProduct: GetProductInterface[]; 
  itemProduct:ProductInterface|null
}

//Product API with Zustend
export const ProductStore = create<ProductStore>((set, get) => ({
  ListProduct: [],
  itemProduct:null,
  GetProduct: async (id:string) => {
    try {
      const response = await api.get<ProductInterface>(`/product/${id}`);
      set({ itemProduct: response.data });
    } catch (err) {
      console.error(err);
    }
  },

  // GET 
  GetAllProduct: async () => {
   try {  
      const response = await api.get<ResponseInterface>("/product");
      const filter = response.data.data.filter(item=>item.isService==false)
      set({ ListProduct: filter});
    } catch (err:any) {
     toast.error(err?.response.data?.message);
   }
  },

  // POST 
  CreateProduct: async (data:ProductInterface) => {
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
      set({ ListProduct: [...get().ListProduct, response.data.data] });
    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // PUT 
  UpdateProduct: async (id, data) => {
    try {
      //fazendo conversoes de dados
      data["companyId"]="693c01d77717f90f375e0fc1";
      data["isService"]=false;
      data["price"]=Number(data["price"]);
      data["taxRate"]=Number(data["taxRate"]);
      data["stockQuantity"]=Number(data["stockQuantity"]);
      data["minStockThreshold"]=Number(data["minStockThreshold"]);

      const response = await api.put<any>(`/product/${id}`, data);
      const updatedUsers = get().ListProduct.map(u => u._id === id ? response.data.product : u);
      set({ ListProduct: updatedUsers });
      toast.success(response.data?.message);
      if ((get().itemProduct?._id )== id) set({ itemProduct: response.data.product });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },

  // DELETE
  DeleteProduct: async (id) => {
    try {
      const response = await api.delete(`/product/${id}`);
      const filteredUsers = get().ListProduct.filter(u => u._id !== id);
      set({ ListProduct: filteredUsers });
      console.log(
        response.data?.message
      )
      toast.success(response.data?.message);
      if (get().itemProduct?._id === id) set({ itemProduct: null });

    } catch (err:any) {
      toast.error(err?.response.data?.message);
    }
  },
}));
