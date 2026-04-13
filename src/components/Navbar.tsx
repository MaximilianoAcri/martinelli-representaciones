"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { categorias } from "@/data/productos";
import { ThemeToggle } from "./ThemeToggle";
import { useCotizacion } from "./CotizacionContext";
import { useAuth } from "./AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { openModal, items } = useCotizacion();
  const { user, loading: authLoading, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Reset imgError cuando cambia el usuario
  useEffect(() => {
    setImgError(false);
  }, [user?.uid]);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú de usuario al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Classes based on scroll state and if it's homepage
  const linkClass = scrolled || !isHome
    ? "text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300"
    : "text-white hover:text-white/70";
  const buttonClass = scrolled || !isHome
    ? "bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900"
    : "bg-white/20 hover:bg-white/30 border border-white/30 text-white";

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || !isHome
        ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md dark:shadow-md border-b border-slate-200 dark:border-slate-800"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/m.png"
                alt="Martinelli Representaciones"
                fill
                className={`object-contain ${scrolled || !isHome ? "" : "brightness-0 invert"}`}
              />
            </div>
            <span className={`text-xl font-bold hidden sm:block ${scrolled || !isHome ? "text-slate-900 dark:text-white" : "text-white"}`}>Martinelli Representaciones</span>
          </Link>

          {/* Links principales - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`transition-colors ${linkClass}`}>
              Inicio
            </Link>

            {/* Dropdown de secciones */}
            <div className="relative group">
              <button className={`transition-colors flex items-center gap-1 font-medium ${linkClass}`}>
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
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
                    >
                      <span>{cat.nombre}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/nosotros" className={`transition-colors font-medium ${linkClass}`}>
              Nosotros
            </Link>

            <Link href="/faq" className={`transition-colors font-medium ${linkClass}`}>
              FAQ
            </Link>

            <Link href="/contacto" className={`transition-colors font-medium ${linkClass}`}>
              Contacto
            </Link>
          </div>

          {/* Botón CTA, Auth y Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className={scrolled || !isHome ? "" : "invert"}>
              <ThemeToggle />
            </div>

            {/* Auth section */}
            {!authLoading && (
              user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                      scrolled || !isHome
                        ? "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                        : "hover:bg-white/10 text-white"
                    }`}
                  >
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "Usuario"}
                        className="w-8 h-8 rounded-full object-cover"
                        onLoad={(e) => {
                          if ((e.target as HTMLImageElement).naturalWidth === 0) {
                            setImgError(true);
                          }
                        }}
                        onError={() => setImgError(true)}
                        style={{ display: imgError ? 'none' : 'block' }}
                      />
                    ) : null}
                    {(imgError || !user.photoURL) && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="hidden lg:block text-sm max-w-[100px] truncate">
                      {user.displayName?.split(" ")[0] || "Mi cuenta"}
                    </span>
                    <svg className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.displayName || "Cliente"}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/mi-cuenta"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 text-sm"
                        >
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Mis Pedidos
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400 text-sm w-full"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    scrolled || !isHome
                      ? "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      : "border border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Ingresar
                </Link>
              )
            )}

            <button
              onClick={() => openModal()}
              className={`relative px-4 py-2 rounded-lg font-medium transition-colors ${buttonClass}`}
            >
              <svg className="w-5 h-5 mr-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Presupuesto
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>

          {/* Botón Hamburguesa - Mobile */}
          <button
            className={`md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center ${scrolled || !isHome ? "text-slate-900 dark:text-white" : "text-white"}`}
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

              <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <button
                    onClick={() => {
                      openModal();
                      setMenuOpen(false);
                    }}
                    className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cotizar
                  </button>
                </div>

                {/* Auth mobile */}
                {!authLoading && (
                  user ? (
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        {user.photoURL ? (
                          <img 
                            src={user.photoURL} 
                            alt={user.displayName || "Usuario"}
                            className="w-8 h-8 rounded-full object-cover"
                            onLoad={(e) => {
                              if ((e.target as HTMLImageElement).naturalWidth === 0) {
                                setImgError(true);
                              }
                            }}
                            onError={() => setImgError(true)}
                            style={{ display: imgError ? 'none' : 'block' }}
                          />
                        ) : null}
                        {(imgError || !user.photoURL) && (
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.displayName?.split(" ")[0] || "Cliente"}</p>
                          <Link href="/mi-cuenta" onClick={() => setMenuOpen(false)} className="text-xs text-blue-600 dark:text-blue-400">
                            Mis Pedidos →
                          </Link>
                        </div>
                      </div>
                      <button
                        onClick={() => { handleLogout(); setMenuOpen(false); }}
                        className="text-xs text-red-500 hover:text-red-600 font-medium"
                      >
                        Salir
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-lg font-medium text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Ingresar / Registrarse
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
