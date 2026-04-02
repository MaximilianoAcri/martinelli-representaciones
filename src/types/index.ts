export type Categoria = 
  | "chapa-perforada"
  | "metal-y-mallas"
  | "griferia"
  | "representaciones"
  | "desplegados"
  | "herramientas";

export type Empresa = 
  | "Metalpar"
  | "Sinko"
  | "Acerbrag"
  | "Mallas Gab"
  | "Griferia Argentina"
  | "TEFA"
  | "Desplegados Sur";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  empresa: Empresa;
  imagen?: string;
  unidad?: string; // por metro, por unidad, etc.
  medidas?: string;
  aplicaciones?: string[]; // Para mostrar en la card
  materiales?: string[]; // Materiales disponibles
  material?: string | string[]; // Material principal (alternativa a materiales)
  juego?: string; // Para productos en set
  caja?: string; // Para productos en caja
}

export interface Contacto {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  productosInteres: string[];
}
