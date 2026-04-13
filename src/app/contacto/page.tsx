import type { Metadata } from "next";
import ContactoClient from "./contacto-client";

export const metadata: Metadata = {
  title: "Contacto - Martinelli Representaciones | Chapas, Mallas, Grifería",
  description: "Contactanos para consultas sobre chapas perforadas, mallas, grifería y materiales. Te asesoramos y respondemos a la brevedad. Envíos a todo Argentina.",
  keywords: ["contacto", "consulta", "chapas perforadas", "mallas", "grifería", "materiales construcción"],
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}