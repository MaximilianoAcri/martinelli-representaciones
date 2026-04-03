import { categorias } from "@/data/productos";
import { SeccionClient } from "@/components/SeccionClient";

export function generateStaticParams() {
  return categorias.map((cat) => ({
    categoria: cat.id,
  }));
}

export default function SeccionPage() {
  // This is a server component that imports the client component
  // generateStaticParams() must be exported from a Server Component
  return <SeccionClient />;
}
