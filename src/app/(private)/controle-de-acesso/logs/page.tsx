"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useInvoice } from "@/services/invoices";

interface Log {
  id: number;
  date: string;
  time: string;
  action: string;
  module: string;
  description: string;
  ip: string;
  result: "Sucesso" | "Erro" | "Aviso";
}

const mockLogs: Log[] = [
  {
    id: 1,
    date: "2025-10-29",
    time: "09:32",
    action: "Login",
    module: "Autenticação",
    description: "Usuário autenticou-se com sucesso.",
    ip: "192.168.1.15",
    result: "Sucesso",
  },
  {
    id: 2,
    date: "2025-10-29",
    time: "09:40",
    action: "Criação",
    module: "Produtos",
    description: "Novo produto adicionado ao catálogo: Dipirona 500mg.",
    ip: "192.168.1.15",
    result: "Sucesso",
  },
  {
    id: 3,
    date: "2025-10-29",
    time: "09:50",
    action: "Edição",
    module: "Clientes",
    description: "Atualizou endereço do cliente Maria Fernandes.",
    ip: "192.168.1.15",
    result: "Aviso",
  },
  {
    id: 4,
    date: "2025-10-29",
    time: "10:15",
    action: "Exclusão",
    module: "Vendas",
    description: "Tentou excluir fatura #1023 — sem permissão.",
    ip: "192.168.1.15",
    result: "Erro",
  },
];

export default function UserActivity() {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [filters, setFilters] = useState({
    date: "",
    action: "",
    module: "",
  });

  const filteredLogs = mockLogs.filter(
    (log) =>
      (!filters.date || log.date === filters.date) &&
      (!filters.action || log.action === filters.action) &&
      (!filters.module || log.module === filters.module)
  );

  return (
    <div className=" bg-gray-100 text-gray-800 font-sans overflow-y-scroll h-[90vh]">

      <div className="flex">
        <main className="flex-1 p-2 overflow-auto">
          {/* Cabeçalho */}
          <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <i className="fas fa-user-clock text-indigo-600"></i>
                Atividades de Usuário
              </h1>
              <p className="text-sm text-slate-500">
                Acompanhe as ações, acessos e eventos registrados deste usuário.
              </p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
              <i className="fas fa-download mr-2"></i> Exportar Logs
            </button>
          </div>
          {/* Informações do Usuário */}
          <div className="bg-white rounded-lg shadow p-5 mb-6 border-l-4 border-indigo-500">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-700">
                  João Fernandes
                </h2>
                <p className="text-sm text-slate-500">
                  Cargo: Vendedor | Usuário desde: 2023
                </p>
              </div>
              <div className="text-sm text-slate-600 flex flex-col items-end">
                <span>
                  <i className="fas fa-map-marker-alt mr-1 text-indigo-500"></i>
                  Último IP: 192.168.1.15
                </span>
                <span>
                  <i className="fas fa-clock mr-1 text-indigo-500"></i>
                  Último login: 29/10/2025 - 09:32
                </span>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <i className="fas fa-filter text-indigo-600"></i> Filtros
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="date"
                className="border rounded px-3 py-2 text-sm"
                value={filters.date}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, date: e.target.value }))
                }
              />
              <select
                className="border rounded px-3 py-2 text-sm"
                value={filters.action}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, action: e.target.value }))
                }
              >
                <option value="">Ação</option>
                <option value="Login">Login</option>
                <option value="Criação">Criação</option>
                <option value="Edição">Edição</option>
                <option value="Exclusão">Exclusão</option>
              </select>
              <select
                className="border rounded px-3 py-2 text-sm"
                value={filters.module}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, module: e.target.value }))
                }
              >
                <option value="">Módulo</option>
                <option value="Produtos">Produtos</option>
                <option value="Clientes">Clientes</option>
                <option value="Vendas">Vendas</option>
                <option value="Autenticação">Autenticação</option>
              </select>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={() => setFilters({ date: "", action: "", module: "" })}
              >
                Limpar
              </button>
            </div>
          </div>

          {/* Tabela de Logs */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Hora</th>
                  <th className="px-4 py-3">Ação</th>
                  <th className="px-4 py-3">Módulo</th>
                  <th className="px-4 py-3">Descrição</th>
                  <th className="px-4 py-3 text-center">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b hover:bg-slate-50 cursor-pointer"
                    onClick={() => setSelectedLog(log)}
                  >
                    <td className="px-4 py-3">{log.date}</td>
                    <td className="px-4 py-3">{log.time}</td>
                    <td className="px-4 py-3 font-medium">{log.action}</td>
                    <td className="px-4 py-3">{log.module}</td>
                    <td className="px-4 py-3 truncate max-w-xs">
                      {log.description}
                    </td>
                    <td
                      className={`px-4 py-3 text-center font-semibold ${
                        log.result === "Sucesso"
                          ? "text-green-600"
                          : log.result === "Erro"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {log.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLogs.length === 0 && (
              <div className="p-6 text-center text-slate-500 text-sm">
                Nenhum log encontrado com os filtros aplicados.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal Detalhes do Log */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
              onClick={() => setSelectedLog(null)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-info-circle text-indigo-600"></i> Detalhes da
              Atividade
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Data:</strong> {selectedLog.date}
              </p>
              <p>
                <strong>Hora:</strong> {selectedLog.time}
              </p>
              <p>
                <strong>Ação:</strong> {selectedLog.action}
              </p>
              <p>
                <strong>Módulo:</strong> {selectedLog.module}
              </p>
              <p>
                <strong>Descrição:</strong> {selectedLog.description}
              </p>
              <p>
                <strong>IP:</strong> {selectedLog.ip}
              </p>
              <p>
                <strong>Resultado:</strong>{" "}
                <span
                  className={`font-semibold ${
                    selectedLog.result === "Sucesso"
                      ? "text-green-600"
                      : selectedLog.result === "Erro"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {selectedLog.result}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
