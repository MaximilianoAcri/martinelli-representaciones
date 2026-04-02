"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categorias } from "@/data/productos";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 sticky top-0 z-50 shadow-sm dark:shadow-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image 
                src="/m.png" 
                alt="Martinelli Representaciones" 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold hidden sm:block">Martinelli Representaciones</span>
          </Link>

          {/* Links principales - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Inicio
            </Link>
            
            {/* Dropdown de secciones */}
            <div className="relative group">
              <button className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center gap-1 font-medium">
                Productos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-left">
                <div className="py-2">
                  <Link
                    href="/catalogo"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium text-slate-700 dark:text-slate-200"
                  >
                    <span className="w-7 h-7 bg-slate-900 dark:bg-white rounded flex items-center justify-center text-xs font-bold text-white dark:text-slate-900">CA</span>
                    <span>Ver todo el catálogo</span>
                  </Link>
                  <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                  {categorias.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/seccion/${cat.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span>{cat.nombre}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/nosotros" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium">
              Nosotros
            </Link>

            <Link href="/faq" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium">
              FAQ
            </Link>

            <Link href="/contacto" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium">
              Contacto
            </Link>
          </div>

          {/* Botón CTA y Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/contacto" 
              className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Consultar
            </Link>
          </div>

          {/* Botón Hamburguesa - Mobile */}
          <button 
            className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú Mobile */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="space-y-3">
              <Link 
                href="/" 
                className="block py-2 hover:text-slate-600 dark:hover:text-slate-300"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
              
              {/* Productos con submenú */}
              <div>
                <button 
                  className="flex items-center justify-between w-full py-2 hover:text-slate-600 dark:hover:text-slate-300"
                  onClick={() => setProductsOpen(!productsOpen)}
                >
                  <span>Productos</span>
                  <svg className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {productsOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    <Link
                      href="/catalogo"
                      className="block py-2 text-slate-600 dark:text-slate-400"
                      onClick={() => setMenuOpen(false)}
                    >
                      Ver todo el catálogo
                    </Link>
                    {categorias.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/seccion/${cat.id}`}
                        className="block py-2 text-slate-600 dark:text-slate-400"
                        onClick={() => setMenuOpen(false)}
                      >
                        {cat.nombre}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href="/nosotros" 
                className="block py-2 hover:text-slate-600 dark:hover:text-slate-300"
                onClick={() => setMenuOpen(false)}
              >
                Nosotros
              </Link>

              <Link 
                href="/faq" 
                className="block py-2 hover:text-slate-600 dark:hover:text-slate-300"
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </Link>

              <Link 
                href="/contacto" 
                className="block py-2 hover:text-slate-600 dark:hover:text-slate-300"
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </Link>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <ThemeToggle />
                <Link 
                  href="/contacto" 
                  className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Consultar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}