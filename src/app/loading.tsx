"use client";

import { Loader2 } from "lucide-react"; // ou qualquer outro ícone/loader
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 w-scree h-scress">
      <div className="flex flex-col items-center">
        <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
        <p className="mt-4 text-gray-700 text-lg">Carregando...</p>
      </div>
    </div>
  );
}
