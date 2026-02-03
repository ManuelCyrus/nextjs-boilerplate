"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!stored) {
      console.warn("🚫 Nenhum token encontrado — redirecionando login");
      router.replace("/login");
      return;
    }

    setToken(stored);
    setIsReady(true);
  }, [router]);

  return { isReady, token };
}
