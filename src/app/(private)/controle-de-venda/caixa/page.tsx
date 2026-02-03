"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

type Registro = {
  id: number;
  tipo: "abertura" | "fechamento";
  data: string;
};

export default function Caixa() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"open" | "mov" | "close">("open");
  const [historico, setHistorico] = useState<Registro[]>([]);

  // Buscar status inicial e histórico
  async function carregarCaixa() {
    const res = await fetch("/api/caixa");
    const data = await res.json();
    setIsOpen(data.aberto);
    setHistorico(data.historico || []);
  }

  useEffect(() => {
    carregarCaixa();
  }, []);

  // Abrir caixa
  const abrirCaixa = async () => {
    const res = await fetch("/api/caixa", { method: "POST" });
    const data = await res.json();
    setIsOpen(data.aberto);
    setHistorico(data.historico);
    setTab("mov");
  };

  // Fechar caixa
  const fecharCaixa = async () => {
    const res = await fetch("/api/caixa", { method: "PATCH" });
    const data = await res.json();
    setIsOpen(data.aberto);
    setHistorico(data.historico);
    setTab("close");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans overflow-y-scroll h-[90vh]">
   
      <div className="pt-16 flex">
        <main className="flex-1 overflow-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Caixa</h1>
              <p className="text-sm text-slate-500">
                Abertura, movimentação e fechamento do caixa do turno.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    isOpen ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isOpen ? "Aberto" : "Fechado"}
                </span>
              </div>

              {!isOpen ? (
                <button
                  onClick={abrirCaixa}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <i className="fas fa-door-open mr-2"></i>Abrir Caixa
                </button>
              ) : (
                <button
                  onClick={fecharCaixa}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <i className="fas fa-lock mr-2"></i>Fechar Caixa
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex gap-3 border-b pb-3 mb-4">
              <button
                className={`px-3 py-2 rounded ${
                  tab === "open" ? "bg-yellow-50" : ""
                }`}
                onClick={() => setTab("open")}
              >
                Abertura
              </button>
              <button
                className={`px-3 py-2 rounded ${
                  tab === "mov" ? "bg-yellow-50" : ""
                }`}
                onClick={() => setTab("mov")}
              >
                Movimentação
              </button>
              <button
                className={`px-3 py-2 rounded ${
                  tab === "close" ? "bg-yellow-50" : ""
                }`}
                onClick={() => setTab("close")}
              >
                Fechamento
              </button>
            </div>

            {tab === "open" && <p>Abertura de caixa</p>}
            {tab === "mov" && <p>Movimentações do turno</p>}
            {tab === "close" && <p>Fechamento do caixa</p>}
          </div>

          {/* Histórico */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-3 text-slate-700">
              Histórico de Caixas
            </h3>
            {historico.length === 0 ? (
              <div className="p-3 text-slate-500 text-sm">
                Nenhum caixa registrado ainda.
              </div>
            ) : (
              <ul className="divide-y text-sm text-slate-600">
                {historico.map((reg) => (
                  <li key={reg.id} className="py-2 flex justify-between">
                    <span>
                      {reg.tipo === "abertura" ? "🔓 Abertura" : "🔒 Fechamento"}
                    </span>
                    <span className="text-slate-500">{reg.data}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
