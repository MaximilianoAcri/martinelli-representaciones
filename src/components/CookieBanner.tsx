"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (consent: CookieConsent) => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      ...consent,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    setShowSettings(false);
    
    // Enable/disable analytics based on consent
    if (consent.analytics) {
      // Analytics would be enabled here
      console.log("Analytics enabled");
    }
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true
    });
  };

  const acceptOnlyNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false
    });
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6">
            {!showSettings ? (
              <>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Usamos cookies
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Utilizamos cookies para mejorar tu experiencia y, con tu permiso, para analizar el uso del sitio y mostrar contenido relevante.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Aceptar todas
                  </button>
                  <button
                    onClick={acceptOnlyNecessary}
                    className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Solo necesarias
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex-1 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Personalizar
                  </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                  Al aceptar, aceptás nuestra{' '}
                  <Link href="/privacidad" className="underline hover:text-blue-600 dark:hover:text-blue-400">
                    Política de Privacidad
                  </Link>
                  {' '}y{' '}
                  <Link href="/terminos" className="underline hover:text-blue-600 dark:hover:text-blue-400">
                    Términos
                  </Link>
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Configurar cookies
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Cookies necesarias</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Essential para el funcionamiento del sitio</p>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Siempre activadas</span>
                  </div>

                  <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Cookies analíticas</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Nos ayudan a mejorar el sitio</p>
                    </div>
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Cookies de marketing</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Contenido personalizado y anuncios</p>
                    </div>
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Guardar preferencias
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}