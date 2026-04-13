"use client";

import { categorias } from "@/data/productos";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { productos } from "@/data/productos";
import { useCotizacion } from "@/components/CotizacionContext";
import { WhatsAppButton } from "@/components/CotizacionButton";

export function SeccionClient() {
  const params = useParams();
  const router = useRouter();
  const categoriaId = params.categoria as string;
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [ordenarPor, setOrdenarPor] = useState<
    "nombre" | "precio-asc" | "precio-desc"
  >("nombre");
  const { openModal } = useCotizacion();
  
  const categoria = useMemo(() => 
    categorias.find(c => c.id === categoriaId),
    [categoriaId]
  );

  // Obtener subcategorías únicas de los productos de esta categoría
  const subcategoriasConProductos = useMemo(() => {
    if (!categoria) return [];
    const productosCategoria = productos.filter(p => p.categoria === categoriaId);
    const subcats = [...new Set(productosCategoria.map(p => p.subcategoria).filter(Boolean))];
    return subcats.map(subId => {
      const sub = categoria.subcategorias?.find(s => s.id === subId);
      const count = productosCategoria.filter(p => p.subcategoria === subId).length;
      return { ...sub, count };
    }).filter(s => s.id);
  }, [categoriaId, categoria]);

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    let filtered = productos.filter(p => p.categoria === categoriaId);
    
    if (subcategoriaSeleccionada) {
      filtered = filtered.filter(p => p.subcategoria === subcategoriaSeleccionada);
    }
    
    if (busqueda.trim()) {
      const term = busqueda.toLowerCase();
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term) ||
        p.aplicaciones?.some(a => a.toLowerCase().includes(term))
      );
    }
    
    // Ordenar
    if (ordenarPor === "nombre") {
      filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (ordenarPor === "precio-asc") {
      filtered.sort((a, b) => a.precio - b.precio);
    } else if (ordenarPor === "precio-desc") {
      filtered.sort((a, b) => b.precio - a.precio);
    }
    
    return filtered;
  }, [categoriaId, subcategoriaSeleccionada, busqueda, ordenarPor]);

  // Contador de productos por subcategoría
  const getCount = (subId: string | null) => {
    if (!subId) return productos.filter(p => p.categoria === categoriaId).length;
    return productos.filter(p => p.categoria === categoriaId && p.subcategoria === subId).length;
  };

  if (!categoria) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Sección no encontrada</h1>
          <button 
            onClick={() => router.push("/")}
            className="text-blue-600 hover:underline font-medium"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Hero premium con efectos visuales */}
      <section className="relative h-[400px] md:h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={categoria.imagen} 
            alt={categoria.nombre}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Overlay con gradiente mejorado */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/70 to-slate-900/20"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <button 
              onClick={() => router.push("/")}
              className="group text-slate-300 hover:text-white transition-colors flex items-center gap-2 mb-6"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Volver al inicio</span>
            </button>
            
            {/* Badge de categoría */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-2xl mb-6">
              <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {categoria.icono}
              </span>
              <span className="text-white font-semibold text-lg">{categoria.nombre}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {categoria.nombre}
            </h1>
            
            {categoria.descripcion && (
              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                {categoria.descripcion}
              </p>
            )}
            
            {categoria.aplicaciones && (
              <div className="flex flex-wrap gap-2">
                {categoria.aplicaciones.slice(0, 5).map((app, i) => (
                  <span 
                    key={i}
                    className="bg-white/10 backdrop-blur-sm text-slate-200 text-sm px-4 py-2 rounded-full font-medium border border-white/10"
                  >
                    {app}
                  </span>
                ))}
                {categoria.aplicaciones.length > 5 && (
                  <span className="text-slate-400 text-sm px-3 py-2">
                    +{categoria.aplicaciones.length - 5} más
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Barra de búsqueda premium */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-16 md:top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full md:w-[400px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
              {busqueda ? (
                <button 
                  onClick={() => setBusqueda("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : null}
            </div>

            {/* Ordenar y resultado count */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-4 py-2 rounded-xl">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <select
                  value={ordenarPor}
                  onChange={(e) =>
                    setOrdenarPor(
                      e.target.value as "nombre" | "precio-asc" | "precio-desc"
                    )
                  }
                  className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
                >
                  <option value="nombre">Nombre A-Z</option>
                  <option value="precio-asc">Menor Precio</option>
                  <option value="precio-desc">Mayor Precio</option>
                </select>
              </div>
              
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {productosFiltrados.length} productos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategorías como tabs premium */}
      {subcategoriasConProductos.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Scroll container con gradientes en los bordes */}
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mask-fade">
                {/* Botón "Todos" */}
                <button
                  onClick={() => setSubcategoriaSeleccionada(null)}
                  className={`group flex-shrink-0 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    subcategoriaSeleccionada === null 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <svg className={`w-5 h-5 ${subcategoriaSeleccionada === null ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>Todos</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${subcategoriaSeleccionada === null ? 'bg-blue-500/30 text-blue-100' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                    {getCount(null)}
                  </span>
                </button>
                
                {subcategoriasConProductos.map((sub: any) => {
                  const isActive = subcategoriaSeleccionada === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSubcategoriaSeleccionada(isActive ? null : sub.id)}
                      className={`group flex-shrink-0 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                        isActive 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <span>{sub.nombre}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-500/30 text-blue-100' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                        {sub.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Resultados con header mejorado */}
      <section className="py-10 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                {subcategoriaSeleccionada 
                  ? categoria.subcategorias?.find(s => s.id === subcategoriaSeleccionada)?.nombre || subcategoriaSeleccionada
                  : busqueda 
                    ? `Resultados para "${busqueda}"`
                    : "Catálogo de productos"
                }
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Filtros activos como pills */}
            {(subcategoriaSeleccionada || busqueda) && (
              <div className="flex flex-wrap gap-2">
                {busqueda && (
                  <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    "{busqueda}"
                    <button onClick={() => setBusqueda("")} className="hover:text-blue-900 ml-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {subcategoriaSeleccionada && (
                  <span className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-800">
                    {categoria.subcategorias?.find(s => s.id === subcategoriaSeleccionada)?.nombre}
                    <button onClick={() => setSubcategoriaSeleccionada(null)} className="hover:text-purple-900 ml-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {productosFiltrados.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No se encontraron productos</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Probá con otros términos de búsqueda</p>
              <button
                onClick={() => {
                  setBusqueda("");
                  setSubcategoriaSeleccionada(null);
                }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productosFiltrados.map((producto, index) => (
                <div 
                  key={producto.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard producto={producto} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA premium con efectos */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white font-medium">Asesoría personalizada disponible</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Necesitás ayuda para elegir?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Nuestro equipo técnico te asesora sin costo para que encontrés exactamente lo que necesitás para tu proyecto.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton variant="green" size="lg">
              Chatear con un asesor
            </WhatsAppButton>
            <button
              onClick={() => openModal()}
              className="group bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              Solicitar Presupuesto
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}