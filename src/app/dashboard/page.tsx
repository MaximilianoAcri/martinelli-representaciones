"use client";

import { useState, useEffect } from "react";

interface ProductoCotizado {
  id: string;
  nombre: string;
  unidad: string;
}

interface Cotizacion {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  empresa: string;
  productos: ProductoCotizado[];
  mensaje: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
}

type EstadoFiltro = "todas" | "nueva" | "contactada" | "completada" | "rechazada";

export default function DashboardPage() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<EstadoFiltro>("todas");
  const [error, setError] = useState<string | null>(null);

  // Cargar cotizaciones
  const cargarCotizaciones = async () => {
    try {
      const response = await fetch("/api/cotizaciones");
      if (!response.ok) throw new Error("Error al cargar");
      const data = await response.json();
      setCotizaciones(data.cotizaciones);
      setError(null);
    } catch (err) {
      setError("Error al cargar las cotizaciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCotizaciones();
  }, []);

  // Actualizar estado de cotización
  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    try {
      const response = await fetch(`/api/cotizaciones/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado: nuevoEstado }),
      });

      if (!response.ok) throw new Error('Error al actualizar');

      // Actualizar el estado local
      setCotizaciones(prev =>
        prev.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c)
      );
    } catch (err) {
      console.error('Error actualizando estado:', err);
      alert('Error al actualizar el estado');
    }
  };

  // Eliminar cotización
  const eliminarCotizacion = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta cotización?")) return;

    try {
      const response = await fetch(`/api/cotizaciones/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar');

      setCotizaciones(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error eliminando:', err);
      alert('Error al eliminar la cotización');
    }
  };

  // Filtrar cotizaciones
  const cotizacionesFiltradas = filtro === "todas"
    ? cotizaciones
    : cotizaciones.filter(c => c.estado === filtro);

  // Formatear fecha
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtener color según estado (modo oscuro - texto oscuro sobre fondo claro)
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'nueva': return 'bg-blue-900 text-blue-200 border-blue-700';
      case 'contactada': return 'bg-amber-900 text-amber-200 border-amber-700';
      case 'completada': return 'bg-green-900 text-green-200 border-green-700';
      case 'rechazada': return 'bg-red-900 text-red-200 border-red-700';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  // Obtener texto según estado
  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'nueva': return 'Nueva';
      case 'contactada': return 'Contactada';
      case 'completada': return 'Completada';
      case 'rechazada': return 'Rechazada';
      default: return estado;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Cargando cotizaciones...</p>
        </div>
      </div>
    );
  }

  // Stats
  const stats = {
    total: cotizaciones.length,
    nuevas: cotizaciones.filter(c => c.estado === 'nueva').length,
    contactadas: cotizaciones.filter(c => c.estado === 'contactada').length,
    completadas: cotizaciones.filter(c => c.estado === 'completada').length,
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón actualizar */}
        <div className="flex justify-end mb-4">
          <button
            onClick={cargarCotizaciones}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-sm text-slate-400">Total</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-sm text-slate-400">Nuevas</p>
            <p className="text-2xl font-bold text-blue-400">{stats.nuevas}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-sm text-slate-400">Contactadas</p>
            <p className="text-2xl font-bold text-amber-400">{stats.contactadas}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-sm text-slate-400">Completadas</p>
            <p className="text-2xl font-bold text-green-400">{stats.completadas}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['todas', 'nueva', 'contactada', 'completada', 'rechazada'] as EstadoFiltro[]).map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltro(estado)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtro === estado
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {estado === 'todas' ? 'Todas' : getEstadoTexto(estado)}
            </button>
          ))}
        </div>

        {/* Lista de cotizaciones */}
        {cotizacionesFiltradas.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
            <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-slate-200">No hay cotizaciones</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cotizacionesFiltradas.map((cotizacion) => (
              <div
                key={cotizacion.id}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-slate-300">
                        {cotizacion.nombre.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{cotizacion.nombre}</h3>
                      <p className="text-sm text-slate-400">{formatearFecha(cotizacion.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(cotizacion.estado)}`}>
                      {getEstadoTexto(cotizacion.estado)}
                    </span>
                    <select
                      value={cotizacion.estado}
                      onChange={(e) => actualizarEstado(cotizacion.id, e.target.value)}
                      className="text-sm border border-slate-600 rounded-lg px-2 py-1 bg-slate-700 text-slate-200"
                    >
                      <option value="nueva">Nueva</option>
                      <option value="contactada">Contactada</option>
                      <option value="completada">Completada</option>
                      <option value="rechazada">Rechazada</option>
                    </select>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Datos de contacto */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase">Contacto</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`https://wa.me/${cotizacion.telefono.replace(/\D/g, '')}`} className="text-blue-400 hover:underline">
                          {cotizacion.telefono}
                        </a>
                      </div>
                      {cotizacion.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-slate-300">{cotizacion.email}</span>
                        </div>
                      )}
                      {cotizacion.empresa && (
                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="text-slate-300">{cotizacion.empresa}</span>
                        </div>
                      )}
                    </div>

                    {/* Productos solicitados */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase">Productos</h4>
                      {cotizacion.productos && cotizacion.productos.length > 0 ? (
                        <ul className="text-sm space-y-1">
                          {cotizacion.productos.map((prod, idx) => (
                            <li key={idx} className="text-slate-300">
                              • {prod.nombre} <span className="text-slate-500">({prod.unidad})</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-500">Sin productos específicos</p>
                      )}
                      {cotizacion.mensaje && (
                        <div className="mt-2 pt-2 border-t border-slate-700">
                          <p className="text-xs text-slate-500">Mensaje:</p>
                          <p className="text-sm text-slate-300">{cotizacion.mensaje}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-4 py-3 bg-slate-800/50 flex justify-end gap-2 border-t border-slate-700">
                  <a
                    href={`https://wa.me/${cotizacion.telefono.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Contactar
                  </a>
                  <button
                    onClick={() => eliminarCotizacion(cotizacion.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}