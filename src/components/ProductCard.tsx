"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Producto } from "@/types";
import { useCotizacion } from "./CotizacionContext";

interface ProductCardProps {
  producto: Producto;
  variant?: "default" | "compact";
}

export function ProductCard({ producto, variant = "default" }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imagenAmpliada, setImagenAmpliada] = useState(false);
  const { openModal } = useCotizacion();

  // Cerrar imagen ampliada con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImagenAmpliada(false);
    };
    if (imagenAmpliada) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [imagenAmpliada]);

  if (variant === "compact") {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-4 group">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{producto.nombre}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{producto.medidas || producto.unidad}</p>
        </div>
        <button 
          onClick={() => openModal(producto)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-lg"
        >
          Cotizar
        </button>
      </div>
    );
  }

  const tieneImagenLocal = producto.imagen && producto.imagen.startsWith('/images/');
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 h-full flex flex-col group overflow-hidden relative card-premium">
      
      {/* Badge de nuevo producto */}
      {producto.nuevo && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
          NUEVO
        </div>
      )}

      {/* Imagen del producto con overlay en hover */}
      <div 
        className="h-52 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 flex-shrink-0 relative overflow-hidden"
      >
        {producto.imagen ? (
          <>
            <Image 
              src={producto.imagen} 
              alt={producto.nombre}
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay oscuro en hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Botón de zoom en hover */}
            <button 
              onClick={() => producto.imagen && setImagenAmpliada(true)}
              className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
            >
              <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
      </div>

      {/* Modal de imagen ampliada */}
      {imagenAmpliada && producto.imagen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setImagenAmpliada(false)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <div className="relative z-10 max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setImagenAmpliada(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-white text-center mt-6 text-xl font-medium">{producto.nombre}</p>
          </div>
        </div>
      )}

      {/* Contenido premium */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Nombre */}
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 leading-tight group-hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          {producto.nombre}
        </h3>

        {/* Descripción */}
        <div className="relative mb-4">
          <p className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
            {producto.descripcion}
          </p>
          {producto.descripcion.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold flex items-center gap-1 mt-2"
            >
              {expanded ? "Ver menos" : "Leer más"}
              <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Metadatos */}
        <div className="flex flex-wrap gap-2 mb-4">
          {producto.medidas && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="font-medium">{producto.medidas}</span>
            </div>
          )}
          {producto.unidad && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="font-medium">{producto.unidad}</span>
            </div>
          )}
        </div>

        {/* Aplicaciones Tags */}
        {producto.aplicaciones && producto.aplicaciones.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {producto.aplicaciones.slice(0, 2).map((app, i) => (
              <span key={i} className="text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 px-3 py-1.5 rounded-full">
                {app}
              </span>
            ))}
            {producto.aplicaciones.length > 2 && (
              <span className="text-xs text-slate-400 dark:text-slate-500">+{producto.aplicaciones.length - 2}</span>
            )}
          </div>
        )}

        {/* Botón premium */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={() => openModal(producto)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3.5 rounded-xl transition-all font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 flex items-center justify-center gap-2 group-hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Agregar a Cotización</span>
          </button>
        </div>
      </div>
    </div>
  );
}