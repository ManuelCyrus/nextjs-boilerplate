// pages/devolucoes.tsx
"use client";
import { useState } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Devolucoes() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [motivo, setMotivo] = useState("");
  const [resolucao, setResolucao] = useState("");

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans overflow-y-scroll h-[90vh]">
     {/* LAYOUT */}
      <div className="pt-16 flex">

        {/* CONTEÚDO */}
        <main className="flex-1 overflow-auto p-6">
          {/* Tela de Devoluções e Trocas */}
          <div className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-yellow-500">
            <h1 className="text-2xl font-bold text-yellow-600">
              Devoluções e Trocas
            </h1>
            <p className="text-sm text-slate-500">
              Localize a venda e registre a devolução ou troca do produto.
            </p>
          </div>

          {/* Busca da Venda */}
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h2 className="font-semibold text-slate-700 mb-3">Localizar Venda</h2>
            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Número do cupom"
                className="border rounded px-3 py-2 text-sm flex-1"
              />
              <input
                type="text"
                placeholder="CPF do cliente"
                className="border rounded px-3 py-2 text-sm flex-1"
              />
              <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">
                <i className="fas fa-search mr-1"></i> Buscar
              </button>
            </div>
          </div>

          {/* Itens da Venda */}
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h2 className="font-semibold text-slate-700 mb-4">Itens da Venda</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Dipirona 500mg - Caixa 20 comp.</p>
                  <p className="text-xs text-slate-500">
                    Qtd: 1 | Valor: R$ 12,90
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedItems.includes("dipirona")}
                  onChange={() => toggleItem("dipirona")}
                  className="w-5 h-5 text-yellow-600 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">
                    Vitamina C 1g - Frasco 60 cáps.
                  </p>
                  <p className="text-xs text-slate-500">
                    Qtd: 2 | Valor: R$ 39,90
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedItems.includes("vitaminaC")}
                  onChange={() => toggleItem("vitaminaC")}
                  className="w-5 h-5 text-yellow-600 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Motivo e Resolução */}
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h2 className="font-semibold text-slate-700 mb-4">
              Motivo da Devolução
            </h2>
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full mb-4"
            >
              <option>Selecione o motivo</option>
              <option>Produto com defeito</option>
              <option>Validade vencida</option>
              <option>Erro na compra</option>
              <option>Desistência do cliente</option>
            </select>

            <h2 className="font-semibold text-slate-700 mb-3">
              Forma de Resolução
            </h2>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="resolucao"
                  checked={resolucao === "reembolso"}
                  onChange={() => setResolucao("reembolso")}
                  className="text-yellow-600"
                />{" "}
                Reembolso
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="resolucao"
                  checked={resolucao === "troca"}
                  onChange={() => setResolucao("troca")}
                  className="text-yellow-600"
                />{" "}
                Troca por outro produto
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="resolucao"
                  checked={resolucao === "vale"}
                  onChange={() => setResolucao("vale")}
                  className="text-yellow-600"
                />{" "}
                Vale crédito
              </label>
            </div>
          </div>

          {/* Resumo e Ações */}
          <div className="bg-white rounded-lg shadow p-5 flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Valor total a devolver:</p>
              <p className="text-xl font-bold text-yellow-600">R$ 52,80</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">
                Cancelar
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">
                <i className="fas fa-check mr-1"></i> Confirmar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

    
      