// components/Footer.tsx
"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleString("pt-BR"));
    };

    updateClock(); // inicializa imediatamente
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval); // limpa o intervalo ao desmontar
  }, []);

  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-white border-t text-sm text-gray-500 p-3 flex justify-between px-6">
      <div>© 2025 PDV Farmácia — Sistema de Faturação</div>
      <div className="text-xs">{time}</div>
    </footer>
  );
}
