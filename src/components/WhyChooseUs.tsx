"use client";

import {
  BadgeCheck,
  Truck,
  Users,
  CircleDollarSign,
} from "lucide-react";

const VENTAJAS = [
  {
    icon: BadgeCheck,
    color: "text-[#0ea5e9]",
    bg: "bg-[#0ea5e9]/10 border-[#0ea5e9]/20",
    title: "Asesoramiento tecnico",
    descripcion:
      "Te ayudamos a elegir el producto exacto que necesitas. Mas de 20 anos de experiencia en el rubro industrial.",
  },
  {
    icon: Truck,
    color: "text-[#22c55e]",
    bg: "bg-[#22c55e]/10 border-[#22c55e]/20",
    title: "Envios a todo el pais",
    descripcion:
      "Coordinamos el despacho a cualquier punto de Argentina, en tiempo y forma, con seguimiento de tu pedido.",
  },
  {
    icon: Users,
    color: "text-[#8b5cf6]",
    bg: "bg-[#8b5cf6]/10 border-[#8b5cf6]/20",
    title: "Atencion personalizada",
    descripcion:
      "Trabajamos directo con vos: sin intermediarios, sin call centers. Hablas con quien conoce el producto.",
  },
  {
    icon: CircleDollarSign,
    color: "text-[#f59e0b]",
    bg: "bg-[#f59e0b]/10 border-[#f59e0b]/20",
    title: "Precios competitivos",
    descripcion:
      "Compramos directo a fabrica y te trasladamos ese precio. Cotizaciones rapidas y sin sorpresas.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-[#f8fafc] dark:bg-[#0f172a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20">
            Ventajas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] dark:text-[#f1f5f9] mb-3">
            Por que elegirnos?
          </h2>
          <p className="text-[#64748b] dark:text-[#94a3b8] max-w-xl mx-auto text-base">
            Mas de dos decadas proveyendo materiales de calidad para corralones, constructoras e industriales de todo el pais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VENTAJAS.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="group flex flex-col gap-4 p-6 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${v.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${v.color}`} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-[#1e293b] dark:text-[#f1f5f9] text-base leading-tight">
                    {v.title}
                  </h3>
                  <p className="text-[#64748b] dark:text-[#94a3b8] text-sm leading-relaxed">
                    {v.descripcion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
