"use client";

import { useState } from "react";
import { Producto } from "@/types";
import { useCotizacion } from "./CotizacionContext";

export function ProductCard({ producto }: { producto: Producto }) {
  const [expanded, setExpanded] = useState(false);
  const { openModal } = useCotizacion();
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm dark:shadow-md overflow-hidden hover:shadow-md dark:hover:shadow-lg transition-shadow duration-300 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
      {/* Imagen con patrón sutil */}
      <div className="h-28 bg-slate-100 dark:bg-slate-700 flex items-center justify-center relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <span className="text-slate-400 dark:text-slate-500 text-3xl font-light">
          {producto.categoria.substring(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Empresa */}
        <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full mb-1 w-fit">
          {producto.empresa}
        </span>

        {/* Nombre */}
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2">
          {producto.nombre}
        </h3>

        {/* Descripción con expand */}
        <div className="relative">
          <p className={`text-slate-500 dark:text-slate-400 text-xs leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
            {producto.descripcion}
          </p>
          {producto.descripcion.length > 80 && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-slate-600 dark:text-slate-400 text-xs font-medium hover:text-slate-900 dark:hover:text-white underline mt-0.5"
            >
              {expanded ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>

        {/* Medidas si existen */}
        {producto.medidas && (
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
            {producto.medidas}
          </p>
        )}

        {/* Precio y botón Consultar */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500">{producto.unidad}</p>
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              ${producto.precio.toLocaleString("es-AR")}
            </p>
          </div>

          {/* Botón Solicitar Cotización */}
          <button
            onClick={() => openModal(producto)}
            className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-3 py-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center font-medium text-sm whitespace-nowrap"
            title="Solicitar Cotización"
          >
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
}
