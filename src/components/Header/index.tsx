"use client";
import { useRouter } from "next/navigation";
import { Bell, Shell, Trash } from "lucide-react";
import { Button } from "../ui/button";
import DialogPerfilCompoent from "../Dialog.component/Dialog.perfil.component";
import { useEffect } from "react";
import { useUserLoginStore } from "@/services/userLogin.api";


export default function HeaderComponent() {


  // const { GetUserLogin, user } = useUserLoginStore()

  const router = useRouter();

  // useEffect(() => {

  //   if (user)
  //     GetUserLogin()

  // }, [])


  function logout() {
    router.push("/login")
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50 no-print w-full border-none">
      <div className="full mx-auto px-8 py-1 flex items-center justify-between">
        <div className="flex items-center gap-3">

        </div>

        <div className="flex items-center gap-3">

          <div className="relative">
            <button id="userBtn" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-50">
              <div className="hidden sm:block text-sm text-right">
                <div className="font-medium text-md">Adalberto Jamba</div>
                <div className="text-xs  text-gray-500">ewewr</div>
              </div>

              <DialogPerfilCompoent
                trigger={
                  <i className="cursor-pointer fas fa-user-circle text-4xl text-gray-600" />
                }

                children={
                  <main className="w-full">
                    <div className="w-full flex items-center justify-center">
                      <i className="cursor-pointer fas fa-user-circle text-[100px] text-gray-600" />
                    </div>

                    <main className="w-full py-4 flex items-center justify-center mt-4">

                      <div className="w-full flex flex-col items-center justify-center">
                        <p className="font-bold text-2xl">Adalberto Camosso</p>
                        <p>adobecss3@gmail.com</p>
                        <p className="flex items-center justify-center p-3 rounded bg-green-800 mt-2 text-white">administrador</p>
                      </div>

                    </main>
                  </main>
                }
                title="Perfil do utilizador"
                description="perfil do utilizador"
              />

            </button>
          </div>

          <div className="relative border-r border-l px-3 cursor-pointer">
            <div className="bg-red-500 w-3 h-3 absolute text-[10px] text-white rounded-full text-center">3</div>
            <Bell />
          </div>

          <button onClick={logout} id="userBtn" className="flex items-center cursor-pointer bg-red-800 p-2 rounded hover:bg-red-900">
            <i className="fas fa-sign-out-alt text-1xl text-white"></i>
          </button>

        </div>
      </div>
    </header>
  );
}
