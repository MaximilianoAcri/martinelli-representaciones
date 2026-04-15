import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo Completo | Martinelli Representaciones",
  description: "Explorá nuestro catálogo completo con más de 40 productos. Chapas perforadas, mallas, grifería y materiales de construcción de primera calidad.",
  alternates: {
    canonical: "/catalogo",
  },
};

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
