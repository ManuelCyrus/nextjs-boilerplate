"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import { ReactNode } from "react";
import ClientThemeProvider from "@/components/clienteThemeProvider";
import ViewLatelMenuContext from "@/context/ViewLatelMenuContext";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <>
      <ClientThemeProvider>
        <ViewLatelMenuContext>{children}</ViewLatelMenuContext>
      </ClientThemeProvider>
    </>
  );
}
