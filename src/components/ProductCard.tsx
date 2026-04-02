"use client";

import { useState } from "react";
import { Producto } from "@/types";
import Image from "next/image";

interface ProductCardProps {
  producto: Producto;
  onConsultar: (producto: Producto) => void;
}

export function ProductCard({ producto, onConsultar }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Generar link de WhatsApp
  const whatsappLink = `https://wa.me/541559929083?text=Hola! Me interesa el producto: ${encodeURIComponent(producto.nombre)} - ${producto.empresa}`;

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

        {/* Precio y botones */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500">{producto.unidad}</p>
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              ${producto.precio.toLocaleString("es-AR")}
            </p>
          </div>

          {/* Botón WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 p-3 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Consultar por WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
