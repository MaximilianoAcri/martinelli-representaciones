"use client";

import { useState, useEffect } from "react";

const benefits = [
  {
    letter: "A",
    title: "Atención Personalizada",
    description: "Maxi o Franco te van a guiar en cada paso de manera directa y sin vueltas. Atendemos tu necesidad específica."
  },
  {
    letter: "E",
    title: "Entregas en Todo el País",
    description: "Coordinamos la entrega de tu pedido a toda Argentina. Te pasamos el costo de envío según tu ubicación."
  },
  {
    letter: "P",
    title: "Precios de Fábrica",
    description: "Tenemos los mejores precios directo de fábrica para vos."
  },
  {
    letter: "C",
    title: "Calidad Garantizada",
    description: "Productos de primera calidad certificados. Hierros, aceros y materiales que cumplen con los más altos estándares."
  }
];

export function WhyChooseUs() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Show items one by one with delays
    benefits.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, (index + 1) * 300);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {benefits.map((benefit, index) => {
        const isVisible = visibleItems.includes(index);
        
        return (
          <div 
            key={index}
            className={`
              bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700
              transition-all duration-500
              ${isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
              }
              hover:shadow-xl hover:-translate-y-1
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center mb-4">
              <span className="text-white dark:text-slate-900 font-bold text-sm">{benefit.letter}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {benefit.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {benefit.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}