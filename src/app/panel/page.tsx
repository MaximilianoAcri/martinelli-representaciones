"use client";

import { useState, useMemo } from "react";
import { productos, empresas, categorias } from "@/data/productos";
import { Producto, Empresa, Categoria } from "@/types";

export default function PanelPage() {
  const [filtroEmpresa, setFiltroEmpresa] = useState<Empresa | "">("");
  const [filtroCategoria, setFiltroCategoria] = useState<Categoria | "">("");
  const [busqueda, setBusqueda] = useState("");
  
  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      const coincideEmpresa = !filtroEmpresa || p.empresa === filtroEmpresa;
      const coincideCategoria = !filtroCategoria || p.categoria === filtroCategoria;
      const coincideBusqueda = !busqueda || 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
      
      return coincideEmpresa && coincideCategoria && coincideBusqueda;
    });
  }, [filtroEmpresa, filtroCategoria, busqueda]);
  
  // Agrupar por empresa para mostrar en el panel interno
  const productosPorEmpresa = useMemo(() => {
    const grouped: Record<string, Producto[]> = {};
    empresas.forEach(emp => {
      grouped[emp] = productosFiltrados.filter(p => p.empresa === emp);
    });
    return grouped;
  }, [productosFiltrados]);
  
  // Función para mostrar a qué empresa pedir
  const getEmpresaHint = (empresa: string) => {
    const hints: Record<string, string> = {
      "Metalpar": "Llamar a Metalpar",
      "Sinko": "Llamar a Sinko", 
      "Acerbrag": "Llamar a Acerbrag",
      "Mallas Gab": "Llamar a Mallas Gab",
      "Griferia Argentina": "Llamar a Grifería Argentina",
      "TEFA": "Llamar a TEFA"
    };
    return hints[empresa] || empresa;
  };
  
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Panel de Administración</h1>
              <p className="text-slate-400">Gestión interna de productos y pedidos</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Total productos</p>
              <p className="text-2xl font-bold">{productosFiltrados.length}</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Filtros */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            {/* Filtro Empresa */}
            <select
              value={filtroEmpresa}
              onChange={(e) => setFiltroEmpresa(e.target.value as Empresa | "")}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="">Todas las empresas</option>
              {empresas.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
            
            {/* Filtro Categoría */}
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value as Categoria | "")}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filtroEmpresa ? (
          // Vista de una sola empresa
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{filtroEmpresa}</h2>
                  <p className="text-slate-600">{productosFiltrados.length} productos</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                    {getEmpresaHint(filtroEmpresa)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productosFiltrados.map(producto => (
                <div key={producto.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-800">{producto.nombre}</h3>
                    <span className="text-lg font-bold text-blue-600">
                      ${producto.precio.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{producto.descripcion}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{producto.unidad}</span>
                    <span className="px-2 py-1 bg-slate-100 rounded text-slate-600">
                      {producto.categoria}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Vista grouped por empresa
          <div className="space-y-8">
            {empresas.map(empresa => {
              const prods = productosPorEmpresa[empresa].filter(p => {
                const coincideCategoria = !filtroCategoria || p.categoria === filtroCategoria;
                const coincideBusqueda = !busqueda || 
                  p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                  p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
                return coincideCategoria && coincideBusqueda;
              });
              
              if (prods.length === 0) return null;
              
              return (
                <div key={empresa} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold">{empresa}</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-400">{prods.length} productos</span>
                      <span className="px-3 py-1 bg-green-600 rounded-lg text-sm font-medium">
                        Pedir a {empresa}
                      </span>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Producto</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Descripción</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Medidas</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Precio</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Categoría</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {prods.map(producto => (
                          <tr key={producto.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-800">{producto.nombre}</td>
                            <td className="px-6 py-4 text-slate-600 text-sm">{producto.descripcion}</td>
                            <td className="px-6 py-4 text-slate-600 text-sm">{producto.medidas || "-"}</td>
                            <td className="px-6 py-4 font-semibold text-blue-600">
                              ${producto.precio.toLocaleString("es-AR")}
                            </td>
                            <td className="px-6 py-4 text-slate-600 text-sm">
                              {producto.categoria}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
