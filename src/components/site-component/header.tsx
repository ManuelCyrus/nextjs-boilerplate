"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

// --- TIPAGENS ---
interface SubMenuItem {
  nome: string;
  href: string;
}

interface NavItem {
  nome: string;
  href: string;
  submenu?: SubMenuItem[];
}

export default function HeaderSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sobreOpen, setSobreOpen] = useState(false); // submenu mobile

  const navigation = useRouter();

  const itensNavegation: NavItem[] = [
    { nome: "Início", href: "/" },
    { nome: "Notícias", href: "/sinfa/noticias" },
    {
      nome: "Sobre",
      href: "/sinfa/sobre",
      submenu: [
        { nome: "História", href: "/sinfa/sobre/historia" },
        { nome: "Equipe", href: "/sinfa/sobre/equipe" },
      ],
    },
    { nome: "Contacto", href: "/sinfa/contacto" },
  ];

  return (
    <header className="w-full h-[100px] fixed bg-white sticky shadow-sm top-0 z-50 border-b border-gray-200">
      <nav className="w-[90%] h-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/LOGO1.png"
            alt="Logo SFINFA"
            width={120}
            height={120}
            className="w-30 object-cover"
            quality={100}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-20">
          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8 relative">
            {itensNavegation.map((item) => (
              <div key={item.nome} className="relative group">
                {/* Link principal */}
                <Link
                  href={item.href}
                  className="text-gray-600 uppercase font-bold hover:text-orange-400 transicao-suave flex items-center gap-2"
                >
                  {item.nome}
                </Link>

                {/* Submenu Desktop */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.nome}
                        href={sub.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                      >
                        {sub.nome}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Botão CTA Desktop */}
          <button
            onClick={() => navigation.push("/login")}
            className="bg-orange-500 p-2 rounded text-white px-4 hover:bg-orange-600 cursor-pointer"
          >
            Entrar
          </button>
        </div>

        {/* Botão Mobile */}
        <button
          className="md:hidden texto-primario"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menu Mobile */}
      {menuOpen && (
        <div
          className="md:hidden bg-cinza-light border-t"
          style={{
            backgroundColor: "var(--cor-cinza-50)",
            borderTopColor: "var(--cor-cinza-200)",
          }}
        >
          <div className="px-4 py-4 space-y-3">
            {itensNavegation.map((item) => (
              <div key={item.nome}>
                {/* Item normal */}
                {!item.submenu && (
                  <Link
                    href={item.href}
                    className="block texto-cinza font-medium py-2 hover:texto-primario transicao-suave"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.nome}
                  </Link>
                )}

                {/* Item com submenu */}
                {item.submenu && (
                  <div>
                    <button
                      className="flex justify-between w-full py-2 font-medium texto-cinza hover:texto-primario"
                      onClick={() => setSobreOpen(!sobreOpen)}
                    >
                      {item.nome}
                      <ChevronDown
                        className={`transition-transform ${
                          sobreOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {sobreOpen && (
                      <div className="pl-4 space-y-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.nome}
                            href={sub.href}
                            className="block py-1 texto-cinza hover:texto-primario text-sm"
                            onClick={() => setMenuOpen(false)}
                          >
                            {sub.nome}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => navigation.push("/login")}
              className="w-full btn-secundario mt-4 cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
