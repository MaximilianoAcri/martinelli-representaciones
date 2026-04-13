"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { productos, categorias } from "@/data/productos";
import { ProductCard } from "@/components/ProductCard";
import { useCotizacion } from "@/components/CotizacionContext";
import { WhatsAppButton } from "@/components/CotizacionButton";

export default function CatalogoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [filtroEmpresa, setFiltroEmpresa] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [ordenarPor, setOrdenarPor] = useState<"nombre" | "nombre-desc">("nombre");
  const { openModal } = useCotizacion();

  const empresas = useMemo(() => {
    const unique = [...new Set(productos.map(p => p.empresa))];
    return unique.sort();
  }, []);

  const productosFiltrados = useMemo(() => {
    let filtered = productos;
    
    if (categoriaSeleccionada) {
      filtered = filtered.filter(p => p.categoria === categoriaSeleccionada);
    }
    
    if (filtroEmpresa) {
      filtered = filtered.filter(p => p.empresa === filtroEmpresa);
    }

    if (busqueda.trim()) {
      const term = busqueda.toLowerCase();
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term) ||
        p.empresa.toLowerCase().includes(term)
      );
    }
    
    // Ordenar
    if (ordenarPor === "nombre") {
      filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (ordenarPor === "nombre-desc") {
      filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
    
    return filtered;
  }, [categoriaSeleccionada, filtroEmpresa, busqueda, ordenarPor]);

  const filtrosActivos = [categoriaSeleccionada, filtroEmpresa, busqueda].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header mejorado */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors text-sm mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Catálogo Completo</h1>
          <p className="text-slate-300">
            Explorá nuestro catálogo de {productos.length} productos de primera calidad
          </p>
          
          {/* Buscador rápido */}
          <div className="mt-6 relative max-w-md">
            <input
              type="text"
              placeholder="Buscar en todo el catálogo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none backdrop-blur-sm"
            />
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {busqueda && (
              <button 
                onClick={() => setBusqueda("")}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Toggle filtros - Mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtros
            {filtrosActivos > 0 && (
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                {filtrosActivos}
              </span>
            )}
          </button>

          {/* Sidebar */}
          <aside className="hidden md:block w-56 lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Filtros</h2>
                {filtrosActivos > 0 && (
                  <button
                    onClick={() => {
                      setCategoriaSeleccionada(null);
                      setFiltroEmpresa(null);
                      setBusqueda("");
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Limpiar todo
                  </button>
                )}
              </div>

              {/* Filtro Categorías */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-wider mb-3">Categorías</h3>
                <div className="space-y-1">
                  <label className="flex items-center gap-3 cursor-pointer group py-1">
                    <input
                      type="radio"
                      name="categoria"
                      checked={categoriaSeleccionada === null}
                      onChange={() => setCategoriaSeleccionada(null)}
                      className="w-4 h-4 text-blue-600 accent-blue-600"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 dark:text-white">
                      Todas
                    </span>
                    <span className="ml-auto text-xs text-slate-400 dark:text-slate-300">
                      ({productos.length})
                    </span>
                  </label>
                  {categorias.map((cat) => {
                    const count = productos.filter(p => p.categoria === cat.id).length;
                    return (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group py-1">
                        <input
                          type="radio"
                          name="categoria"
                          checked={categoriaSeleccionada === cat.id}
                          onChange={() => setCategoriaSeleccionada(cat.id)}
                          className="w-4 h-4 text-blue-600 accent-blue-600"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 dark:text-white truncate">
                          {cat.nombre}
                        </span>
                        <span className="ml-auto text-xs text-slate-400 dark:text-slate-300">
                          ({count})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Ordenar por nombre */}
              <div>
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-wider mb-3">Ordenar por</h3>
                <select
                  value={ordenarPor}
                  onChange={(e) => setOrdenarPor(e.target.value as any)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="nombre">Nombre (A-Z)</option>
                  <option value="nombre-desc">Nombre (Z-A)</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Sidebar Mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              ></div>
              <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white overflow-y-auto p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filtros</h2>
                  <button onClick={() => setSidebarOpen(false)} className="p-2">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-wider mb-3">Categorías</h3>
                    <div className="space-y-2">
                      {categorias.map((cat) => {
                        const count = productos.filter(p => p.categoria === cat.id).length;
                        return (
                          <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="categoria-mobile"
                              checked={categoriaSeleccionada === cat.id}
                              onChange={() => setCategoriaSeleccionada(cat.id)}
                              className="w-4 h-4 text-blue-600 accent-blue-600"
                            />
                            <span className="text-sm text-slate-600 flex-1">{cat.nombre}</span>
                            <span className="text-xs text-slate-400">({count})</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {filtrosActivos > 0 && (
                    <button
                      onClick={() => {
                        setCategoriaSeleccionada(null);
                        setFiltroEmpresa(null);
                        setBusqueda("");
                      }}
                      className="w-full py-3 text-center text-blue-600 font-medium"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium mt-6"
                >
                  Ver {productosFiltrados.length} productos
                </button>
              </aside>
            </div>
          )}

          {/* Grid de productos */}
          <main className="flex-1">
            {/* Header resultados */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {busqueda 
                    ? `Resultados para "${busqueda}"` 
                    : categoriaSeleccionada 
                      ? categorias.find(c => c.id === categoriaSeleccionada)?.nombre 
                      : filtroEmpresa 
                        ? filtroEmpresa
                        : "Todos los Productos"
                  }
                </h2>
                <p className="text-slate-500 dark:text-slate-300 mt-1">
                  {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Tags de filtros activos */}
            {(categoriaSeleccionada || busqueda) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categoriaSeleccionada && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                    {categorias.find(c => c.id === categoriaSeleccionada)?.nombre}
                    <button onClick={() => setCategoriaSeleccionada(null)} className="hover:text-blue-900 ml-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {busqueda && (
                  <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm">
                    "{busqueda}"
                    <button onClick={() => setBusqueda("")} className="hover:text-purple-900 ml-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}

            {productosFiltrados.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No hay productos</h3>
                <p className="text-slate-500 dark:text-slate-300 mb-4">Probá con otros filtros</p>
                <button
                  onClick={() => {
                    setCategoriaSeleccionada(null);
                    setFiltroEmpresa(null);
                    setBusqueda("");
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver todos los productos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {productosFiltrados.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* CTA */}
        <section className="py-16 bg-white mt-12 rounded-2xl border border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              ¿Necesitás una cotización personalizada?
            </h2>
            <p className="text-slate-600 mb-6">
              Contactanos y te enviamos la mejor propuesta para tu proyecto
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton>
                Chatear con asesor
              </WhatsAppButton>
              <button
                onClick={() => openModal()}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Solicitar Presupuesto
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}