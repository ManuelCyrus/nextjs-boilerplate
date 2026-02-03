import { useUserLoginStore } from '@/services/userLogin.api';
import { Descriptograh } from '@/utils/cripto';
import axios, { AxiosInstance } from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import { toast } from 'react-toastify';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export function getApiClient(ctx?: any): AxiosInstance {

  try {

    const cookies = parseCookies(ctx);
    const encryptedToken = cookies['next.token_sinfa'];
    const token = encryptedToken ? Descriptograh(encryptedToken) as string : "";

    const api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      }
    });

    // ----------------------------
    // 🔐 INTERCEPTOR REQUEST
    // ----------------------------
    api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => Promise.reject(error));

    // ----------------------------
    // 🔥 INTERCEPTOR RESPONSE
    // ----------------------------
    api.interceptors.response.use((response) => {
      return response;
    }, (error) => {

      if (!error.response) {
        toast.error('Não foi possível conectar ao servidor');
        return Promise.reject(error);
      }

      const msg = error.response?.data?.message;

      if (msg === 'Token não fornecido' || msg === 'Token inválido ou expirado') {
        if (typeof window !== 'undefined') {
          
        destroyCookie(null, "next.token_sinfa", { path: "/" });
        destroyCookie(null, "next.id_sinfa", { path: "/" });
        destroyCookie(null, "next.email_sinfa",{ path: "/" })

            window.location.href = '/login';
        }
      }

      return Promise.reject(error);
    });

    return api;

  } catch (error) {
    console.log('Erro no getApiClient:', error);
    throw error;
  }
}
