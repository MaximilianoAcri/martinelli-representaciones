import type { Metadata } from "next";

export const metadata: Record<string, Metadata> = {
  "chapa-perforada": {
    title: "Chapas Perforadas y Decorativas | Martinelli Materiales",
    description: "Chapas perforadas y decorativas de primera calidad. Chapas tipo persiana, industrial, microperforadas y más. Metalpar, Sinko, Acerbrag. Envíos a todo Argentina.",
    keywords: ["chapas perforadas", "chapas decorativas", "chapa industrial", "chapa microperforada", "chapa tipo persiana", "Metalpar", "Sinko", "Acerbrag"],
  },
  "metal-y-mallas": {
    title: "Mallas Metálicas - Hexagonal, Gallinero, Simétrica | Martinelli Materiales",
    description: "Mallas metálicas de calidad: hexagonal, gallinero, simétrica, gabión y overshield. Metalpar, Sinko, Mallas Gab. Envíos a todo Argentina.",
    keywords: ["mallas metálicas", "malla hexagonal", "malla gallinero", "malla simétrica", "malla gabión", "Metalpar", "Sinko", "Mallas Gab"],
  },
  "griferia": {
    title: "Grifería Industrial y Comercial | Martinelli Materiales",
    description: "Grifería industrial y comercial de primera calidad. Grifos, bachas, accesorios de baño. Grifería Argentina. Envíos a todo Argentina.",
    keywords: ["grifería", "grifo industrial", "bacha acero inoxidable", "accesorios baño", "grifería Argentina"],
  },
  "materiales": {
    title: "Materiales de Construcción - Chapas Zinc, Tejas, Hierros | Martinelli Materiales",
    description: "Materiales de construcción de primera calidad. Chapas zinc, tejas coloniales, romana, policarbonato, hierros. TEFA. Envíos a todo Argentina.",
    keywords: ["materiales construcción", "chapa zinc", "teja colonial", "teja romana", "teja policarbonato", "hierro ángulo", "hierro cuadrado", "TEFA"],
  },
};

export function generateMetadata({ params }: { params: { categoria: string } }): Metadata {
  const categoriaMetadata = metadata[params.categoria] || {
    title: "Productos | Martinelli Materiales",
    description: "Chapas, Mallas, Grifería y Materiales de Construcción",
  };
  
  return {
    ...categoriaMetadata,
    openGraph: {
      title: categoriaMetadata.title ?? undefined,
      description: categoriaMetadata.description ?? undefined,
    },
  };
}