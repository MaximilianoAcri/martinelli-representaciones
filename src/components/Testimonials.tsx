"use client";

const testimonials = [
  {
    author: "Corralón El Progreso",
    location: "Buenos Aires",
    quote: "Hace meses que empezamos a abastecernos con ellos. Hablar directo con Maxi o Franco nos resolvió un montón de dudas y siempre nos asesoran muy bien.",
    rating: 5,
    initials: "EP"
  },
  {
    author: "Constructora Norte S.A.",
    location: "Tucumán",
    quote: "Compramos chapa perforada para varias obras. La atención siempre es muy buena y los precios ayudan bastante a mejorar el costo de cada proyecto.",
    rating: 5,
    initials: "CN"
  },
  {
    author: "Constructora Rio Cuarto Tomborelli",
    location: "Córdoba",
    quote: "Llega todo en tiempo y forma. Franco tiene buena predisposición para resolver cualquier inconveniente.",
    rating: 5,
    initials: "T"
  }
];

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {testimonials.map((testimonio, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600 flex flex-col h-full hover:shadow-lg transition-shadow">
          <div className="flex text-amber-500 mb-4">
            {[...Array(testimonio.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-slate-600 dark:text-slate-300 italic flex-grow mb-6">
            &quot;{testimonio.quote}&quot;
          </p>
          <div className="flex items-center gap-4 mt-auto">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">
              {testimonio.initials}
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">{testimonio.author}</div>
              <div className="text-sm text-slate-500">{testimonio.location}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
