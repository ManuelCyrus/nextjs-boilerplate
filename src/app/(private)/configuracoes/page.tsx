"use client";

import { useState } from "react";
import { 
  Edit3, Save, X, Shield, User, Sliders, Lock, Camera, Mail, 
  Phone, Briefcase, Globe, Clock, List, Bell, Power, AlertCircle,
  CheckCircle2, ChevronDown
} from "lucide-react";

export default function UserProfileERP_Professional() {
  // Estados de Edição por seção
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showPermsModal, setShowPermsModal] = useState(false);

  // Dados do Usuário
  const [user, setUser] = useState({
    nome: "Alexandre Matos",
    username: "alexandre.matos",
    email: "alexandre@empresa.com",
    telefone: "+244 923 000 000",
    cargo: "Diretor Comercial",
    departamento: "Vendas",
    admissao: "2023-01-15",
    supervisor: "Carlos Mendes",
    status: "ativo",
    unidade: "Sede Luanda"
  });

  // Opções para o Select de Cargo
  const cargoOptions = [
    "Diretor Comercial",
    "Gerente de Contas",
    "Analista Financeiro Sênior",
    "Coordenador de Operações",
    "Assistente Administrativo"
  ];

  // Preferências
  const [prefs, setPrefs] = useState({
    idioma: "Português (PT)",
    fusoHorario: "(GMT+01:00) West Central Africa",
    notificacoesEmail: true
  });

   // Dados de Permissão para a tabela
   const permissionsList = [
    { modulo: "Vendas", nivel: "Total", status: true },
    { modulo: "Financeiro", nivel: "Visualizar", status: true },
    { modulo: "Estoque", nivel: "Nenhum", status: false },
  ];

  const toggleStatus = () => {
    const novoStatus = user.status === "ativo" ? "inativo" : "ativo";
    if (confirm(`Tem certeza que deseja alterar o status deste usuário para ${novoStatus.toUpperCase()}? Isso afetará o acesso imediato ao ERP.`)) {
      setUser({ ...user, status: novoStatus });
    }
  };

  const handleSave = (section: string) => {
    // Aqui entraria a lógica de salvar na API
    console.log(`Salvando seção: ${section}`);
    setEditingSection(null);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen overflow-y-scroll">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* HEADER DE PERFIL PROFISSIONAL */}
        <header className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 relative overflow-hidden">
          {/* Faixa de Status */}
          <div className={`absolute top-0 left-0 w-full h-1.5 ${user.status === 'ativo' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-2">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <img
                  src=""

                  className={`w-24 h-24 rounded-2xl object-cover ring-4 ${user.status === 'ativo' ? 'ring-emerald-50' : 'ring-red-50'}`}
                  alt="Perfil"
                />
                <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-md border border-slate-200 hover:text-indigo-600 transition">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-800">{user.nome}</h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                    user.status === 'ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status === 'ativo' ? <CheckCircle2 size={12}/> : <AlertCircle size={12}/>}
                    {user.status}
                  </span>
                </div>
                <p className="text-slate-500 flex items-center gap-2 mt-1">
                  <Briefcase size={14} /> {user.cargo} <span className="text-slate-300">|</span> {user.departamento}
                </p>
                <p className="text-xs text-slate-400 mt-2">ID do Usuário: <span className="font-mono">USR-2023-8842</span></p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={toggleStatus}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition shadow-sm ${
                  user.status === 'ativo' 
                  ? 'border-red-200 text-red-700 hover:bg-red-50' 
                  : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'

                }`}
              >
                <Power size={16} /> {user.status === 'ativo' ? 'Desativar Acesso' : 'Reativar Acesso'}
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA PRINCIPAL */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* DADOS CORPORATIVOS */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <SectionHeader 
                title="Informações Corporativas" 
                icon={<User size={16} />}
                isEditing={editingSection === 'dados'}
                onEdit={() => setEditingSection('dados')}
                onSave={() => handleSave('dados')}
                onCancel={() => setEditingSection(null)}
              />
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <DataField label="Nome Completo" value={user.nome} isEditing={editingSection === 'dados'} />
                <DataField label="E-mail Corporativo" value={user.email} isEditing={editingSection === 'dados'} icon={<Mail size={14}/>} />
                <DataField label="Telefone / Ramal" value={user.telefone} isEditing={editingSection === 'dados'} icon={<Phone size={14}/>}/>
                {/* Campo Cargo agora é um Select */}
                <DataField 
                    label="Cargo Atual" 
                    value={user.cargo} 
                    isEditing={editingSection === 'dados'} 
                    icon={<Briefcase size={14}/>}
                    type="select"
                    options={cargoOptions}
                />
                <DataField label="Departamento" value={user.departamento} isEditing={editingSection === 'dados'} />
                <DataField label="Unidade de Lotação" value={user.unidade} isEditing={editingSection === 'dados'} />
                <DataField label="Data de Admissão" value={user.admissao} isEditing={editingSection === 'dados'} type="date" />
                <DataField label="Gestor Imediato" value={user.supervisor} isEditing={editingSection === 'dados'} />
              </div>
            </section>

            {/* MATRIZ DE PERMISSÕES */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Shield size={16} /> Matriz de Acesso & Permissões
                </h2>
                <button onClick={() => setShowPermsModal(true)} className="text-indigo-600 hover:text-indigo-800 text-xs font-bold border border-indigo-100 px-3 py-1 rounded-md bg-indigo-50">
                  Gerenciar Vínculos
                </button>
              </div>

              {/* Tabela Professional de Permissões */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Módulo ERP</th>
                      <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Nível de Privilégio</th>
                      <th className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {permissionsList.map((perm, index) => (
                      <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-700">{perm.modulo}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            perm.nivel === 'Total' ? 'bg-indigo-100 text-indigo-700' : 
                            perm.nivel === 'Nenhum' ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {perm.nivel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {perm.status ? 
                            <span className="text-emerald-600 flex items-center justify-end gap-1 text-xs font-bold"><CheckCircle2 size={14}/> Ativo</span> : 
                            <span className="text-slate-400 flex items-center justify-end gap-1 text-xs font-bold"><X size={14}/> Inativo</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                 <div className="px-6 py-3 bg-slate-50/30 border-t border-slate-100 text-xs text-slate-500 text-center">
                   Exibindo 3 de 12 módulos disponíveis para este perfil.
                </div>
              </div>
            </section>
          </div>

          {/* COLUNA LATERAL (PREFERÊNCIAS E SEGURANÇA) */}
          <aside className="space-y-8">
            {/* PREFERÊNCIAS DO SISTEMA */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               <SectionHeader 
                title="Preferências do Sistema" 
                icon={<Sliders size={16} />}
                isEditing={editingSection === 'prefs'}
                onEdit={() => setEditingSection('prefs')}
                onSave={() => handleSave('prefs')}
                onCancel={() => setEditingSection(null)}
              />
              <div className="p-6 space-y-5">
                {/* Selects de Preferência também usam o novo tipo */}
                <DataField 
                    label="Idioma da Interface" 
                    value={prefs.idioma} 
                    isEditing={editingSection === 'prefs'} 
                    icon={<Globe size={14}/>}
                    type="select"
                    options={["Português (PT)", "Inglês (EN)", "Espanhol (ES)"]}
                />
                 <DataField 
                    label="Fuso Horário Regional" 
                    value={prefs.fusoHorario} 
                    isEditing={editingSection === 'prefs'} 
                    icon={<Clock size={14}/>}
                    type="select"
                    options={["(GMT+01:00) West Central Africa", "(GMT+00:00) London", "(GMT-03:00) Brasília"]}
                />
                <hr className="border-slate-100" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><Mail size={14} className="text-slate-400"/> Receber alertas por e-mail</span>
                  {editingSection === 'prefs' ? (
                      <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" defaultChecked={prefs.notificacoesEmail} />
                  ) : (
                      <span className={`text-xs font-bold ${prefs.notificacoesEmail ? 'text-emerald-600' : 'text-slate-400'}`}>{prefs.notificacoesEmail ? 'SIM' : 'NÃO'}</span>
                  )}
                </div>
              </div>
            </section>

            {/* CREDENCIAIS */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Lock size={16} /> Credenciais e Segurança
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="flex items-center justify-between w-full p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition group">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 group-hover:bg-indigo-100"><Lock size={18}/></div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-slate-700">Alterar Senha</p>
                            <p className="text-xs text-slate-400">Última alteração há 90 dias</p>
                        </div>
                    </div>
                    <ChevronDown size={16} className="text-slate-300 -rotate-90 group-hover:text-indigo-600 transition"/>
                </button>
                
                 <button className="flex items-center justify-between w-full p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition group">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-lg text-slate-500 group-hover:bg-slate-200"><Shield size={18}/></div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-slate-700">Autenticação 2FA</p>
                            <p className="text-xs text-slate-400">Não configurado</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">Inativo</span>
                </button>
              </div>
               <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
                   <span>Último login: Hoje, 10:45</span>
                   <button className="text-red-600 hover:underline font-medium">Encerrar sessões</button>
                </div>
            </section>
          </aside>
        </div>
      </div>

      {/* MODAL DE PERMISSÕES (PLACEHOLDER) */}
      {showPermsModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Shield className="text-indigo-600"/> Gerenciar Permissões de Acesso</h3>
              <button onClick={() => setShowPermsModal(false)} className="text-slate-400 hover:text-slate-600 bg-white p-1 rounded-full border hover:bg-slate-50"><X size={20}/></button>
            </div>
            <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
               <Shield size={48} className="text-slate-200 mb-4"/>
               <p className="text-slate-600 font-medium">Interface avançada de gestão de perfis e papéis (RBAC).</p>
               <p className="text-sm text-slate-400 mt-2 max-w-md">Aqui seria carregada a árvore completa de módulos do ERP para atribuição granular de permissões (Ler, Criar, Editar, Excluir).</p>
            </div>
             <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
               <button onClick={() => setShowPermsModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-white">Cancelar</button>
               <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-sm">Salvar Definições</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTES ---

// Header de Seção reutilizável com botões de ação
function SectionHeader({ title, icon, isEditing, onEdit, onSave, onCancel }) {
  return (
    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
        {icon} {title}
      </h2>
      {!isEditing ? (
        <button onClick={onEdit} className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded transition text-xs font-bold flex items-center gap-1">
          <Edit3 size={14}/> Editar aqui
        </button>
      ) : (
        <div className="flex gap-2">
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 py-1 rounded transition text-xs font-bold flex items-center gap-1">
            <X size={14}/> Cancelar
          </button>
          <button onClick={onSave} className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1 rounded transition text-xs font-bold flex items-center gap-1 shadow-sm">
            <Save size={14}/> Salvar
          </button>
        </div>
      )}
    </div>
  );
}

// Componente de Campo de Dados Inteligente (Texto ou Select)
function DataField({ label, value, isEditing, type = "text", icon = null, options = [] }) {
  
  const labelDisplay = (
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-tight flex items-center gap-1.5 mb-1.5">
      {icon} {label}
    </label>
  );

  if (isEditing) {
    return (
      <div className="flex flex-col">
        {labelDisplay}
        {type === "select" ? (
          <div className="relative">
            <select
              defaultValue={value}
              className="w-full pl-3 pr-10 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition appearance-none shadow-sm"
            >
              {options.map((opt, index) => (
                <option key={index} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        ) : (
          <input
            type={type}
            defaultValue={value}

            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"

   />
        )}
      </div>
    );
  }

  // Modo de Visualização
  return (
    <div className="flex flex-col">
      {labelDisplay}
      <p className="text-sm font-bold text-slate-700 py-2 border-b border-transparent truncate">
        {value || "—"}
      </p>
    </div>
  );
}