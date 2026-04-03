"use client";

import Link from "next/link";
import { useCotizacion } from "./CotizacionContext";
import { AnimatedSubtitle } from "./AnimatedSubtitle";

export function HeroSection() {
  const { openModal } = useCotizacion();

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/0403.mp4" type="video/mp4" />
        </video>
        {/* Overlay para asegurar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4 slide-up">
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 border border-white/30">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              20+ años asesorando a industriales
            </span>
          </div>
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight slide-up animate-delay-100 flex items-center flex-wrap gap-2 md:gap-0 drop-shadow-lg">
            <img src="/m.png" alt="M" className="h-[1em] md:h-[1.3em] w-auto inline-block align-middle drop-shadow-lg" />
            <span className="text-gradient-static">artinelli</span>
            <span className="text-white">Representaciones</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-4 slide-up animate-delay-200">
            Distribuidores oficiales de las mejores marcas
          </p>
          <AnimatedSubtitle />
          <div className="flex flex-col sm:flex-row gap-4 slide-up animate-delay-400 mt-8">
            <button 
              className="bg-white hover:bg-slate-200 px-8 py-4 rounded-xl font-semibold text-lg transition-all text-center text-slate-900 hover-lift hover-glow"
            >
              <Link href="/catalogo">
                Explorar Productos
              </Link>
            </button>
            <button 
              onClick={() => openModal()}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all text-center hover-lift"
            >
              Solicitar Cotización
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
