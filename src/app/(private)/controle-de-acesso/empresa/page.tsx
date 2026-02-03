"use client";

import React, { useState } from "react";
import { 
  Building2, Landmark, Mail, Phone, MapPin, 
  Globe, CreditCard, Calendar, ShieldCheck, 
  FileText, Edit3, Save, X, Globe2
} from "lucide-react";

export default function EmpresaPerfilSóbrio() {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Mock de dados da empresa
  const [empresa, setEmpresa] = useState({
    razaoSocial: "SINFA GEST - Soluções Tecnológicas, Lda",
    nomeFantasia: "SINFA GEST",
    nif: "5000434221",
    email: "institucional@sinfa.ao",
    telefone: "+244 949 349 399",
    website: "www.sinfa.ao",
    endereco: "Zango 3, Luanda",
    cidade: "Luanda",
    pais: "Angola",
    plano: "Enterprise Gold",
    moeda: "AOA (Kwanza)",
    status: "Ativo"
  });

  const SectionHeader = ({ title, icon: Icon, section }: any) => (
    <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
        <Icon size={16} className="text-slate-400" /> {title}
      </h3>
      {editingSection === section ? (
        <div className="flex gap-2">
          <button onClick={() => setEditingSection(null)} className="text-[11px] font-bold text-slate-400 hover:text-slate-600 uppercase">Cancelar</button>
          <button onClick={() => setEditingSection(null)} className="text-[11px] font-bold text-blue-700 hover:text-blue-800 uppercase">Salvar</button>
        </div>
      ) : (
        <button onClick={() => setEditingSection(section)} className="text-slate-400 hover:text-blue-600 transition-colors">
          <Edit3 size={14} />
        </button>
      )}
    </div>
  );

  const DataField = ({ label, value, isEditing }: any) => (
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{label}</label>
      {isEditing ? (
        <input 
          type="text" 
          defaultValue={value} 
          className="w-full text-sm font-medium p-2 bg-slate-50 border border-slate-200 rounded focus:ring-1 focus:ring-slate-400 outline-none"
        />
      ) : (
        <p className="text-sm font-semibold text-slate-700 truncate">{value || "---"}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-y-scroll p-8 text-slate-900 font-sans ">
      <div className="max-w-6xl mx-auto space-y-6 ">
        
        {/* CABEÇALHO PRINCIPAL */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shadow-inner">
              <Building2 size={40} className="text-slate-300" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">{empresa.nomeFantasia}</h1>
                <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  {empresa.status}
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium">{empresa.razaoSocial}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-xs text-slate-400 flex items-center gap-1"><FileText size={12}/> NIF: {empresa.nif}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><CreditCard size={12}/> Plano: {empresa.plano}</span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded uppercase tracking-widest hover:bg-slate-800 transition shadow-lg shadow-slate-200">
            Relatórios da Empresa
          </button>
        </div>

        {/* GRID DE INFORMAÇÕES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card: Identificação Fiscal */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <SectionHeader title="Identificação Fiscal" icon={Landmark} section="fiscal" />
            <div className="space-y-5">
              <DataField label="Razão Social" value={empresa.razaoSocial} isEditing={editingSection === 'fiscal'} />
              <DataField label="Nome Comercial" value={empresa.nomeFantasia} isEditing={editingSection === 'fiscal'} />
              <DataField label="NIF / Número de Identificação" value={empresa.nif} isEditing={editingSection === 'fiscal'} />
            </div>
          </div>

          {/* Card: Contactos Oficiais */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <SectionHeader title="Contactos e Canais" icon={Mail} section="contactos" />
            <div className="space-y-5">
              <DataField label="E-mail Institucional" value={empresa.email} isEditing={editingSection === 'contactos'} />
              <DataField label="Telefone Principal" value={empresa.telefone} isEditing={editingSection === 'contactos'} />
              <DataField label="Website / Domínio" value={empresa.website} isEditing={editingSection === 'contactos'} />
            </div>
          </div>

          {/* Card: Localização */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <SectionHeader title="Sede e Endereço" icon={MapPin} section="local" />
            <div className="space-y-5">
              <DataField label="País" value={empresa.pais} isEditing={editingSection === 'local'} />
              <DataField label="Província / Cidade" value={empresa.cidade} isEditing={editingSection === 'local'} />
              <DataField label="Endereço Físico" value={empresa.endereco} isEditing={editingSection === 'local'} />
            </div>
          </div>

          {/* Card: Configurações de Sistema */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm lg:col-span-2">
            <SectionHeader title="Definições de Operação" icon={ShieldCheck} section="operacao" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <DataField label="Moeda Padrão" value={empresa.moeda} isEditing={editingSection === 'operacao'} />
                <DataField label="Fuso Horário Operacional" value="(GMT +01:00) Luanda" isEditing={editingSection === 'operacao'} />
              </div>
              <div className="space-y-5">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Segurança de Dados</label>
                    <div className="flex items-center gap-2 mt-1">
                       <ShieldCheck size={16} className="text-emerald-500" />
                       <span className="text-xs font-bold text-slate-700">Encriptação SSL/TLS Ativa</span>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Última Auditoria</label>
                    <p className="text-xs font-medium text-slate-500">22 de Janeiro de 2026</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Card: Subscrição */}
          <div className="bg-slate-900 rounded-xl p-6 shadow-xl flex flex-col justify-between text-white">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Contrato Atual</h3>
                <CreditCard size={20} className="text-slate-500" />
              </div>
              <p className="text-2xl font-black mb-1">{empresa.plano}</p>
              <p className="text-xs text-slate-400">Próxima renovação: 12/05/2026</p>
            </div>
            <div className="mt-8">
               <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded text-[10px] font-black uppercase tracking-tighter transition-colors">
                 Gerir Assinatura
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}