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
    <div className="h-10 overflow-hidden">
      <p 
        className={`
          text-xl md:text-2xl font-medium text-white/90 transition-all duration-500 drop-shadow-md
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        `}
      >
        {messages[currentIndex]}
      </p>
    </div>
  );
}
