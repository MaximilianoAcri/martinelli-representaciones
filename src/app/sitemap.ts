import { MetadataRoute } from "next";
import { categorias } from "@/data/productos";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://martinellimateriales.com";

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Agregar cada categoría como ruta
  categorias.forEach((categoria) => {
    routes.push({
      url: `${baseUrl}/seccion/${categoria.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    });
  });

  return routes;
}