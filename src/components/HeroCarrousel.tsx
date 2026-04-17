"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  link: string;
  boton: string;
}

const slides: Slide[] = [
  {
    id: "desplegados",
    titulo: "Metal Desplegado",
    descripcion: "Liviano, Mediano, Pesado y Reforzado",
    imagen: "/images/productos/metal desplegado.jpg",
    link: "/seccion/desplegados",
    boton: "Ver Productos"
  },
  {
    id: "mallas",
    titulo: "Mallas Metálicas",
    descripcion: "Fibra de Vidrio, Seguridad y Hexagonales",
    imagen: "/images/productos/malla metalica.webp",
    link: "/seccion/mallas",
    boton: "Ver Mallas"
  },
  {
    id: "seguridad",
    titulo: "Seguridad Perimetral",
    descripcion: "Concertinas, Alambre de Púas y Flatwrap",
    imagen: "/images/productos/concertina.jpg",
    link: "/seccion/materiales",
    boton: "Ver Seguridad"
  },
  {
    id: "fijaciones",
    titulo: "Fijaciones",
    descripcion: "Clavos, Tornillos y Torniquetes",
    imagen: "/images/productos/clavos.webp",
    link: "/seccion/materiales",
    boton: "Ver Fijaciones"
  }
];

export function HeroCarrousel() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="relative bg-slate-900 overflow-hidden">
      {/* Video más pequeño (60% alto) */}
      <div className="h-[60vh] md:h-[65vh] relative">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/hero-poster.jpg)' }}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/hero-poster.jpg"
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/0403.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
        </div>

        {/* Contenido del video */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                20+ años de experiencia
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Martinelli Representaciones
            </h1>
            <p className="text-slate-300 text-lg mb-6">
              Chapas perforadas, mallas y materiales de construcción de primera calidad
            </p>
            <div className="flex gap-3">
              <a 
                href="https://wa.me/5411599229083"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-400 px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Cotizar
              </a>
              <Link 
                href="/catalogo"
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-6 py-3 rounded-xl font-semibold text-white"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carrousel */}
      <div className="bg-slate-800 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
            Nuestras Categorías
          </h2>
          
          {/* Slides del carrousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${actual * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {slides.map((cat) => (
                      <Link
                        key={cat.id}
                        href={cat.link}
                        className="group relative bg-slate-700 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={cat.imagen}
                            alt={cat.titulo}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                            {cat.titulo}
                          </h3>
                          <p className="text-sm text-slate-400 mt-1">
                            {cat.descripcion}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots de navegación */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActual(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  actual === i 
                    ? "bg-blue-500 w-8" 
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}