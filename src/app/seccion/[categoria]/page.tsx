"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { productos, categorias } from "@/data/productos";
import { categorias as categoriasData } from "@/data/productos";
import { Producto } from "@/types";

export default function SeccionPage() {
  const params = useParams();
  const router = useRouter();
  const categoriaId = params.categoria as string;
  
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  
  // Buscar la categoría actual
  const categoria = useMemo(() => 
    categoriasData.find(c => c.id === categoriaId),
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
  
  const handleConsultar = (producto: Producto) => {
    setProductoSeleccionado(producto);
    // Scroll al formulario de contacto
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };
  
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
                  onConsultar={handleConsultar}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Sección de contacto */}
      {productoSeleccionado && (
        <section id="contacto" className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Consultar por: {productoSeleccionado.nombre}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tu nombre
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
                    placeholder="juan@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Teléfono
                  </label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
                    placeholder="11 1234 5678"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mensaje
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none resize-none"
                  placeholder={`Hola, me interesa el producto: ${productoSeleccionado.nombre}. Quedo atenta a tu respuesta.`}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Enviar Consulta
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
