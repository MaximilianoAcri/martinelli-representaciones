"use client";

import { useState, useEffect } from "react";

const messages = [
  "Productos de primera calidad",
  "Chapas perforadas, mallas y grifería",
  "Más de 20 años de experiencia en el mercado",
  "Asesoramiento técnico especializado",
  "Precios de fábrica sin intermediarios",
  "Envíos a todo el país",
  "Atención personalizada",
  "Compromiso serio con cada cliente"
];

export function AnimatedSubtitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      setTimeout(() => {
        // Change message and fade in
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 md:h-12 overflow-hidden mb-4">
      <p 
        className={`
          text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400 dark:from-slate-300 dark:to-slate-500 transition-all duration-500
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
      >
        {messages[currentIndex]}
      </p>
    </div>
  );
}
