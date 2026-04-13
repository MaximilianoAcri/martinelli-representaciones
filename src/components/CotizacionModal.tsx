"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { productos } from "@/data/productos";
import { useCotizacion } from "./CotizacionContext";
import { useAuth } from "./AuthContext";

interface ItemCotizacion {
  id: string;
  nombre: string;
  unidad: string;
  cantidad: number;
}

export function CotizacionModal() {
  const { 
    isOpen, closeModal, 
    items, addItem, removeItem, updateQuantity, clearItems 
  } = useCotizacion();
  const { user } = useAuth();

  // Datos del cliente
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Productos del pedido ahora vienen del context
  const [busqueda, setBusqueda] = useState("");
  const [mostrarBuscador, setMostrarBuscador] = useState(false);

  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paso, setPaso] = useState<1 | 2>(1); // paso 1: productos, paso 2: datos

  const modalRef = useRef<HTMLDivElement>(null);
  const buscadorRef = useRef<HTMLInputElement>(null);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mostrarBuscador) {
          setMostrarBuscador(false);
          setBusqueda("");
        } else {
          closeModal();
        }
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal, mostrarBuscador]);

  // Auto-fill con datos del usuario logueado
  useEffect(() => {
    if (user && isOpen) {
      if (!nombre && user.displayName) setNombre(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user, isOpen]);



  // Focus buscador
  useEffect(() => {
    if (mostrarBuscador && buscadorRef.current) {
      buscadorRef.current.focus();
    }
  }, [mostrarBuscador]);

  // Resultado de búsqueda
  const resultadosBusqueda = useMemo(() => {
    if (!busqueda.trim()) return [];
    const term = busqueda.toLowerCase();
    return productos
      .filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term) ||
        (p.subcategoria && p.subcategoria.toLowerCase().includes(term))
      )
      .filter(p => !items.find(i => i.id === p.id))
      .slice(0, 8);
  }, [busqueda, items]);

  const agregarProducto = (prod: typeof productos[0]) => {
    addItem(prod);
    setBusqueda("");
    setMostrarBuscador(false);
  };

  const quitarProducto = (id: string) => {
    removeItem(id);
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    updateQuantity(id, cantidad);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: Record<string, any> = {
      nombre,
      telefono,
      email,
      empresa,
      productos: items.map(i => ({
        id: i.id,
        nombre: i.nombre,
        unidad: i.unidad,
        cantidad: i.cantidad,
      })),
      mensaje,
    };

    if (user) {
      payload.userId = user.uid;
    }

    try {
      await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error guardando cotización:", error);
    }

    // Ya no abrimos WhatsApp, todo queda en Firebase
    setEnviado(true);
    setLoading(false);
  };

  const handleCerrar = () => {
    // Si ya se envió, limpiamos el carrito
    if (enviado) {
      clearItems();
      setEnviado(false);
    }
    setNombre("");
    setEmail("");
    setTelefono("");
    setEmpresa("");
    setMensaje("");
    setBusqueda("");
    setMostrarBuscador(false);
    setPaso(1);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Solicitar Presupuesto
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {paso === 1 ? "Agregá los productos que necesitás" : "Completá tus datos de contacto"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Steps indicator */}
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              <div className={`w-2 h-2 rounded-full transition-colors ${paso >= 1 ? "bg-slate-800 dark:bg-white" : "bg-slate-300"}`} />
              <div className={`w-6 h-0.5 ${paso >= 2 ? "bg-slate-800 dark:bg-white" : "bg-slate-300"}`} />
              <div className={`w-2 h-2 rounded-full transition-colors ${paso >= 2 ? "bg-slate-800 dark:bg-white" : "bg-slate-300"}`} />
            </div>
            <button
              onClick={handleCerrar}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {enviado ? (
          <div className="p-8 text-center">
            {/* Confeti effect - inline */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
              <div className="absolute top-4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDuration: '1s' }} />
              <div className="absolute top-8 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '1.2s', animationDelay: '0.2s' }} />
              <div className="absolute top-12 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDuration: '0.8s', animationDelay: '0.4s' }} />
              <div className="absolute top-6 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDuration: '1.1s', animationDelay: '0.1s' }} />
            </div>
            
            {/* Big success icon with animation */}
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              ¡Pedido recibido! 🎉
            </h3>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
                📋 Resumen de tu solicitud
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {items.length} producto{items.length !== 1 ? "s" : ""} - Total: {items.reduce((acc, i) => acc + i.cantidad, 0)} unidades
              </p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-left bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Confirmamos tu email</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-left bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Tiempo de respuesta</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Menor a 24 horas hábiles</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-left bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Precio final</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Incluye entrega y mejor precio</p>
                </div>
              </div>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Maxi</span> o <span className="font-semibold text-slate-700 dark:text-slate-300">Franco</span> te van a contacta por {telefono} con el presupuesto النهائي.
            </p>
            
            <button
              onClick={handleCerrar}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              👍 Perfecto, espero su contacto
            </button>
          </div>
        ) : (
          <>
            {/* PASO 1: Seleccionar productos */}
            {paso === 1 && (
              <div className="p-5">
                {/* WhatsApp directo */}
                <a
                  href="https://wa.me/541559929083"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors mb-4"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white">¿Preferís chatear directo?</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Abrimos WhatsApp al instante</p>
                  </div>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                  <span className="text-xs text-slate-400 font-medium">O armá tu pedido</span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                </div>

                {/* Buscador de productos */}
                <div className="relative mb-4">
                  <div className="relative">
                    <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      ref={buscadorRef}
                      type="text"
                      value={busqueda}
                      onChange={(e) => { setBusqueda(e.target.value); setMostrarBuscador(true); }}
                      onFocus={() => setMostrarBuscador(true)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
                      placeholder="Buscar producto... (ej: chapa perforada, malla, grifo)"
                    />
                    {busqueda && (
                      <button
                        onClick={() => { setBusqueda(""); setMostrarBuscador(false); }}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Resultados de búsqueda */}
                  {mostrarBuscador && busqueda.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 shadow-xl max-h-52 overflow-y-auto z-20">
                      {resultadosBusqueda.length === 0 ? (
                        <div className="p-4 text-center text-sm text-slate-500">
                          No se encontraron productos
                        </div>
                      ) : (
                        resultadosBusqueda.map(prod => (
                          <button
                            key={prod.id}
                            onClick={() => agregarProducto(prod)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors text-left border-b border-slate-100 dark:border-slate-600 last:border-0"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{prod.nombre}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{prod.unidad || "unidad"}</p>
                            </div>
                            <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Lista de productos agregados */}
                {items.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Productos en tu cotización ({items.length})
                    </p>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.nombre}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.unidad}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-500 transition-colors text-sm font-bold"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.cantidad}
                            onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value) || 1)}
                            min={1}
                            className="w-12 text-center py-1 text-sm font-semibold border border-slate-300 dark:border-slate-500 rounded-lg bg-white dark:bg-slate-600 text-slate-900 dark:text-white outline-none"
                          />
                          <button
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-500 transition-colors text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => quitarProducto(item.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 mb-4">
                    <svg className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Buscá y agregá productos arriba</p>
                    <p className="text-xs text-slate-400 dark:text-slate-300 mt-1">Podés agregar todos los que necesites</p>
                  </div>
                )}

                {/* Botón siguiente */}
                <button
                  onClick={() => setPaso(2)}
                  disabled={items.length === 0}
                  className="w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-white dark:text-slate-900 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Continuar con {items.length} producto{items.length !== 1 ? "s" : ""}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* PASO 2: Datos de contacto */}
            {paso === 2 && (
              <div className="p-5">
                {/* Resumen de productos */}
                <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-200 dark:border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Tu pedido ({items.length})
                    </p>
                    <button
                      onClick={() => setPaso(1)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Editar
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {items.map(item => (
                      <li key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700 dark:text-slate-300 truncate mr-2">{item.nombre}</span>
                        <span className="text-slate-900 dark:text-white font-semibold whitespace-nowrap">
                          {item.cantidad} {item.unidad}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  {/* Email y Teléfono */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                        placeholder="11 1234 5678"
                      />
                    </div>
                  </div>

                  {/* Empresa */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Empresa / Corralón <span className="text-slate-400 font-normal">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Notas adicionales <span className="text-slate-400 font-normal">(opcional)</span>
                    </label>
                    <textarea
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none resize-none text-sm"
                      placeholder="Medidas específicas, material preferido, urgencia..."
                    />
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPaso(1)}
                      className="px-5 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm"
                    >
                      ← Volver
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-white dark:text-slate-900 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Enviando solicitud...
                        </>
                      ) : (
                        <>
                          Enviar solicitud de cotización
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-green-600 dark:text-green-400 text-center font-medium">
                    ✓ Vas a recibir un email de confirmación y Maxi o Franco te contactan en menos de 24hs
                  </p>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
