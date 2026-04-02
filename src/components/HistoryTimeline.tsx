"use client";

import { useState, useEffect } from "react";

const historyEvents = [
  {
    year: "2004",
    title: "Fundación",
    description: "Francisco Martinelli inicia su actividad como agente comercial en el sector de materiales industriales."
  },
  {
    year: "2010",
    title: "Expansion de Productos",
    description: "Incorporamos nuevas líneas de productos: chapas perforadas, mallas y grifería industrial."
  },
  {
    year: "2015",
    title: "Relaciones Estratégicas",
    description: "Establecemos representaciones oficiales con los principales fabricantes del país."
  },
  {
    year: "2020",
    title: "Crecimiento Sostenido",
    description: "Ampliamos nuestra red de clientes a todo el territorio nacional con presencia en todas las provincias."
  },
  {
    year: "2024",
    title: "Presencia Digital",
    description: "Lanzamos nuestra plataforma online para facilitar la atención y cotización a distancia."
  },
  {
    year: "2026",
    title: "Compromiso Continuo",
    description: "Más de 20 años asesorando a industriales con la misma pasión y dedicación de siempre."
  }
];

export function HistoryTimeline() {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Show events one by one with delays
    historyEvents.forEach((_, index) => {
      setTimeout(() => {
        setVisibleEvents(prev => [...prev, index]);
      }, (index + 1) * 400);
    });
  }, []);

  return (
    <div className="relative">
      {/* Linea vertical */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

      <div className="space-y-12">
        {historyEvents.map((event, index) => {
          const isVisible = visibleEvents.includes(index);
          const isLeft = index % 2 === 0;
          
          return (
            <div 
              key={event.year}
              className={`relative flex items-center ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0'} transition-all duration-500`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Punto en la linea */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-slate-900 dark:bg-white border-4 border-white dark:border-slate-900 z-10"></div>
              
              {/* Contenido - alterna izq/der en desktop */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className={`
                  p-4 md:p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                  ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}
                `}>
                  <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {event.year}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}