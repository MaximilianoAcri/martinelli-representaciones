"use client";

import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";

interface Prospecto {
  id: string;
  nombre: string;
  zona: string;
  telefono: string;
  telefonoLimpio: string;
  direccion: string;
  googleMaps: string;
  provincia: string;
  tipo: string; // corralón, ferretería, otro
  estado: string;
  notas: string;
  createdAt: string;
}

type EstadoFiltro = "todos" | "nuevo" | "contactado" | "no-contactado" | "cliente";
type TipoFiltro = "todos" | "corralón" | "ferretería" | "otro";

const PROVINCIAS = [
  "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Entre Ríos",
  "Misiones", "Chaco", "Formosa", "Santiago del Estero", "San Luis",
  "La Pampa", "Neuquén", "Río Negro", "Chubut", "Santa Cruz"
];

export default function ProspectosPage() {
  const [prospectos, setProspectos] = useState<Prospecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<EstadoFiltro>("todos");
  const [filtroProvincia, setFiltroProvincia] = useState<string>("todas");
  const [filtroTipo, setFiltroTipo] = useState<TipoFiltro>("todos");
  const [busqueda, setBusqueda] = useState("");
  const [importando, setImportando] = useState(false);
  const [progreso, setProgreso] = useState({ actual: 0, total: 0, hoja: "" });
  const [error, setError] = useState<string | null>(null);
  
  // Selección múltiple
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set());
  const [seleccionTodos, setSeleccionTodos] = useState(false);
  
  // Vista de detalles
  const [prospectoDetalle, setProspectoDetalle] = useState<Prospecto | null>(null);
  
  // Importación
  const [sheetsDisponibles, setSheetsDisponibles] = useState<string[]>([]);
  const [sheetSeleccionada, setSheetSeleccionada] = useState<string>("todas");
  const [excelCargado, setExcelCargado] = useState(false);
  
  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const TAMANO_PAGINA = 20;
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workbookRef = useRef<any>(null);

  // Cargar prospectos
  const cargarProspectos = async () => {
    try {
      const response = await fetch("/api/prospectos");
      if (!response.ok) throw new Error("Error al cargar");
      const data = await response.json();
      setProspectos(data.prospectos);
      setError(null);
    } catch (err) {
      setError("Error al cargar los prospectos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProspectos();
  }, []);

  // Obtener provincias únicas de los prospectos
  const provinciasUnicas = [...new Set(prospectos.map(p => p.provincia).filter(Boolean))].sort((a, b) => a.localeCompare(b));

  // Cargar Excel y mostrar hojas disponibles
  const handleCargarExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      workbookRef.current = workbook;
      
      // Obtener todas las sheets (excepto RESUMEN)
      const sheets = workbook.SheetNames.filter(s => s !== 'RESUMEN');
      setSheetsDisponibles(sheets);
      setSheetSeleccionada("todas");
      setExcelCargado(true);
    } catch (err) {
      console.error(err);
      setError('Error al leer el archivo');
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Importar las hojas seleccionadas
  const handleImportar = async () => {
    if (!workbookRef.current) return;

    setImportando(true);
    setError(null);
    setProgreso({ actual: 0, total: 0, hoja: "" });

    const workbook = workbookRef.current;
    let sheetsAImportar: string[] = [];

    if (sheetSeleccionada === "todas") {
      sheetsAImportar = workbook.SheetNames.filter((s: string) => s !== 'RESUMEN');
    } else {
      sheetsAImportar = [sheetSeleccionada];
    }

    let totalImportados = 0;
    let totalDuplicados = 0;

    setProgreso({ actual: 0, total: sheetsAImportar.length, hoja: "Preparando..." });

    for (let i = 0; i < sheetsAImportar.length; i++) {
      const sheetName = sheetsAImportar[i];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setProgreso({ actual: i + 1, total: sheetsAImportar.length, hoja: sheetName });

      const response = await fetch("/api/prospectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospectos: jsonData,
          provincia: sheetName,
        }),
      });

      const result = await response.json();
      const match = result.message?.match(/(\d+) importados/);
      if (match) totalImportados += parseInt(match[1]);
      const dupMatch = result.message?.match(/(\d+) duplicados/);
      if (dupMatch) totalDuplicados += parseInt(dupMatch[1]);

      // Recargar después de cada hoja
      const res = await fetch("/api/prospectos");
      const data = await res.json();
      setProspectos(data.prospectos);
    }

    setProgreso({ actual: sheetsAImportar.length, total: sheetsAImportar.length, hoja: "Completado!" });
    alert(`Importación completada: ${totalImportados} nuevos, ${totalDuplicados} duplicados`);
    
    // Limpiar
    setExcelCargado(false);
    setSheetsDisponibles([]);
    workbookRef.current = null;
    
    cargarProspectos();
    
    setTimeout(() => {
      setImportando(false);
      setProgreso({ actual: 0, total: 0, hoja: "" });
    }, 2000);
  };

  // Actualizar estado
  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    try {
      await fetch(`/api/prospectos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      setProspectos(prev =>
        prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p)
      );
    } catch (err) {
      console.error('Error actualizando:', err);
      alert('Error al actualizar');
    }
  };

  // Actualizar notas
  const actualizarNotas = async (id: string, notas: string) => {
    try {
      await fetch(`/api/prospectos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notas }),
      });

      setProspectos(prev =>
        prev.map(p => p.id === id ? { ...p, notas } : p)
      );
    } catch (err) {
      console.error('Error actualizando notas:', err);
    }
  };

  // Eliminar prospecto
  const eliminarProspecto = async (id: string) => {
    if (!confirm('¿Eliminar este prospecto?')) return;

    try {
      await fetch(`/api/prospectos/${id}?id=${id}`, { method: 'DELETE' });
      setProspectos(prev => prev.filter(p => p.id !== id));
      setSeleccionados(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (err) {
      console.error('Error eliminando:', err);
    }
  };

  // Eliminar seleccionados
  const eliminarSeleccionados = async () => {
    if (seleccionados.size === 0) return;
    if (!confirm(`¿Eliminar ${seleccionados.size} prospectos seleccionados?`)) return;

    for (const id of seleccionados) {
      try {
        await fetch(`/api/prospectos/${id}?id=${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Error eliminando:', err);
      }
    }

    setProspectos(prev => prev.filter(p => !seleccionados.has(p.id)));
    setSeleccionados(new Set());
    setSeleccionTodos(false);
  };

  // Cambiar estado de seleccionados
  const cambiarEstadoSeleccionados = async (nuevoEstado: string) => {
    if (seleccionados.size === 0) return;

    for (const id of seleccionados) {
      try {
        await fetch(`/api/prospectos/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: nuevoEstado }),
        });
      } catch (err) {
        console.error('Error actualizando:', err);
      }
    }

    setProspectos(prev =>
      prev.map(p => seleccionados.has(p.id) ? { ...p, estado: nuevoEstado } : p)
    );
    setSeleccionados(new Set());
    setSeleccionTodos(false);
  };

  // Toggle selección individual
  const toggleSeleccion = (id: string) => {
    setSeleccionados(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle seleccionar todos
  const toggleSeleccionarTodos = () => {
    if (seleccionTodos) {
      setSeleccionados(new Set());
    } else {
      setSeleccionados(new Set(prospectosFiltrados.map(p => p.id)));
    }
    setSeleccionTodos(!seleccionTodos);
  };

  // Contactar seleccionados por WhatsApp
  const contactarSeleccionados = () => {
    const telefonos = prospectosFiltrados
      .filter(p => seleccionados.has(p.id) && p.telefonoLimpio)
      .map(p => p.telefonoLimpio);
    
    if (telefonos.length === 0) {
      alert('No hay teléfonos válidos en la selección');
      return;
    }

    const mensaje = `Hola, te contactamos de Martinelli Representaciones. ¿Te interesa conocer nuestros productos?`;
    const urlWhatsApp = `https://wa.me/${telefonos[0]}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, "_blank");
  };

  // Filtrar prospectos
  let prospectosFiltrados = prospectos;

  if (filtroEstado !== "todos") {
    prospectosFiltrados = prospectosFiltrados.filter(p => p.estado === filtroEstado);
  }

  if (filtroProvincia !== "todas") {
    prospectosFiltrados = prospectosFiltrados.filter(p => p.provincia === filtroProvincia);
  }

  if (filtroTipo !== "todos") {
    prospectosFiltrados = prospectosFiltrados.filter(p => p.tipo === filtroTipo);
  }

  if (busqueda) {
    const search = busqueda.toLowerCase();
    prospectosFiltrados = prospectosFiltrados.filter(p => 
      p.nombre.toLowerCase().includes(search) ||
      p.zona.toLowerCase().includes(search) ||
      p.telefono.includes(search) ||
      p.direccion?.toLowerCase().includes(search)
    );
  }

  // Stats
  const stats = {
    total: prospectos.length,
    nuevos: prospectos.filter(p => p.estado === 'nuevo').length,
    contactados: prospectos.filter(p => p.estado === 'contactado').length,
    noContactados: prospectos.filter(p => p.estado === 'no-contactado').length,
    clientes: prospectos.filter(p => p.estado === 'cliente').length,
  };

  // Paginación
  const prospectosPaginados = prospectosFiltrados.slice(
    (paginaActual - 1) * TAMANO_PAGINA,
    paginaActual * TAMANO_PAGINA
  );
  const totalPaginas = Math.ceil(prospectosFiltrados.length / TAMANO_PAGINA);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [filtroEstado, filtroProvincia, filtroTipo, busqueda]);

  // Funciones de utilidad
  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'nuevo': return 'Nuevo';
      case 'contactado': return 'Contactado';
      case 'no-contactado': return 'No Contactado';
      case 'cliente': return 'Cliente';
      default: return estado;
    }
  };

  const getTipoTexto = (tipo: string) => {
    switch (tipo) {
      case 'corralón': return 'Corralón';
      case 'ferretería': return 'Ferretería';
      case 'otro': return 'Otro';
      default: return tipo || 'otro';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'corralón': return 'bg-orange-100 text-orange-800 font-semibold border border-orange-300';
      case 'ferretería': return 'bg-indigo-100 text-indigo-800 font-semibold border border-indigo-300';
      case 'otro': return 'bg-slate-100 text-slate-800 font-semibold border border-slate-300';
      default: return 'bg-slate-100 text-slate-800 border border-slate-300';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'nuevo': return 'bg-blue-100 text-blue-800 font-semibold border border-blue-300';
      case 'contactado': return 'bg-green-100 text-green-800 font-semibold border border-green-300';
      case 'no-contactado': return 'bg-red-100 text-red-800 font-semibold border border-red-300';
      case 'cliente': return 'bg-teal-100 text-teal-800 font-semibold border border-teal-300';
      default: return 'bg-slate-100 text-slate-800 border border-slate-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Cargando prospectos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
        {/* Botones de acción */}
        <div className="flex flex-wrap gap-1 justify-between mb-2">
          <div className="flex flex-wrap gap-1">
            <input
              type="file"
              accept=".xlsx,.xls"
              ref={fileInputRef}
              onChange={handleCargarExcel}
              className="hidden"
            />
            
             {/* Si hay un Excel cargado, mostrar selector de hojas */}
            {excelCargado ? (
              <div className="flex items-center gap-1">
                <select
                  value={sheetSeleccionada}
                  onChange={(e) => setSheetSeleccionada(e.target.value)}
                  className="px-3 py-2 border border-slate-700 rounded bg-slate-800 text-white text-base"
                >
                  <option value="todas">Todas ({sheetsDisponibles.length})</option>
                  {sheetsDisponibles.map(sheet => (
                    <option key={sheet} value={sheet}>{sheet}</option>
                  ))}
                </select>
                <button
                  onClick={handleImportar}
                  disabled={importando}
                  className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white rounded text-base font-medium"
                >
                  {importando ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Importando...
                    </>
                  ) : (
                    'Importar'
                  )}
                </button>
                <button
                  onClick={() => {
                    setExcelCargado(false);
                    setSheetsDisponibles([]);
                    workbookRef.current = null;
                  }}
                  className="p-1.5 text-slate-400 hover:bg-slate-700 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  ref={fileInputRef}
                  onChange={handleCargarExcel}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={importando}
                  className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white rounded text-base font-medium"
                >
                  {importando ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Importando...
                    </>
                  ) : (
                    'Cargar Excel'
                  )}
                </button>
              </>
            )}

            <button
              onClick={cargarProspectos}
              className="p-1.5 hover:bg-slate-100 rounded bg-slate-800 border border-slate-700"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Acciones con selección múltiple */}
          {seleccionados.size > 0 && (
            <div className="flex flex-wrap gap-2 items-center bg-blue-50 px-3 py-2 rounded text-base">
              <span className="text-blue-700 font-semibold">
                {seleccionados.size} sel.
              </span>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    cambiarEstadoSeleccionados(e.target.value);
                    e.target.value = "";
                  }
                }}
                className="text-base border border-blue-200 rounded px-2 py-1"
                value=""
              >
                <option value="">Estado</option>
                <option value="nuevo">N</option>
                <option value="contactado">C</option>
                <option value="no-contactado">X</option>
                <option value="cliente">✓</option>
              </select>
              <button
                onClick={contactarSeleccionados}
                className="flex items-center gap-2 px-3 py-1.5 text-base text-green-600 hover:bg-green-100 rounded"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WA
              </button>
              <button
                onClick={eliminarSeleccionados}
                className="flex items-center gap-2 px-3 py-1.5 text-base text-red-600 hover:bg-red-100 rounded"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </button>
            </div>
          )}
        </div>

        {/* Barra de progreso de importación */}
        {importando && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-medium text-blue-700">
                Importando: {progreso.hoja}
              </span>
              <span className="text-base text-blue-600">
                {progreso.actual} / {progreso.total}
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progreso.total > 0 ? (progreso.actual / progreso.total) * 100 : 0}%` }}
              />
            </div>
            <p className="text-base text-blue-500 mt-2">
              Total de prospectos actual: {prospectos.length}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 mb-2">
          <div className="bg-slate-800 rounded p-1.5 border border-slate-700 text-center">
            <p className="text-base text-slate-500 font-semibold">Total</p>
            <p className="text-xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-slate-800 rounded p-1.5 border border-slate-700 text-center">
            <p className="text-base text-slate-500 font-semibold">Nuevos</p>
            <p className="text-xl font-bold text-blue-600">{stats.nuevos}</p>
          </div>
          <div className="bg-slate-800 rounded p-1.5 border border-slate-700 text-center">
            <p className="text-base text-slate-500 font-semibold">Contact.</p>
            <p className="text-xl font-bold text-green-600">{stats.contactados}</p>
          </div>
          <div className="bg-slate-800 rounded p-1.5 border border-slate-700 text-center">
            <p className="text-base text-slate-500 font-semibold">Sin cont.</p>
            <p className="text-xl font-bold text-red-600">{stats.noContactados}</p>
          </div>
          <div className="bg-slate-800 rounded p-1.5 border border-slate-700 text-center">
            <p className="text-base text-slate-500 font-semibold">Clientes</p>
            <p className="text-xl font-bold text-teal-600">{stats.clientes}</p>
          </div>
          <div className="bg-slate-800 rounded p-1.5 border border-slate-700 text-center">
            <p className="text-base text-slate-500 font-semibold">Corralón</p>
            <p className="text-xl font-bold text-orange-600">{prospectos.filter(p => p.tipo === 'corralón').length}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Filtros */}
        <div className="flex flex-wrap gap-1 mb-2">
          {/* Filtro por estado */}
          <div className="flex flex-wrap gap-0.5">
            {(['todos', 'nuevo', 'contactado', 'no-contactado', 'cliente'] as EstadoFiltro[]).map((estado) => (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                className={`px-3 py-2 rounded text-base font-semibold transition-colors ${
                  filtroEstado === estado
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-800 text-white hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {estado === 'todos' ? 'Todos' : getEstadoTexto(estado)}
              </button>
            ))}
          </div>

          {/* Filtro por provincia */}
          <select
            value={filtroProvincia}
            onChange={(e) => setFiltroProvincia(e.target.value)}
            className="px-3 py-2 border border-slate-700 rounded bg-slate-800 text-white text-base font-medium"
          >
            <option value="todas">Provincia</option>
            {provinciasUnicas.map(provincia => (
              <option key={provincia} value={provincia}>{provincia}</option>
            ))}
          </select>

          {/* Filtro por tipo */}
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as TipoFiltro)}
            className="px-3 py-2 border border-slate-700 rounded bg-slate-800 text-white text-base font-medium"
          >
            <option value="todos">Tipo</option>
            <option value="corralón">Corralón</option>
            <option value="ferretería">Ferretería</option>
            <option value="otro">Otros</option>
          </select>

          {/* Buscador */}
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 min-w-[180px] px-3 py-2 border border-slate-300 rounded bg-slate-800 text-base"
          />
        </div>

        {/* Resultados */}
        <div className="mb-2 text-base text-slate-500 font-medium">
          {prospectosFiltrados.length} de {prospectos.length} prospectos
        </div>

        {/* Lista de prospectos */}
        {prospectosFiltrados.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a4 4 0 11-8 0 4 4 0 018 0zM17 20a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
            <p className="text-slate-500">
              {prospectos.length === 0 
                ? 'No hay prospectos. Importá un Excel para comenzar.' 
                : 'No hay prospectos que coincidan con los filtros.'}
            </p>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            {/* Header de la tabla */}
            <div className="grid grid-cols-12 gap-2 p-2 bg-slate-700 border-b border-slate-600 text-base font-semibold text-white">
              <div className="col-span-4 flex items-center gap-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seleccionTodos && prospectosFiltrados.length > 0}
                    onChange={toggleSeleccionarTodos}
                    className="rounded border-slate-400"
                  />
                </label>
                <span>Nombre</span>
              </div>
              <div className="col-span-2">Zona</div>
              <div className="col-span-2">Teléfono</div>
              <div className="col-span-1">Tipo</div>
              <div className="col-span-2">Estado</div>
              <div className="col-span-1">Acción</div>
            </div>

            {/* Filas */}
            {prospectosPaginados.map((prospecto) => (
              <div 
                key={prospecto.id} 
                className={`grid grid-cols-12 gap-2 p-2 border-b border-slate-700 hover:bg-slate-700 text-base items-center ${seleccionados.has(prospecto.id) ? 'bg-slate-700/50' : ''}`}
              >
                <div className="col-span-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={seleccionados.has(prospecto.id)}
                    onChange={() => toggleSeleccion(prospecto.id)}
                    className="rounded border-slate-500 bg-slate-800 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">{prospecto.nombre}</div>
                    {prospecto.direccion && (
                      <div className="text-base text-slate-200 truncate max-w-[200px]">{prospecto.direccion}</div>
                    )}
                  </div>
                </div>
                <div className="col-span-2 text-white truncate">{prospecto.zona}</div>
                <div className="col-span-2">
                  <a 
                    href={`https://wa.me/${prospecto.telefonoLimpio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    {prospecto.telefono}
                  </a>
                </div>
                <div className="col-span-1">
                  <span className={`px-2 py-1 rounded text-base ${getTipoColor(prospecto.tipo)}`}>
                    {getTipoTexto(prospecto.tipo)}
                  </span>
                </div>
                <div className="col-span-2">
                  <select
                    value={prospecto.estado}
                    onChange={(e) => actualizarEstado(prospecto.id, e.target.value)}
                    className={`px-2 py-1 rounded cursor-pointer text-base font-medium ${getEstadoColor(prospecto.estado)}`}
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="contactado">Contactado</option>
                    <option value="no-contactado">Sin Contactar</option>
                    <option value="cliente">Cliente</option>
                  </select>
                </div>
                <div className="col-span-1 flex items-center gap-0.5">
                  <button
                    onClick={() => setProspectoDetalle(prospecto)}
                    className="p-1 hover:bg-slate-600 rounded"
                    title="Ver detalles"
                  >
                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => eliminarProspecto(prospecto.id)}
                    className="p-1 hover:bg-red-900/30 rounded"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPaginas > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4 pb-4">
            <button
              onClick={() => setPaginaActual(1)}
              disabled={paginaActual === 1}
              className="px-3 py-2 rounded bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 text-base"
            >
              ««
            </button>
            <button
              onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
              className="px-4 py-2 rounded bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 text-base"
            >
              « Anterior
            </button>
            
            <span className="px-4 text-base font-medium text-slate-700">
              Página {paginaActual} de {totalPaginas}
            </span>
            
            <button
              onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
              className="px-4 py-2 rounded bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 text-base"
            >
              Siguiente »
            </button>
            <button
              onClick={() => setPaginaActual(totalPaginas)}
              disabled={paginaActual === totalPaginas}
              className="px-3 py-2 rounded bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 text-base"
            >
              »»
            </button>
          </div>
        )}

        {prospectoDetalle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setProspectoDetalle(null)} />
            <div className="relative bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Detalles del Prospecto</h2>
                  <button
                    onClick={() => setProspectoDetalle(null)}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-base text-slate-200 uppercase">Nombre</label>
                    <p className="font-medium text-slate-900">{prospectoDetalle.nombre}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-base text-slate-200 uppercase">Teléfono</label>
                      <p className="text-blue-600">
                        <a href={`https://wa.me/${prospectoDetalle.telefonoLimpio}`} target="_blank" rel="noopener noreferrer">
                          {prospectoDetalle.telefono}
                        </a>
                      </p>
                    </div>
                    <div>
                      <label className="text-base text-slate-200 uppercase">Provincia</label>
                      <p className="text-white">{prospectoDetalle.provincia}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-base text-slate-200 uppercase">Zona / Localidad</label>
                    <p className="text-white">{prospectoDetalle.zona}</p>
                  </div>

                  <div>
                    <label className="text-base text-slate-200 uppercase">Dirección</label>
                    <p className="text-white text-base">{prospectoDetalle.direccion}</p>
                  </div>

                  {prospectoDetalle.googleMaps && (
                    <div>
                      <label className="text-base text-slate-200 uppercase">Google Maps</label>
                      <a 
                        href={prospectoDetalle.googleMaps} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-base hover:underline block truncate"
                      >
                        {prospectoDetalle.googleMaps}
                      </a>
                    </div>
                  )}

                  <div>
                    <label className="text-base text-slate-200 uppercase">Estado</label>
                    <select
                      value={prospectoDetalle.estado}
                      onChange={(e) => {
                        actualizarEstado(prospectoDetalle.id, e.target.value);
                        setProspectoDetalle({ ...prospectoDetalle, estado: e.target.value });
                      }}
                      className="mt-1 w-full px-3 py-2 border border-slate-700 rounded-lg"
                    >
                      <option value="nuevo">Nuevo</option>
                      <option value="contactado">Contactado</option>
                      <option value="no-contactado">No Contactado</option>
                      <option value="cliente">Cliente</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-base text-slate-200 uppercase">Notas</label>
                    <textarea
                      value={prospectoDetalle.notas}
                      onChange={(e) => {
                        setProspectoDetalle({ ...prospectoDetalle, notas: e.target.value });
                      }}
                      onBlur={() => actualizarNotas(prospectoDetalle.id, prospectoDetalle.notas)}
                      rows={3}
                      className="mt-1 w-full px-3 py-2 border border-slate-700 rounded-lg text-base"
                      placeholder="Agregar notas..."
                    />
                  </div>

                  <div className="pt-4 flex gap-2">
                    <a
                      href={`https://wa.me/${prospectoDetalle.telefonoLimpio}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Contactar por WhatsApp
                    </a>
                    {prospectoDetalle.googleMaps && (
                      <a
                        href={prospectoDetalle.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Ver en Mapa
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}