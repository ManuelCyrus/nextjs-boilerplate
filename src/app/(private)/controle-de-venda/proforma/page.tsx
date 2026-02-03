"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBox,
  faTrashAlt,
  faFileInvoice,
  faPrint,
  faSave,
  faExchangeAlt,
  faMinus,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import Header from "@/components/Header";
import { Blocks, PlusCircle, ShoppingCart, Trash, XCircle } from "lucide-react";
import DialogCompoent from "@/components/Dialog.component/Dialog.component";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import DefaultTable from "@/components/Table";

type Product = {
  id: number;
  name: string;
  price: number;
};

type Proforma = {
  id: number;
  cliente: string;
  itens: number;
  total: number;
  status: string;
  criadoEm: string;
};

const mockProducts: Product[] = [
  { id: 1, name: "Dipirona 500mg", price: 12.9 },
  { id: 2, name: "Vitamina C 1g", price: 39.9 },
  { id: 3, name: "Paracetamol 750mg", price: 14.5 },
  { id: 4, name: "Amoxicilina 500mg", price: 32.0 },
  { id: 5, name: "Ibuprofeno 400mg", price: 18.9 },
  { id: 6, name: "Xarope Tosse Infantil", price: 25.0 },
  { id: 7, name: "Protetor Solar FPS 50", price: 59.9 },
  { id: 8, name: "Multivitamínico A-Z", price: 74.5 },
];

export default function ProformasPage() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [validade, setValidade] = useState("7 dias");
  const [cliente, setCliente] = useState("");
  const [historico, setHistorico] = useState<Proforma[]>([]);
  const [loading, setLoading] = useState(false);

  // Cálculo dos totais
  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const iva = subtotal * 0.17;
  const iss = subtotal * 0.05;
  const pisCofins = subtotal * 0.0365;
  const total = subtotal + iva + iss + pisCofins;

  // --- Funções de manipulação local ---
  function addProduct(product: Product) {
    const existing = items.find((i) => i.id === product.id);
    let newList;
    if (existing) {
      newList = items.map((i) =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      newList = [...items, { ...product, qty: 1 }];
    }
    setItems(newList);
  }

  function decreaseQty(id: number) {
    const newList = items
      .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
      .filter((i) => i.qty > 0);
    setItems(newList);
  }

  function increaseQty(id: number) {
    const newList = items.map((i) =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    );
    setItems(newList);
  }

  function removeProduct(id: number) {
    setItems(items.filter((i) => i.id !== id));
  }

  // --- Integração com API ---
  async function fetchHistorico() {
    setLoading(true);
    try {
      const res = await fetch("/api/proformas");
      const data = await res.json();
      setHistorico(data);
    } catch (err) {
      console.error("Erro ao buscar histórico:", err);
    } finally {
      setLoading(false);
    }
  }

  async function salvarRascunho() {
    if (items.length === 0) {
      alert("Adicione pelo menos um produto.");
      return;
    }

    const nova = {
      cliente: cliente || "Cliente não informado",
      itens: items.length,
      total,
      status: "rascunho",
    };

    await fetch("/api/proformas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nova),
    });

    setEditorOpen(false);
    setItems([]);
    setCliente("");
    fetchHistorico();
  }

  async function converterProforma(id: number) {
    await fetch("/api/proformas", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "convertido" }),
    });
    fetchHistorico();
  }

  async function removerProforma(id: number) {
    if (!confirm("Tem certeza que deseja excluir esta proforma?")) return;
    await fetch(`/api/proformas?id=${id}`, { method: "DELETE" });
    fetchHistorico();
  }

  useEffect(() => {
    fetchHistorico();
  }, []);

  return (
    <div className="w-full bg-gray-100 text-gray-800 font-sans overflow-y-scroll h-[90vh]">
      <div className="flex w-full">

        <main className="flex w-full flex-col overflow-auto p-2">
          {/* Topo */}
          <div className=" bg-white w-full shadow p-2 rounded-md ">
            <div className="flex w-full rounded-md items-center justify-between">
              <div className="w-[40%]">
                <h1 className="text-2xl font-bold text-slate-800">
                  Faturas Proforma
                </h1>
                <p className="text-sm text-slate-500">
                  Monte uma fatura como se fosse uma venda, mas sem finalizar.
                </p>
              </div>

              <div className="flex gap-2 items-center">
                   
                <Button className={`${editorOpen?"bg-red-600":"bg-black"}`} onClick={() => {
                  if (editorOpen)
                    setEditorOpen(false)
                  else setEditorOpen(true)
                }}>
                  {editorOpen ? (<><XCircle />Fechar</>) : (<><PlusCircle />Adicionar</>)}
                </Button>

              </div>
            </div>
            <section>

            </section>
          </div>


          {/* Editor */}
          {editorOpen && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <section className="lg:col-span-2 bg-white rounded-lg shadow p-4">
                <h2 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faBox} />
                  Produtos
                </h2>
                <div className="flex flex-col w-full gap-2">
                  <Input placeholder="pesquise aqui" />
                  <div className="w-full h-[75vh] border rounded-md border-gray-200  overflow-y-scroll">
                    
                    <DefaultTable
                      headers={
                        <>
                          <TableHead className="w-[100px]">Produto</TableHead>
                          <TableHead>Preco</TableHead>
                          <TableHead className="text-center">Ação</TableHead>
                        </>
                      }
                    >
                      {
                        Array.isArray(mockProducts) ?
                          mockProducts?.map((item, index) => (

                            <TableBody key={index}>
                              <TableRow key={index} className={`border-gray-200 p-3 bg-${index % 2 !== 0 ? "gray-100" : "white"} hover:shadow-sm hover:shadow-gray-300 hover:border hover:border-gray-300 z-2 `}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.price.toFixed(2)} kz</TableCell>
                                <TableCell className="text-right gap-2">
                                  <Button onClick={() => addProduct(item)} className=" left-2 rounded-sm bg-green-400">
                                    <ShoppingCart size={10} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )) : (<main className="w-full p-10 flex items-center justify-center text-md font-semibold text-red-600">
                            <Blocks />  Sem dados disponíveis
                          </main>)
                      }
                    </DefaultTable>
                  </div>

                </div>
              </section>

              <aside className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold text-slate-700 mb-2">Cliente</h3>
                  <input
                    type="text"
                    placeholder="Nome do cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    className="border rounded px-3 py-2 w-full mb-3"
                  />

                  <h3 className="font-semibold text-slate-700">Carrinho</h3>

                  <div className="mt-3 space-y-2">
                    {items.length === 0 && (
                      <p className="text-xs text-slate-400">
                        Nenhum produto adicionado
                      </p>
                    )}
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-slate-500">
                            {item.qty} x R$ {item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                          <div className="font-semibold w-20 text-right">
                            R$ {(item.price * item.qty).toFixed(2)}
                          </div>
                          <button
                            onClick={() => removeProduct(item.id)}
                            className="text-red-500"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-3 pt-3 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (17%)</span>
                      <span>R$ {iva.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ISS (5%)</span>
                      <span>R$ {iss.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PIS/COFINS (3.65%)</span>
                      <span>R$ {pisCofins.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-green-700 text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    Validade da Fatura
                  </label>
                  <select
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option>7 dias</option>
                    <option>15 dias</option>
                    <option>30 dias</option>
                  </select>
                </div>

                <div className="bg-white rounded-lg shadow p-4 space-y-2">
                  <button
                    onClick={salvarRascunho}
                    className="w-full px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faSave} />
                    Salvar Rascunho
                  </button>
                  <button className="w-full px-3 py-2 border rounded hover:bg-slate-50 text-sm flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faPrint} />
                    Imprimir
                  </button>
                  <button className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faWhatsapp} />
                    Enviar WhatsApp
                  </button>
                </div>
              </aside>
            </div>
          )}

          {/* Histórico */}
          {
            editorOpen?
          (<></>
          )
            :
            (
          <div className="bg-white rounded-lg shadow p-4 mt-6">
            <h2 className="font-semibold mb-3">Faturas recentes</h2>
            {loading ? (
              <div className="p-3 text-slate-400 text-sm">
                Carregando histórico...
              </div>
            ) : historico.length === 0 ? (
              <div className="p-3 text-slate-400 text-sm">
                Nenhuma fatura criada ainda.
              </div>
            ) : (
              <div className="divide-y">
                {historico.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 flex items-start justify-between hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-yellow-50 text-yellow-600 rounded-full mt-1">
                        <FontAwesomeIcon icon={faFileInvoice} />
                      </div>
                      <div>
                        <div className="font-medium">
                          Fatura #{p.id}{" "}
                          <span className="text-xs text-slate-500">
                            ({p.status})
                          </span>
                        </div>
                        <div className="text-sm text-slate-600">
                          Cliente: {p.cliente} · Itens: {p.itens} · Total: R${" "}
                          {p.total.toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-400">
                          Criado em {p.criadoEm}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <button
                        onClick={() => converterProforma(p.id)}
                        className="px-3 py-2 bg-yellow-600 text-white rounded"
                      >
                        Converter
                      </button>
                      <button
                        onClick={() => removerProforma(p.id)}
                        className="px-3 py-2 border rounded text-red-500"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
            )
          }
        </main>
      </div>
    </div>
  );
}
