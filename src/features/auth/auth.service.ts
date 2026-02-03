"use client"
import { Criptograph } from "@/utils/cripto";
import { toast } from "react-toastify";
import { api } from "@/lib/api";


export interface DataLoginInteface{
    data: {
        message: string,
        token: string,
        expiresIn:string,
        user: {
            id: string,
            name:string,
            email: string,
            role: string,
            status: string
        }
    }
    status:200
}

/* login function */
export async function SignInRequest(data: { email: string; password: string,rememberMe:boolean }) {
  try {
    //get data login
    const Data:DataLoginInteface=await api.post("/auth/login", data);
    //set data login in cookies
    console.log(Data)
    Criptograph("next.token_sinfa", Data.data.data.user.token)
    Criptograph("next.id_sinfa", Data.data.data.user.id)
    Criptograph("next.companyid_sinfa", Data.data.data.user.company)

    api.defaults.headers.Authorization = `Bearer ${Data.data.data.user.token}`;

    toast.success("Seja bem vindo!");
    return true;
  } catch (error:any) {
    toast.error("Ouve um erro");
    return false
  }
}



