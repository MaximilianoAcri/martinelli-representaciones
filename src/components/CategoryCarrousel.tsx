"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { categorias } from "@/data/productos";

export function CategoryCarrousel() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % categorias.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Catálogo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Nuestras Categorías
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mt-2 max-w-2xl mx-auto">
            Explorá todas nuestras categorías y encontrá los materiales que necesitás
          </p>
        </div>

        {/* Carrousel de categorías */}
        <div className="relative overflow-hidden mb-8">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${actual * 100}%)` }}
          >
            {categorias.map((categoria) => (
              <div key={categoria.id} className="w-full flex-shrink-0 px-2">
                <Link
                  href={`/seccion/${categoria.id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 block"
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image 
                      src={categoria.imagen} 
                      alt={categoria.nombre}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">{categoria.icono}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {categoria.nombre}
                    </h3>
                    
                    {categoria.subcategorias && (
                      <p className="text-slate-300 text-sm">
                        {categoria.subcategorias.length} tipos disponibles
                      </p>
                    )}
                    
                    <div className="mt-3 flex items-center text-white/80 font-medium text-sm group-hover:text-white">
                      <span>Explorar</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Botones de navegación */}
          <button
            onClick={() => setActual(actual === 0 ? categorias.length - 1 : actual - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-colors z-10"
          >
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActual((actual + 1) % categorias.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-colors z-10"
          >
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots de navegación */}
        <div className="flex justify-center gap-2 mb-8">
          {categorias.map((_, i) => (
            <button
              key={i}
              onClick={() => setActual(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                actual === i 
                  ? "bg-blue-500 w-8" 
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Ver catálogo completo */}
        <div className="text-center">
          <Link 
            href="/catalogo" 
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 hover:shadow-xl -translate-y-1 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
          >
            Ver Catálogo Completo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}