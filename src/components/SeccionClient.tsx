"use client";

import { categorias } from "@/data/productos";
import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { productos } from "@/data/productos";
import { useCotizacion } from "@/components/CotizacionContext";
import { WhatsAppButton } from "@/components/CotizacionButton";

export function SeccionClient() {
  const params = useParams();
  const router = useRouter();
  const categoriaId = params.categoria as string;
  const { openModal } = useCotizacion();
  
  // Buscar la categoría actual
  const categoria = useMemo(() => 
    categorias.find(c => c.id === categoriaId),
    [categoriaId]
  );
  
  // Filtrar productos por categoría
  const productosCategoria = useMemo(() => 
    productos.filter(p => p.categoria === categoriaId),
    [categoriaId]
  );
  
  // Si no existe la categoría, redirigir
  if (!categoria) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Sección no encontrada</h1>
          <button 
            onClick={() => router.push("/")}
            className="text-blue-600 hover:underline"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Header de sección */}
      <section className="bg-slate-100 text-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => router.push("/")}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Volver
            </button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoria.nombre}</h1>
          <p className="text-slate-600 text-lg">
            {productosCategoria.length} productos disponibles
          </p>
        </div>
      </section>
      
      {/* Grid de productos */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {productosCategoria.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">No hay productos en esta categoría</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {productosCategoria.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-slate-600 mb-6">
            Consultanos y te ayudamos a encontrar el producto exacto para tu proyecto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton>
              Chatear con asesor
            </WhatsAppButton>
            <button
              onClick={() => openModal()}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Solicitar Cotización
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
