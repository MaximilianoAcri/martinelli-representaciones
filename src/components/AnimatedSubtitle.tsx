"use client";

import { useState, useEffect } from "react";

const messages = [
  "Más de 20 años de experiencia en el mercado argentino",
  "Distribuidores oficiales de las mejores marcas",
  "Asesoramiento técnico especializado",
  "Precios de fábrica sin intermediarios",
  "Entregas a todo el país",
  "Compromiso serio con cada cliente",
  "Atención personalizada de principio a fin"
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
    <div className="h-8 overflow-hidden">
      <p 
        className={`
          text-lg text-slate-500 dark:text-slate-400 transition-all duration-500
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        `}
      >
        {messages[currentIndex]}
      </p>
    </div>
  );
}