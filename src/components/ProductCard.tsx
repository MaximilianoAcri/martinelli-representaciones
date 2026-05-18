"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";

interface Modelo {
  specs: string;
  [key: string]: unknown;
}

interface ProductCardProps {
  id?: string;
  slug?: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  categoria?: string;
  modelos?: Modelo[];
  specs?: string;
  href?: string;
  onCotizar?: () => void;
}

function parseSpecs(specsStr: string): string[] {
  return specsStr
    .split(/\s*-\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function SpecPills({ specsStr }: { specsStr: string }) {
  const pills = parseSpecs(specsStr);
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {pills.map((pill, i) => (
        <span
          key={i}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1e293b] text-[#94a3b8] border border-[#334155] dark:bg-[#0f172a] dark:text-[#94a3b8] dark:border-[#1e293b]"
        >
          {pill}
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({
  id,
  slug,
  nombre,
  descripcion,
  imagen,
  categoria,
  modelos = [],
  specs,
  href,
  onCotizar,
}: ProductCardProps) {
  const [modelosExpanded, setModelosExpanded] = useState(false);
  const totalModelos = modelos.length;
  const tieneModelos = totalModelos > 1;
  const specsToShow = specs ?? modelos[0]?.specs;
  const cardHref = href ?? (slug ? `/catalogo/${slug}` : "#");

  return (
    <article className="group relative flex flex-col overflow-hidden bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
      <Link href={cardHref} className="relative block aspect-[4/3] overflow-hidden bg-[#1e293b]">
        {imagen ? (
          <Image
            src={imagen}
            alt={nombre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e293b]">
            <span className="text-[#475569] text-sm">Sin imagen</span>
          </div>
        )}
        {categoria && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#0f172a]/70 text-[#94a3b8] backdrop-blur-sm border border-[#334155]/60">
            {categoria}
          </span>
        )}
        {tieneModelos && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0ea5e9] text-white shadow-md">
            {totalModelos} modelos
          </span>
        )}
      </Link>
      <div className="flex flex-col flex-1 p-4 gap-3">
        <Link href={cardHref}>
          <h3 className="text-base font-semibold leading-snug text-[#1e293b] dark:text-[#f1f5f9] line-clamp-2 group-hover:text-[#0ea5e9] transition-colors duration-200">
            {nombre}
          </h3>
        </Link>
        {descripcion && (
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8] line-clamp-2 leading-relaxed">
            {descripcion}
          </p>
        )}
        {specsToShow && !tieneModelos && <SpecPills specsStr={specsToShow} />}
        {tieneModelos && (
          <div className="mt-1">
            <button
              onClick={() => setModelosExpanded((v) => !v)}
              className="flex items-center gap-1 text-xs font-medium text-[#0ea5e9] hover:text-[#0284c7] transition-colors duration-150"
            >
              {modelosExpanded ? (
                <><ChevronUp className="w-3 h-3" /> Ocultar modelos</>
              ) : (
                <><ChevronDown className="w-3 h-3" /> Ver {totalModelos - 1} modelo{totalModelos - 1 !== 1 ? "s" : ""} mas</>
              )}
            </button>
            {modelosExpanded && (
              <div className="mt-2 space-y-2 border-t border-[#e2e8f0] dark:border-[#334155] pt-2">
                {modelos.map((modelo, i) => (
                  <div key={i}>
                    <SpecPills specsStr={modelo.specs} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex-1" />
        <button
          onClick={onCotizar}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(14,165,233,0.35)] active:translate-y-0"
        >
          <ShoppingCart className="w-4 h-4" />
          Solicitar Cotizacion
        </button>
      </div>
    </article>
  );
}
