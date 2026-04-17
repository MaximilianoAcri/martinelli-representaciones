"use client";

import { useState } from "react";
import { db } from "@/lib/firebase-client";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"idle" | "cargando" | "exito" | "error">("idle");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setEstado("cargando");

    try {
      const q = query(collection(db, "newsletter"), where("email", "==", email.toLowerCase()));
      const existing = await getDocs(q);

      if (!existing.empty) {
        setEstado("error");
        setMensaje("Este email ya está registrado en nuestro newsletter");
        return;
      }

      await addDoc(collection(db, "newsletter"), {
        email: email.toLowerCase(),
        fecha: serverTimestamp(),
        estado: "activo"
      });

      setEstado("exito");
      setMensaje("¡Listo! Te vas a enterar de todas nuestras ofertas y novedades.");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setEstado("error");
      setMensaje("Hubo un problema. Probá de nuevo o escribinos por WhatsApp.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8 md:p-12 shadow-2xl">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/images/historia-bg.jpg)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl md:text-2xl mb-2">
              Recibí nuestras ofertas
            </h3>
            <p className="text-slate-400 text-base">
              Novedades, promociones y consejos exclusivos para vos y tu empresa
            </p>
          </div>
        </div>

        {/* Success State */}
        {estado === "exito" ? (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg mb-1">¡Gracias por suscribirte!</p>
            <p className="text-slate-300">{mensaje}</p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={estado === "cargando"}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/20 transition-all duration-300 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={estado === "cargando"}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[180px]"
            >
              {estado === "cargando" ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Suscribirse</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}

        {/* Error message */}
        {estado === "error" && (
          <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-300 text-sm">{mensaje}</p>
          </div>
        )}

        {/* Footer note */}
        <div className="flex items-center gap-2 mt-6 text-slate-500 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Sin spam. Solo contenido relevante. Podés darte de baja cuando quieras.</span>
        </div>
      </div>
    </div>
  );
}