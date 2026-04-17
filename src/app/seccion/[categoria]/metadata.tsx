import type { Metadata } from "next";

export const metadata: Record<string, Metadata> = {
  "desplegados": {
    title: "Metal Desplegado | Martinelli Representaciones",
    description: "Metal desplegado liviano, mediano, pesado y reforzado para yeseros. Material maleable y fácil de cortar. Envíos a todo Argentina.",
    keywords: ["metal desplegado", "metal desplegado yeseros", "metal para revoque", "guardacantos"],
  },
  "chapas": {
    title: "Chapas Perforadas y Decorativas | Martinelli Representaciones",
    description: "Chapas perforadas técnicas y decorativas. Hierro, acero galvanizado y acero inoxidable. Diseños técnicos y ornamentales. Envíos a todo Argentina.",
    keywords: ["chapas perforadas", "chapas decorativas", "chapa industrial", "chapa microperforada", "metal desplegado decorativo"],
  },
  "mallas": {
    title: "Mallas - Fibra de Vidrio, Hexagonal, Gallinero | Martinelli Representaciones",
    description: "Mallas para construcción, industria y cercos. Fibra de vidrio, hexagonal, gallinero, electrosoldadas, alambre de púas. Envíos a todo Argentina.",
    keywords: ["mallas", "malla fibra de vidrio", "malla hexagonal", "malla gallinero", "malla electrosoldada", "alambre de púas"],
  },
  "griferia": {
    title: "Grifería Industrial y Comercial | Martinelli Representaciones",
    description: "Grifería industrial y comercial de primera calidad. Grifos de lavadero, monocomando, bachas de acero inoxidable. Envíos a todo Argentina.",
    keywords: ["grifería", "grifo industrial", "grifo lavadero", "monocomando", "bacha acero inoxidable"],
  },
  "materiales": {
    title: "Materiales y Fijaciones | Martinelli Representaciones",
    description: "Chapas de zinc, tejas, perfiles de hierro, barras, tornillos, clavos, alambres y accesorios. Todo para tu obra. Envíos a todo Argentina.",
    keywords: ["materiales construcción", "chapa zinc", "tejas", "perfiles hierro", "tornillos", "clavos", "alambre"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const { categoria } = await params;
  const categoriaMetadata = metadata[categoria] || {
    title: "Productos | Martinelli Representaciones",
    description: "Chapas, Mallas, Grifería y Materiales de Construcción",
  };
  
  return {
    ...categoriaMetadata,
    openGraph: {
      title: categoriaMetadata.title ?? undefined,
      description: categoriaMetadata.description ?? undefined,
    },
    alternates: {
      canonical: `/seccion/${categoria}`,
    },
  };
}