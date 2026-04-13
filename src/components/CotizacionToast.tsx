"use client";

import { useCotizacion } from "./CotizacionContext";
import { useEffect } from "react";

export function CotizacionToast() {
  const { toast, hideToast } = useCotizacion();

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, hideToast]);

  if (!toast.show) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-xl"></div>
        
        <div className="relative bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-3 min-w-[300px]">
          {/* Icon */}
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* Content */}
          <p className="text-sm font-medium flex-1">{toast.mensaje}</p>
          
          {/* Close button */}
          <button
            onClick={hideToast}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-700 rounded-b-2xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-green-500 animate-[shrink_4s_ease-out_forwards]"
            style={{
              animation: 'shrink 4s ease-out forwards',
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}