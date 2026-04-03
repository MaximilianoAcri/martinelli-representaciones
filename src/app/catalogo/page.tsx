"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { productos, categorias } from "@/data/productos";

export default function CatalogoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [filtroEmpresa, setFiltroEmpresa] = useState<string | null>(null);

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
                  <div 
                    key={producto.id}
                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="relative h-36 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 text-xs font-medium rounded">
                          {producto.empresa}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-medium text-slate-400 dark:text-slate-500 text-center px-4">
                          {categorias.find(c => c.id === producto.categoria)?.nombre}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                        {producto.nombre}
                      </h3>

                      {producto.medidas && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                          {producto.medidas}
                        </p>
                      )}

                      {producto.material && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                          {Array.isArray(producto.material) ? producto.material[0] : producto.material}
                        </p>
                      )}

                      <div className="flex items-end justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <div>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{producto.unidad}</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">
                            ${producto.precio.toLocaleString("es-AR")}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-4 py-3 rounded-xl transition-colors font-medium text-sm"
                        >
                          Consultar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Sección de contacto */}
        <section id="contacto" className="py-16 bg-slate-50 dark:bg-slate-800 mt-12">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              Consultanos
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
              Escribinos y te respondemos a la brevedad
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://wa.me/541559929083"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escribinos por WhatsApp
              </a>
              <Link
                href="/contacto"
                className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}