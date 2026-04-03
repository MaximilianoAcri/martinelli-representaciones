"use client";

import { useState, useEffect, useRef } from "react";
import { productos } from "@/data/productos";
import { useCotizacion } from "./CotizacionContext";

export function CotizacionModal() {
  const { isOpen, productoSeleccionado: productoDelContexto, closeModal } = useCotizacion();
  const [productoId, setProductoId] = useState<string>("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);

  // Cerrar al hacer click fuera
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  // Inicializar con producto si viene del contexto
  useEffect(() => {
    if (productoDelContexto) {
      setProductoId(productoDelContexto.id);
      setMensaje(`Hola, me interesa solicitar una cotización para el producto: ${productoDelContexto.nombre} (${productoDelContexto.empresa}).`);
    }
  }, [productoDelContexto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Crear mensaje para WhatsApp
    const mensajeWhatsApp = `*SOLICITUD DE COTIZACIÓN*\n\n` +
      `*Producto:* ${productos.find(p => p.id === productoId)?.nombre || "Varios productos"}\n` +
      `*Nombre:* ${nombre}\n` +
      `*Email:* ${email}\n` +
      `*Teléfono:* ${telefono}\n` +
      `*Empresa:* ${empresa || "No especificado"}\n` +
      `*Mensaje:* ${mensaje}`;

    const urlWhatsApp = `https://wa.me/541559929083?text=${encodeURIComponent(mensajeWhatsApp)}`;
    window.open(urlWhatsApp, "_blank");

    setEnviado(true);
    setLoading(false);
  };

  const handleCerrar = () => {
    setEnviado(false);
    setProductoId("");
    setNombre("");
    setEmail("");
    setTelefono("");
    setEmpresa("");
    setMensaje("");
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              ¿Cómo querés contactarnos?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Elegí la opción que te resulte más cómoda
            </p>
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

        {enviado ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              ¡Solicitud enviada!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Te hemos abierto WhatsApp para completar la solicitud. Un asesor te responderá a la brevedad.
            </p>
            <button
              onClick={handleCerrar}
              className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {/* Opción 1: WhatsApp directo */}
            <a
              href="https://wa.me/541559929083"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-slate-900 dark:text-white">Chatear por WhatsApp</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Respuesta inmediata</p>
              </div>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
              <span className="text-sm text-slate-500">o</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
            </div>

            {/* Opción 2: Formulario de cotización */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Solicitar Cotización Formal</h3>
              
              {/* Producto */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Producto de interés
                </label>
                <select
                  value={productoId}
                  onChange={(e) => setProductoId(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
                >
                  <option value="">Seleccioná un producto (opcional)</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} - {p.empresa}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
                  placeholder="Juan Pérez"
                />
              </div>

              {/* Email y Teléfono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
                    placeholder="juan@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
                    placeholder="11 1234 5678"
                  />
                </div>
              </div>

              {/* Empresa */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Empresa (opcional)
                </label>
                <input
                  type="text"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
                  placeholder="Tu empresa"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none resize-none"
                  placeholder="Contanos más sobre tu proyecto o necesidad específica..."
                />
              </div>

              {/* Botón submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-white dark:text-slate-900 px-6 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar Solicitud"
                )}
              </button>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Te contactamos con la cotización en breve
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
