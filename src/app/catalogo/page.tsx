"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { productos, categorias } from "@/data/productos";
import { useCotizacion } from "@/components/CotizacionContext";
import { WhatsAppButton } from "@/components/CotizacionButton";
import { Producto } from "@/types";

// Función para obtener imagen según el nombre base
function getImagenPorNombre(nombreBase: string): string {
  const lower = nombreBase.toLowerCase();
  
  if (lower.includes('metal desplegado')) {
    return '/images/productos/metal desplegado.jpg';
  }
  if (lower.includes('guardacanto') && !lower.includes('pvc')) {
    return '/images/productos/guardacantogalvanizado.webp_v=638907982415030000';
  }
  if (lower.includes('guardacanto') && (lower.includes('pvc') || lower.includes('cantonera'))) {
    return '/images/productos/cantonerapvc.jpg';
  }
  if (lower.includes('malla') && lower.includes('fibra')) {
    return '/images/productos/malla de fibra de vidrio.webp';
  }
  if (lower.includes('malla') && lower.includes('seguridad')) {
    return '/images/productos/malla de seguridad naranja.jpg';
  }
  if (lower.includes('malla')) {
    return '/images/productos/malla metalica.webp';
  }
  if (lower.includes('alambre') && lower.includes('tejido') && lower.includes('romboidal')) {
    return '/images/productos/alambre tejido romboidal.webp';
  }
  // Alambre Negro (todos los calibres)
  if ((lower.includes('alambre') && lower.includes('negro') && lower.includes('recocido')) || lower.includes('negro recocido')) {
    return '/images/productos/alambre Negro Recocido Fraccionado.webp';
  }
  if (lower.includes('alambre') && lower.includes('galvanizado')) {
    return '/images/productos/alambre galvanizado.jpg';
  }
  if ((lower.includes('alambre') && (lower.includes('san martin') || lower.includes('sanmartin'))) || lower.includes('san martin')) {
    return '/images/productos/alambre sanmartin.webp';
  }
  if ((lower.includes('alambre') && lower.includes('invencible')) || lower.includes('invencible')) {
    return '/images/productos/alambre invencible.jpg';
  }
  if (lower.includes('alambre') && (lower.includes('puas') || lower.includes('pua'))) {
    return '/images/productos/alambredepuas.webp';
  }
  if (lower.includes('flatwrap')) {
    return '/images/productos/flatwrap.jpeg';
  }
  if (lower.includes('concertina') && lower.includes('cruzada')) {
    return '/images/productos/concertina cruzada.webp';
  }
  if (lower.includes('concertina')) {
    return '/images/productos/concertina.jpg';
  }
  if (lower.includes('torniquete') && lower.includes('mini')) {
    return '/images/productos/torniquete mini.webp';
  }
  if (lower.includes('torniquete') && lower.includes('reforzado')) {
    return '/images/productos/torniquete doble reforzado.webp';
  }
  if (lower.includes('torniquete') && lower.includes('doble')) {
    return '/images/productos/Torniquete doble para mayor tensión. 500 kg por lado..jpg';
  }
  if (lower.includes('torniquete')) {
    return '/images/productos/torniquete.jpg';
  }
  if (lower.includes('tornillo') && lower.includes('mecha')) {
    return '/images/productos/Tornillo Autoperforante Punta Mecha.webp';
  }
  if (lower.includes('tornillo') && lower.includes('aguja')) {
    return '/images/productos/Tornillo autoperforante con punta aguja de 2.5 pulgadas..webp';
  }
  if (lower.includes('tornillo')) {
    return '/images/productos/clavos.webp';
  }
  if (lower.includes('clavo') && lower.includes('parís')) {
    return '/images/productos/Clavos Punta París.webp';
  }
  if (lower.includes('clavo') && lower.includes('espiral')) {
    return '/images/productos/clavos espiralados.webp';
  }
  if (lower.includes('clavo') && lower.includes('paragua')) {
    return '/images/productos/clavos paragua.webp';
  }
  if (lower.includes('clavo') && lower.includes('cabeza') && lower.includes('plomo')) {
    return '/images/productos/clavos cabeza de plomo.png';
  }
  if (lower.includes('clavo') && lower.includes('cabeza') && lower.includes('perdida')) {
    return '/images/productos/clavos cabeza perdida.webp';
  }
  if (lower.includes('clavo') && lower.includes('cobre')) {
    return '/images/productos/clavos cobre fraccionado.jpg';
  }
  if (lower.includes('clavo')) {
    return '/images/productos/clavos.webp';
  }
  if (lower.includes('hierro') && lower.includes('dulce')) {
    return '/images/productos/hierro dulce.webp';
  }
  if (lower.includes('media') && lower.includes('sombra')) {
    return '/images/productos/Media Sombra 80% Verde.webp';
  }
  if (lower.includes('rafia') && lower.includes('verde')) {
    return '/images/productos/Rafia Cubre Cerco 110gr Verde.jpg';
  }
  if (lower.includes('rafia')) {
    return '/images/productos/Rafia Cubre Cerco 110gr Verde.jpg';
  }
  if (lower.includes('chapa') && lower.includes('decorativa')) {
    return '/images/productos/malla metalica.webp';
  }
  return '/images/productos/metal desplegado.jpg';
}

// Función para obtener el nombre base
function getNombreBase(nombre: string) {
  return nombre
    .replace(/\s+(Calibre|Nº|Numero|Número)\s*\d+[\d\.]*/gi, '')
    .replace(/\s+(2\.5"|2"|3"|4"|5"|6"|1\.5"|1"|75gr|90gr|110gr)\s*$/gi, '')
    .replace(/\s+\d+[\d\.]*(mm|micrones|mts?|metros?)\s*$/gi, '')
    .trim();
}

// Componente para producto agrupado
function ProductoAgrupado({ grupo, onCotizar }: { grupo: { base: string; principal: Producto; variantes: Producto[]; total: number }; onCotizar: (p: Producto) => void }) {
  const [expandido, setExpandido] = useState(false);
  const [descripcionExpandida, setDescripcionExpandida] = useState(false);
  
  const tieneVariantes = grupo.variantes.length > 0;
  const descripcionLarga = grupo.principal.descripcion && grupo.principal.descripcion.length > 80;
  
  const imagenUrl = grupo.principal.imagen || getImagenPorNombre(grupo.base);
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 h-full flex flex-col group overflow-hidden">
      {/* Imagen */}
      <div className="h-48 sm:h-56 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 flex-shrink-0 relative overflow-hidden">
        <Image 
          src={imagenUrl} 
          alt={grupo.principal.nombre}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {tieneVariantes && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {grupo.total} modelos
          </div>
        )}
      </div>
      
      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight">
          {grupo.base}
        </h3>
        
        {/* Descripción */}
        {descripcionLarga ? (
          <div className="mb-3">
            <p className={`text-sm text-slate-500 dark:text-slate-400 ${descripcionExpandida ? '' : 'line-clamp-2'}`}>
              {grupo.principal.descripcion}
            </p>
            <button 
              onClick={() => setDescripcionExpandida(!descripcionExpandida)}
              className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1"
            >
              {descripcionExpandida ? 'Ver menos' : 'Ver más'}
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
            {grupo.principal.descripcion}
          </p>
        )}
        
        {/* Medidas */}
        <div className="text-base text-slate-700 dark:text-slate-300 font-medium mb-4">
          {grupo.principal.medidas}
        </div>
        
        {/* Toggle variantes */}
        {tieneVariantes && (
          <button
            onClick={() => setExpandido(!expandido)}
            className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-4 flex items-center gap-2"
          >
            {expandido ? '▼ Ocultar' : '▶ Ver'} {grupo.variantes.length} medidas
          </button>
        )}
      </div>
      
      {/* Variantes */}
      {expandido && tieneVariantes && (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-3 max-h-48 overflow-y-auto">
          {grupo.variantes.map((variante) => (
            <div key={variante.id} className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-slate-700 last:border-0">
              <span className="text-xs text-slate-600 dark:text-slate-300">{variante.medidas}</span>
              <button onClick={() => onCotizar(variante)} className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                Cotizar
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Botón */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={() => onCotizar(grupo.principal)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
        >
          Solicitar Cotización
        </button>
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [vista, setVista] = useState<"grid" | "lista">("grid");
  const { openModal } = useCotizacion();

  // Agrupar productos
  const productosAgrupados = useMemo(() => {
    let filtered = productos;
    
    if (categoriaSeleccionada) {
      filtered = filtered.filter(p => p.categoria === categoriaSeleccionada);
    }
    
    if (busqueda.trim()) {
      const term = busqueda.toLowerCase();
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term) ||
        p.aplicaciones?.some(a => a.toLowerCase().includes(term))
      );
    }
    
    // Agrupar por nombre base
    const grupos: { [key: string]: typeof productos } = {};
    filtered.forEach(p => {
      const base = getNombreBase(p.nombre);
      if (!grupos[base]) {
        grupos[base] = [];
      }
      grupos[base].push(p);
    });
    
    return Object.entries(grupos).map(([base, items]) => ({
      base,
      principal: items[0],
      variantes: items.slice(1),
      total: items.length
    })).sort((a, b) => a.base.localeCompare(b.base));
  }, [categoriaSeleccionada, busqueda]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors text-sm mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Catálogo Completo</h1>
          <p className="text-slate-300">
            Explorá nuestro catálogo de productos de primera calidad
          </p>
          
          {/* Buscador */}
          <div className="mt-6 relative max-w-md">
            <input
              type="text"
              placeholder="Buscar en todo el catálogo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none backdrop-blur-sm"
            />
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {busqueda && (
              <button onClick={() => setBusqueda("")} className="absolute right-3 top-3.5 text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filtros y resultados */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Categorías como filtros */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setCategoriaSeleccionada(null)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              categoriaSeleccionada === null 
                ? "bg-blue-600 text-white" 
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
            }`}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                categoriaSeleccionada === cat.id 
                  ? "bg-blue-600 text-white" 
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Toggle Vista */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
              <button
                onClick={() => setVista("grid")}
                className={`p-2 rounded-lg transition-all ${vista === "grid" ? "bg-white dark:bg-slate-600 shadow-sm" : "text-slate-400"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setVista("lista")}
                className={`p-2 rounded-lg transition-all ${vista === "lista" ? "bg-white dark:bg-slate-600 shadow-sm" : "text-slate-400"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              {productosAgrupados.length} productos
            </span>
          </div>
        </div>

        {/* Grid de productos */}
        {productosAgrupados.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-white mb-2">No hay productos</h3>
            <button onClick={() => { setCategoriaSeleccionada(null); setBusqueda(""); }} className="text-blue-600 hover:text-blue-700 font-medium">
              Ver todos los productos
            </button>
          </div>
        ) : vista === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {productosAgrupados.map((grupo) => (
              <div key={grupo.base} className="h-full">
                <ProductoAgrupado grupo={grupo} onCotizar={openModal} />
              </div>
            ))}
          </div>
        ) : (
          // Vista lista
          <div className="space-y-3">
            {productosAgrupados.map((grupo) => (
              <div key={grupo.base} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 dark:text-white">{grupo.base}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{grupo.principal.medidas}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {grupo.variantes.length > 0 && (
                      <span className="text-xs text-slate-400">{grupo.total} variantes</span>
                    )}
                    <button onClick={() => openModal(grupo.principal)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      Cotizar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-slate-800 mt-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            ¿Necesitás una cotización personalizada?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Contactanos y te enviamos la mejor propuesta para tu proyecto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton>Chatear con asesor</WhatsAppButton>
            <button
              onClick={() => openModal()}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Solicitar Presupuesto
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}