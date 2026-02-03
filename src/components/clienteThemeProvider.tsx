"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as ShadThemeProvider } from "./theme-provider";

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // não renderiza nada no servidor

  return <ShadThemeProvider 
   attribute="class"   
      defaultTheme="light" 
      enableSystem={false}
  >{children}</ShadThemeProvider>;
}
