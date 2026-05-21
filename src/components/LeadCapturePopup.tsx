"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase-client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("lead-capture-dismissed");
    if (dismissed) return;

    // Contar páginas vistas en la sesión
    const visited = parseInt(sessionStorage.getItem("pages-visited") || "0", 10) + 1;
    sessionStorage.setItem("pages-visited", String(visited));

    // Solo mostrar si el usuario ya visitó al menos 2 páginas
    if (visited < 2) return;

    // Mostrar a los 35s para no interrumpir la navegación inicial
    const timer = setTimeout(() => {
      const stillDismissed = localStorage.getItem("lead-capture-dismissed");
      if (!stillDismissed) setIsOpen(true);
    }, 35000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "newsletter"), {
        email,
        fecha: serverTimestamp(),
        origen: "lead-capture-popup",
        estado: "suscrito",
      });
      setEnviado(true);
      localStorage.setItem("lead-capture-dismissed", "true");
      setTimeout(() => setIsOpen(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("lead-capture-dismissed", "true");
  };

  return (
    <div
      className={`
        fixed bottom-6 left-4 sm:left-auto sm:right-6 z-[90] w-[calc(100vw-2rem)] sm:w-80
        transition-all duration-500 ease-out
        ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-8 opacity-0 pointer-events-none"}
      `}
      role="dialog"
      aria-modal="true"
      aria-label="Catálogo gratuito"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-5 relative">
        {/* Botón cerrar */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {enviado ? (
          <div className="text-center py-2">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold text-slate-800 dark:text-white">¡Listo! Te lo enviamos pronto.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-sm leading-tight">
                  ¿Querés nuestro catálogo?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Productos, medidas y precios de fábrica
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                className="flex-1 min-w-0 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-slate-700 dark:text-white"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                {loading ? "..." : "Enviar"}
              </button>
            </form>

            <p className="text-xs text-slate-400 mt-2 text-center">
              Sin spam. Podés darte de baja cuando quieras.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
