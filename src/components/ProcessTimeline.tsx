"use client";

import { useState, useEffect } from "react";

const steps = [
  {
    number: 1,
    title: "Consulta Inicial",
    description: "Escuchamos tus necesidades y requerimientos específicos para entender perfectamente tu proyecto."
  },
  {
    number: 2,
    title: "Asesoramiento",
    description: "Te recomendamos el mejor producto según tu necesidad, con opciones y precios claros."
  },
  {
    number: 3,
    title: "Cotización",
    description: "Te enviamos la propuesta comercial con el detalle de productos, precios y tiempos de entrega."
  },
  {
    number: 4,
    title: "Entrega",
    description: "Coordinamos la entrega en tiempo y forma, despachando a todo el país."
  }
];

export function ProcessTimeline() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Show steps one by one with delays
    steps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, index + 1]);
      }, (index + 1) * 800);
    });
  }, []);

  return (
    <div className="relative">
      {/* Timeline line - Desktop */}
      <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 mx-20 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-slate-400 via-slate-600 to-slate-800 dark:from-slate-600 dark:via-slate-400 dark:to-slate-200 transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${(visibleSteps.length / steps.length) * 100}%` }}
        />
      </div>

      {/* Mobile - Vertical line */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0">
        {steps.map((step, index) => {
          const isVisible = visibleSteps.includes(step.number);
          const isActive = visibleSteps.length === step.number;
          
          return (
            <div 
              key={step.number}
              className={`relative pl-10 md:pl-0 transition-all duration-500 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Circle with number - Mobile */}
              <div className="md:hidden absolute left-0 top-0 w-12 h-12 -translate-x-1/2">
                <div 
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                    transition-all duration-500 transform
                    ${isVisible ? "scale-100" : "scale-0"}
                    ${isActive
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg"
                      : "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  {step.number}
                </div>
              </div>

              {/* Circle with number - Desktop */}
              <div className="hidden md:block relative mx-auto mb-4">
                <div className={`absolute inset-0 bg-slate-500/20 rounded-full blur-xl transition-all duration-700 ${isActive ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`} />
                <div 
                  className={`
                    w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto relative z-10
                    transition-all duration-500 transform
                    ${isVisible ? "scale-100" : "scale-0"}
                    ${isActive
                      ? "bg-gradient-to-br from-slate-800 to-black dark:from-slate-100 dark:to-white text-white dark:text-slate-900 shadow-lg shadow-slate-700/30 dark:shadow-white/30"
                      : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700"
                    }
                  `}
                >
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className={`text-center md:text-center ${index === 0 ? 'md:ml-auto md:pr-8' : index === 3 ? 'md:mr-auto md:pl-8' : ''}`}>
                <h3 className="text-base md:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}