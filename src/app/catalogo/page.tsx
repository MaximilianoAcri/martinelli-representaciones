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
  const { openModal } = useCotizacion();

  // Obtener empresas únicas
  const empresas = useMemo(() => {
    const unique = [...new Set(productos.map(p => p.empresa))];
    return unique.sort();
  }, []);

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    let filtered = productos;
    
    if (categoriaSeleccionada) {
      filtered = filtered.filter(p => p.categoria === categoriaSeleccionada);
    }
    
    if (filtroEmpresa) {
      filtered = filtered.filter(p => p.empresa === filtroEmpresa);
    }
    
    return filtered;
  }, [categoriaSeleccionada, filtroEmpresa]);

  const filtrosActivos = [categoriaSeleccionada, filtroEmpresa].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm mb-4 inline-flex items-center gap-2">
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Catálogo de Productos</h1>
          <p className="text-slate-300">
            {productos.length} productos de {empresas.length} marcas
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Botón toggle sidebar - Mobile/Tablet */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed bottom-6 left-6 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 font-medium"
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

          {/* Sidebar - Desktop y Tablet */}
          <aside className="hidden md:block w-56 lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Filtros</h2>
                {filtrosActivos > 0 && (
                  <button
                    onClick={() => {
                      setCategoriaSeleccionada(null);
                      setFiltroEmpresa(null);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* Filtro Categorías */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Categorías</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="categoria"
                      checked={categoriaSeleccionada === null}
                      onChange={() => setCategoriaSeleccionada(null)}
                      className="w-4 h-4 text-slate-900 accent-slate-900"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                      Todas las categorías
                    </span>
                    <span className="ml-auto text-xs text-slate-400">
                      ({productos.length})
                    </span>
                  </label>
                  {categorias.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="categoria"
                        checked={categoriaSeleccionada === cat.id}
                        onChange={() => setCategoriaSeleccionada(cat.id)}
                        className="w-4 h-4 text-slate-900 accent-slate-900"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                        {cat.nombre}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro Empresas */}
              <div>
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Marcas</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="empresa"
                      checked={filtroEmpresa === null}
                      onChange={() => setFiltroEmpresa(null)}
                      className="w-4 h-4 text-slate-900 accent-slate-900"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                      Todas las marcas
                    </span>
                  </label>
                  {empresas.map((emp) => (
                    <label key={emp} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="empresa"
                        checked={filtroEmpresa === emp}
                        onChange={() => setFiltroEmpresa(emp)}
                        className="w-4 h-4 text-slate-900 accent-slate-900"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                        {emp}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Sidebar Mobile - Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div 
                className="absolute inset-0 bg-black/50"
                onClick={() => setSidebarOpen(false)}
              ></div>
              <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-800 overflow-y-auto p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filtros</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2"
                  >
                    <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Filtro Categorías */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Categorías</h3>
                  <div className="space-y-3">
                    {categorias.map((cat) => {
                      const count = productos.filter(p => p.categoria === cat.id).length;
                      return (
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="categoria-mobile"
                            checked={categoriaSeleccionada === cat.id}
                            onChange={() => setCategoriaSeleccionada(cat.id)}
                            className="w-4 h-4 text-slate-900 accent-slate-900"
                          />
                          <span className="text-sm text-slate-600 dark:text-slate-400 flex-1">{cat.nombre}</span>
                          <span className="text-xs text-slate-400">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Filtro Empresas */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Marcas</h3>
                  <div className="space-y-3">
                    {empresas.map((emp) => (
                      <label key={emp} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="empresa-mobile"
                          checked={filtroEmpresa === emp}
                          onChange={() => setFiltroEmpresa(emp)}
                          className="w-4 h-4 text-slate-900 accent-slate-900"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{emp}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  {filtrosActivos > 0 && (
                    <button
                      onClick={() => {
                        setCategoriaSeleccionada(null);
                        setFiltroEmpresa(null);
                      }}
                      className="w-full py-3 text-slate-600 dark:text-slate-400 text-sm"
                    >
                      Limpiar filtros
                    </button>
                  )}
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-medium"
                  >
                    Ver {productosFiltrados.length} productos
                  </button>
                </div>
              </aside>
            </div>
          )}

          {/* Grid de productos */}
          <main className="flex-1">
            {/* Info */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {categoriaSeleccionada 
                    ? categorias.find(c => c.id === categoriaSeleccionada)?.nombre 
                    : filtroEmpresa 
                      ? filtroEmpresa
                      : "Todos los Productos"
                  }
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {productosFiltrados.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400">No hay productos con estos filtros</p>
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

        {/* CTA Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              ¿Necesitás una cotización?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Elegí la opción que te resulte más cómoda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton>
                Chatear con asesor
              </WhatsAppButton>
              <button
                onClick={() => openModal()}
                className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Solicitar Cotización
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
