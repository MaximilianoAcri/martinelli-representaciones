export interface Subcategoria {
  id: string;
  nombre: string;
  imagen: string;
  descripcion?: string;
}

export interface CategoriaInfo {
  id: Categoria;
  nombre: string;
  icono: string;
  imagen: string;
  descripcion?: string;
  aplicaciones?: string[];
  subcategorias?: Subcategoria[];
  destacados?: boolean;
}

export type Categoria = 
  | "desplegados"
  | "chapas"
  | "mallas"
  | "griferia"
  | "materiales";

export type Empresa = 
  | "Metalpar"
  | "Sinko"
  | "Acerbrag"
  | "Mallas Gab"
  | "Griferia Argentina"
  | "TEFA"
  | "Desplegados Sur"
  | "MetalurgiaFuerte"
  | "ConstruSink"
  | "AceroNacional"
  | "FijacionesTech"
  | "Grifería Premium"
  | "MallaPro"
  | "MallasSur"
  | "Martinelli Representaciones";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  descripcionCorta?: string;
  precio: number;
  precioAnterior?: number;
  categoria: Categoria;
  subcategoria?: string;
  empresa: Empresa;
  imagen?: string;
  unidad?: string;
  medidas?: string;
  aplicaciones?: string[];
  materiales?: string[];
  material?: string | string[];
  juego?: string;
  caja?: string;
  // Campos de marketing
  destacado?: boolean;
  nuevo?: boolean;
  oferta?: boolean;
  etiqueta?: string;
  disponibilidad?: " Stock" | "Bajo Stock" | "Sin Stock";
}

export interface Contacto {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  productosInteres: string[];
}
