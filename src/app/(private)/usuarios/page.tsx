"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  List, LayoutGrid, Search, Plus, Filter, Calendar, 
  ChevronDown, ExternalLink, X, Phone, MapPin, 
  CheckCircle2, AlertCircle, Clock, ArrowUpDown, 
  UserCircle, Building2, UserCog, MoreVertical
} from "lucide-react";

// --- Mock de Dados ---
const DEPARTAMENTOS = ["Tecnologia", "Recursos Humanos", "Financeiro", "Comercial", "Operações"];
const CARGOS = ["Administrador", "Analista Sénior", "Gerente de Projecto", "Consultor Externo", "Coordenador"];

const MOCK_USERS = [
  { id: "1", nome: "Alexandre Matos", email: "alexandre.matos@empresa.com", cargo: "Analista Sénior", departamento: "Tecnologia", status: "Ativo", tipo: "Interno", dataCriacao: "12/01/2024", ultimoAcesso: "Hoje, 10:45", telefone: "+244 923 000 111", unidade: "Sede Luanda", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", nome: "Beatriz Silva", email: "beatriz.silva@empresa.com", cargo: "Gerente de Projecto", departamento: "Comercial", status: "Inativo", tipo: "Interno", dataCriacao: "05/11/2023", ultimoAcesso: "Ontem, 17:20", telefone: "+244 923 000 222", unidade: "Benguela", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", nome: "Carlos Pinto", email: "c.pinto@externo.com", cargo: "Consultor Externo", departamento: "Operações", status: "Bloqueado", tipo: "Externo", dataCriacao: "20/12/2023", ultimoAcesso: "15/01/2024", telefone: "+244 923 000 333", unidade: "Sede Luanda", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "4", nome: "Daniela Costa", email: "daniela.c@empresa.com", cargo: "Coordenador", departamento: "Recursos Humanos", status: "Ativo", tipo: "Admin", dataCriacao: "02/02/2024", ultimoAcesso: "Hoje, 09:00", telefone: "+244 923 000 444", unidade: "Huambo", avatar: "https://i.pravatar.cc/150?u=4" },
];

export default function GestaoUtilizadores() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [hoveredUser, setHoveredUser] = useState<any>(null);
  const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 });

  // Funções de Navegação
  const handleVerMais = (userId: string) => {
    router.push(`/configuracoes?id=${userId}`);
  };

  // Lógica do Popover Informativo
  const handleMouseEnter = (e: React.MouseEvent, user: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPos({ x: rect.left + 50, y: rect.top - 120 });
    setHoveredUser(user);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans antialiased">
      
      {/* HEADER DE PÁGINA */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Gestão de Utilizadores</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Administração central de acessos e identidades corporativas</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition ${viewMode === 'table' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500'}`}
              >
                <List size={18} />
              </button>
              <button 
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md transition ${viewMode === 'cards' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500'}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-bold transition shadow-md shadow-blue-100"
            >
              <Plus size={18} /> Adicionar Utilizador
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 space-y-6">
        
        {/* ÁREA DE FILTROS AVANÇADOS */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
            <Filter size={16} className="text-blue-700" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Filtros de Pesquisa Avançada</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* Pesquisa Rápida */}
            <div className="xl:col-span-2 relative">
              <label className="text-[10px] font-black text-slate-400 uppercase mb-1.5 block tracking-tighter">Pesquisa Global</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Nome, e-mail ou cargo..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
                />
              </div>
            </div>

            <SelectFilter label="Status" options={["Ativo", "Inativo", "Pendente", "Bloqueado"]} />
            <SelectFilter label="Departamento" options={DEPARTAMENTOS} />
            <SelectFilter label="Tipo" options={["Interno", "Externo", "Administrador"]} />
            
            <div className="xl:col-span-2 grid grid-cols-2 gap-2">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-1.5 block tracking-tighter">Criação (Início/Fim)</label>
                  <div className="flex items-center gap-1">
                    <input type="date" className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                    <input type="date" className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                  </div>
               </div>
               <SelectFilter label="Ordenação" options={["Nome", "Data de Criação", "Último Acesso"]} />
            </div>

            <div className="flex items-end gap-2 xl:col-span-1">
              <button className="flex-1 bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-slate-900 transition uppercase">Aplicar</button>
              <button className="px-3 py-2.5 text-slate-500 hover:bg-slate-100 rounded-lg transition text-xs font-bold uppercase">Limpar</button>
            </div>
          </div>
        </section>

        {/* LISTAGEM */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Utilizador</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cargo / Departamento</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Último Acesso</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_USERS.map((user) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-blue-50/30 transition-colors group"
                      onMouseEnter={(e) => handleMouseEnter(e, user)}
                      onMouseLeave={() => setHoveredUser(null)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} className="w-9 h-9 rounded-lg border-2 border-white shadow-sm object-cover" alt="" />
                          <div>
                            <p className="text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors">{user.nome}</p>
                            <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-600">{user.cargo}</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1"><Building2 size={10}/> {user.departamento}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <Clock size={14} className="text-slate-300"/> {user.ultimoAcesso}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleVerMais(user.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[11px] font-black text-slate-600 uppercase hover:border-blue-300 hover:text-blue-700 transition shadow-sm"
                        >
                          Ver Mais <ExternalLink size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* PAGINAÇÃO */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
               <p className="text-slate-500 font-medium">Mostrando <span className="text-slate-800 font-bold">1 - 4</span> de 48 resultados</p>
               <div className="flex gap-1">
                  <button className="p-2 border rounded bg-white text-slate-400 hover:text-slate-600">Anterior</button>
                  <button className="px-3.5 py-2 border rounded bg-blue-700 text-white font-bold">1</button>
                  <button className="px-3.5 py-2 border rounded bg-white text-slate-600 hover:bg-slate-50 transition">2</button>
                  <button className="p-2 border rounded bg-white text-slate-600 hover:bg-slate-50 transition">Próximo</button>
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_USERS.map((user) => (
              <div key={user.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition group">
                <div className="relative mb-4">
                   <img src={user.avatar} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all" alt="" />
                   <div className="absolute -bottom-1 -right-1">
                      <StatusBadge status={user.status} showDot OnlyDot />
                   </div>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">{user.nome}</h3>
                <p className="text-xs text-slate-400 font-medium mb-4">{user.email}</p>
                <div className="w-full bg-slate-50 rounded-lg p-3 mb-5 border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Cargo / Departamento</p>
                   <p className="text-xs font-bold text-slate-700">{user.cargo}</p>
                   <p className="text-[11px] text-slate-500">{user.departamento}</p>
                </div>
                <button 
                   onClick={() => handleVerMais(user.id)}
                   className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-600 uppercase tracking-wider hover:bg-blue-700 hover:text-white hover:border-blue-700 transition shadow-sm"
                >
                  Ver Perfil Completo
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* POPOVER INFORMATIVO (HOVER) */}
      {hoveredUser && (
        <div 
          className="fixed z-[100] w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-5 animate-in fade-in zoom-in-95 duration-200 pointer-events-none"
          style={{ left: popoverPos.x, top: popoverPos.y }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img src={hoveredUser.avatar} className="w-14 h-14 rounded-xl object-cover shadow-inner" alt="" />
            <div>
              <p className="text-sm font-bold text-slate-800">{hoveredUser.nome}</p>
              <StatusBadge status={hoveredUser.status} />
            </div>
          </div>
          <div className="space-y-2.5 border-t pt-4 border-slate-100">
            <DetailItem icon={<Phone size={14}/>} label="Telefone" value={hoveredUser.telefone} />
            <DetailItem icon={<MapPin size={14}/>} label="Localização" value={hoveredUser.unidade} />
            <DetailItem icon={<UserCog size={14}/>} label="Tipo" value={hoveredUser.tipo} />
          </div>
        </div>
      )}

      {/* MODAL ADICIONAR UTILIZADOR */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Plus className="text-blue-700" size={20} /> Novo Registo de Utilizador
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition bg-white p-1 rounded-md border shadow-sm"><X size={18}/></button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <ModalInput label="Nome Completo" placeholder="Ex: Alexandre de Matos" />
              </div>
              <div className="md:col-span-2">
                <ModalInput label="Email Corporativo" placeholder="exemplo@empresa.com" type="email" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-tighter">Cargo Principal</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600">
                  {CARGOS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-tighter">Departamento</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600">
                  {DEPARTAMENTOS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-2 block">Status Inicial da Conta</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 flex-1">
                    <input type="radio" name="status" defaultChecked className="w-4 h-4 accent-blue-700" /> Ativo
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 flex-1">
                    <input type="radio" name="status" className="w-4 h-4 accent-blue-700" /> Pendente
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-sm font-black text-slate-500 hover:bg-slate-100 rounded-lg transition uppercase tracking-wider">Cancelar</button>
              <button className="px-8 py-2.5 bg-blue-700 text-white text-sm font-black rounded-lg hover:bg-blue-800 shadow-lg shadow-blue-100 transition uppercase tracking-wider">Guardar Utilizador</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTES AUXILIARES ---

function SelectFilter({ label, options }: { label: string, options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase mb-1.5 block tracking-tighter">{label}</label>
      <div className="relative">
        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-blue-600 transition">
          <option value="">Todos</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function StatusBadge({ status, showDot = false, OnlyDot = false }: { status: string, showDot?: boolean, OnlyDot?: boolean }) {
  const styles: any = {
    Ativo: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Inativo: "bg-slate-100 text-slate-600 border-slate-200",
    Bloqueado: "bg-red-50 text-red-700 border-red-200",
    Pendente: "bg-amber-50 text-amber-700 border-amber-200",
  }[status] || "bg-slate-50 text-slate-500 border-slate-200";

  const dotColor: any = {
    Ativo: "bg-emerald-500",
    Inativo: "bg-slate-400",
    Bloqueado: "bg-red-500",
    Pendente: "bg-amber-500",
  }[status];

  if (OnlyDot) return <div className={`w-3.5 h-3.5 rounded-full border-2 border-white ${dotColor} shadow-sm`} />;

  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-1.5 ${styles}`}>
      {showDot && <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {status}
    </span>
  );
}

function ModalInput({ label, placeholder, type = "text" }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black text-slate-400 uppercase tracking-tighter">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600 transition shadow-inner"
      />
    </div>
  );
}

function DetailItem({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-slate-300">{icon}</div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-0.5">{label}</p>
        <p className="text-xs font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}