"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import Spinner from "@/components/assets/spinner";
import { useForm } from "react-hook-form";
import InputPasswordType from "@/components/Input/passwordViewChange";

export default function LoginPage() {
  
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext) as AuthContextType
  const navigation = useRouter()
  const[viewText,setViewText] = useState<boolean>(false)

  const handleLogin = async (data:any) => {
    setLoading(true);
    const Data =await signIn({ email: data?.email, password:data.password, rememberMe: data.rememberMe })
    setError("");
    setLoading(false);
  };

  return (
    <main className="flex p-0 w-screen h-screen ">
      <Head><title>Login - ERP Sinfa</title></Head>

      <div className="w-[60%] relative h-full max-md:hidden  bg-[#001c47]  bg-cover bg-center bg-[url('/linhas.png')] flex items-center justify-center">
        <div className="z-1 text-center w-[60%] rounded-2xl">
          <img src="/logotipobranco.png" alt="Logo" className="w-[300px] mx-auto mb-2" />
        </div>

      </div>

      <div className="flex bg-white w-[40%] max-md:w-full h-full items-center justify-center">
        <div className="rounded-2xl max-md:shadow-2xl max-w-md p-8">
          <div className="text-center mb-6">
            <img src="/logotipo2.png" alt="Logo" className="w-20 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-gray-700">Bem-vindo</h2>
            <p className="text-gray-500 text-sm">Faça login para continuar ao ERP Sinfa</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                {...register("email")}
                required
                placeholder="Digite seu e-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

             <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
            <InputPasswordType
             setModifyTypeInput={setViewText}
             children={
              <input
                type={viewText?"text":"password"}
                {...register("password")}
                required
                placeholder="Digite sua senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
             }
             />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="text-blue-600"
                />
                Lembrar-me
              </label>
              <a onClick={
                ()=>{
                  navigation.push("/login/resetPassword")
                }
              } className="text-[#001c47] hover:underline">Esqueceu a senha?</a>
            </div>

            {error && <p className="text-red-600 text-center text-sm">{error}</p>}

              <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center text-white transition cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#001c47] hover:bg-[#02122a]"
              }`}
            >
              {loading ? <Spinner color="white" /> : "Entrar"}
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <div className="flex gap-2 p-2">
              <p>---------</p>
              <p><a onClick={()=>{
                navigation.push(`/login/signup`)
              }} className="text-blue-400 cursor-pointer">Cria uma conta </a>Ou continue com o Google</p>
              <p>---------</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={()=>{
                navigation.push("http://72.61.102.229:8080/api/google");
              }}
              className={`p-2 border w-full rounded flex items-center gap-2 justify-center cursor-pointer`}
            >
              <img src="/google.png" alt="Google" className="h-5 w-5" />
              Cadastrar com Google
            </button>

          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Sinfa ERP — Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
