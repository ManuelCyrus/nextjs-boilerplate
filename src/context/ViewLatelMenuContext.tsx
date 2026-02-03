
"use Client";

import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import GetUserContext from "./getuserContext";
import LateralMenuGeneral from "@/components/LateralMenu/lateralMenu";
import Footer from "@/components/footer";

export default function ViewLatelMenuContext({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const publicPaths = [
    "/",
    "/sinfa/consutoria-farmaceutica",
    "/sinfa/contablidade-autoria",
    "/sinfa/software-de-facturacao",
    "/sinfa/desenvolvimento",
    "/sinfa/contacto",
    "/sinfa/noticias",
    "/sinfa/Design",
    "/sinfa/sobre",
    "/sinfa/Marketing",
    "/sinfa/servicos",
  ];

  return (
    <>
      {pathname == "/login" ? (
        <>{children}</>
      ) : pathname == "/login/signup" ? (
        <>{children}</>
      ) : pathname == "/login/resetPassword" ? (
        <>{children}</>
      ) : pathname == "/controle-de-venda/pos" ? (
        <>
          {" "}
          <GetUserContext>{children} </GetUserContext>
        </>
      ) : publicPaths.includes(pathname) ? (
        <div> 
          {children}
          </div>
      ) : (
        <GetUserContext>
          <main className="bg-white">
            <main className="w-screen h-screen flex">
              <LateralMenuGeneral>
                <main className="px-2 py-2 flex relative overflow-hidden h-[95%] w-full">
                  <div className="w-full  flex flex-col overflow-hidden rounded-sm border border-gray-100 h-full">
                    {children}
                  </div> 
                  <Footer/>
                </main>
               
              </LateralMenuGeneral>
            </main>{" "}
          </main>
        </GetUserContext>
      )}
    </>
  );
}