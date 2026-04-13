"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "¿Cuáles son los métodos de pago disponibles?",
    answer: "Aceptamos transferencia bancaria, MercadoPago y efectivo. Para pedidos mayores, podemos ofrecer condiciones de pago personalizadas."
  },
  {
    question: "¿Realizan envíos a todo el país?",
    answer: "Sí, coordinamos entregas a todo el territorio argentino. Te informamos el costo de envío según tu ubicación."
  },
  {
    question: "¿Hacen factura?",
    answer: "Sí, emitimos factura. Somos el canal de venta de los principales fabricantes, así que comprás directo con nosotros."
  },
  {
    question: "¿Entregan ustedes los productos?",
    answer: "Coordinamos la entrega directamente con vos. El fabricante despacha desde su planta."
  },
  {
    question: "¿Cuánto tiempo tardan los envíos?",
    answer: "Los tiempos de entrega varían según tu ubicación y la disponibilidad del producto. Generalmente entre 3 a 7 días hábiles para provincia de Buenos Aires, y hasta 10 días hábiles para el resto del país."
  },
  {
    question: "¿Necesito cantidad mínima para comprar?",
    answer: "No tenemos monto mínimo de compra. Solemos trabajar con volúmenes industriales pero atendemos pedidos de todos los tamaños."
  },
  {
    question: "¿Ofrecen asesoramiento técnico?",
    answer: "Sí, tenemos más de 20 años de experiencia en el sector. Te asesoramos para que elijas el producto adecuado para tu necesidad específica."
  },
  {
    question: "¿Tienen showroom o pueden ver los productos?",
    answer: "Por el momento trabajamos de manera online y por teléfono. Podemos enviarte fotos, fichas técnicas y videos de los productos. También podés consultar nuestro catálogo online."
  },
  {
    question: "¿Cómo trabajan? ¿Son fabricantes?",
    answer: "Somos representantes comerciales - conectamos fabricantes con clientes. No fabricamos ni despachamos directamente, pero gestionamos tu pedido y te asesoramos durante todo el proceso."
  },
  {
    question: "¿Hacen facturas A y B?",
    answer: "Sí, emitimos facturas A y B según tu necesidad. Somos responsables_inscriptos."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div 
          key={index}
          className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <button
            className="w-full text-left p-4 md:p-6 flex items-center justify-between gap-4"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
              {item.question}
            </span>
            <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
          >
            <div className="p-4 md:p-6 pt-0 text-slate-600 dark:text-slate-400 text-sm md:text-base">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}