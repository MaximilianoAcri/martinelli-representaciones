import { Producto } from "@/types";

export const productos: Producto[] = [
  // ===== METAL PARA YESERÍA =====
  {
    id: "my-001",
    nombre: "Metal Desplegado Liviano con Nervadura",
    descripcion: "Metal desplegado liviano para yesería con nervadura. Gramaje: 370 a 400 gramos por hoja. Material maleable y fácil de cortar. Paquete de 10 hojas (15 m²) con tratamiento de pintura asfáltica anticorrosiva.",
    precio: 0,
    categoria: "desplegados",
    subcategoria: "metal-yeseria",
    empresa: "MallasSur",
    unidad: "por paquete (10 hojas - 15 m²)",
    medidas: "0.70 x 2 mts",
    aplicaciones: ["Yesería", "Mochetas", "Revoque de vigas", "Reparación de rajaduras", "Soporte de revoque"],
    material: ["Hierro galvanizado con nervadura"]
  },
  {
    id: "my-002",
    nombre: "Metal Desplegado Mediano con Nervadura",
    descripcion: "Metal desplegado mediano con nervadura para yesería. Gramaje: 520 a 560 gramos por hoja. Mayor resistencia que el liviano. Paquete de 10 hojas (15 m²) con tratamiento anticorrosivo.",
    precio: 0,
    categoria: "desplegados",
    subcategoria: "metal-yeseria",
    empresa: "MallasSur",
    unidad: "por paquete (10 hojas - 15 m²)",
    medidas: "0.75 x 2 mts",
    aplicaciones: ["Yesería", "Mochetas", "Ductos", "Taparrollos", "Piletas"],
    material: ["Hierro galvanizado con nervadura"]
  },
  {
    id: "my-003",
    nombre: "Metal Desplegado Mediano sin Nervadura",
    descripcion: "Metal desplegado mediano sin nervadura para yesería. Gramaje: 550 a 590 gramos por hoja. Mayor superficie de cobertura. Paquete de 10 hojas (15 m²) con tratamiento anticorrosivo.",
    precio: 0,
    categoria: "desplegados",
    subcategoria: "metal-yeseria",
    empresa: "MallasSur",
    unidad: "por paquete (10 hojas - 15 m²)",
    medidas: "0.75 x 2 mts",
    aplicaciones: ["Yesería", "Mochetas", "Revoques", "Terminaciones", "Piletas"],
    material: ["Hierro galvanizado sin nervadura"]
  },
  {
    id: "my-004",
    nombre: "Metal Desplegado Reforzado con Nervadura (650-700gr)",
    descripcion: "Metal desplegado reforzado con nervadura para yesería profesional. Gramaje: 650 a 700 gramos por hoja. Paquete de 10 hojas (15 m²) con tratamiento anticorrosivo.",
    precio: 0,
    categoria: "desplegados",
    subcategoria: "metal-yeseria",
    empresa: "MallasSur",
    unidad: "por paquete (10 hojas - 15 m²)",
    medidas: "0.75 x 2 mts",
    aplicaciones: ["Yesería profesional", "Piletas de natación", "Grandes superficies", "Estructuras"],
    material: ["Hierro galvanizado con nervadura"]
  },
  {
    id: "my-005",
    nombre: "Metal Desplegado Reforzado con Nervadura (820-870gr)",
    descripcion: "Metal desplegado reforzado con nervadura de alto gramaje. Gramaje: 820 a 870 gramos por hoja. Máxima resistencia. Paquete de 10 hojas (15 m²) con tratamiento anticorrosivo.",
    precio: 0,
    categoria: "desplegados",
    subcategoria: "metal-yeseria",
    empresa: "MallasSur",
    unidad: "por paquete (10 hojas - 15 m²)",
    medidas: "0.75 x 2 mts",
    aplicaciones: ["Yesería profesional", "Estructuras", "Grandes superficies", "Aplicaciones estructurales"],
    material: ["Hierro galvanizado con nervadura"]
  },
  {
    id: "my-006",
    nombre: "Metal Desplegado Pesado sin Nervadura",
    descripcion: "Metal desplegado pesado sin nervadura para aplicaciones estructurales. Gramaje: 890 a 920 gramos por hoja. Paquete de 10 hojas (15 m²) con tratamiento anticorrosivo.",
    precio: 0,
    categoria: "desplegados",
    subcategoria: "metal-yeseria",
    empresa: "MallasSur",
    unidad: "por paquete (10 hojas - 15 m²)",
    medidas: "0.75 x 2 mts",
    aplicaciones: ["Pisos", "Rejas", "Pasarelas", "Construcciones estructurales"],
    material: ["Hierro galvanizado sin nervadura"]
  },

  // ===== GUARDACANTOS =====
  {
    id: "gc-001",
    nombre: "Guardacantos Galvanizado 2.00 mts",
    descripcion: "Guardacantos galvanizado de 2 metros de largo. Fabricado en chapa galvanizada con dos alas que permiten la fusión con el revoque. Paquete de 10 unidades.",
    precio: 0,
    categoria: "desplegados",
    subcategoria: "guardacantos",
    empresa: "MallasSur",
    unidad: "por paquete (10 unidades)",
    medidas: "2.00 mts de largo",
    aplicaciones: ["Terminaciones de paredes", "Protección de cantos", "Cantoneras", "Revoque"],
    material: ["Chapa galvanizada"]
  },
  {
    id: "gc-002",
    nombre: "Guardacantos Galvanizado 2.60 mts",
    descripcion: "Guardacantos galvanizado de 2.60 metros de largo. Medida especial para terminaciones de obra. Paquete de 10 unidades.",
    precio: 0,
    categoria: "desplegados",
    subcategoria: "guardacantos",
    empresa: "MallasSur",
    unidad: "por paquete (10 unidades)",
    medidas: "2.60 mts de largo",
    aplicaciones: ["Terminaciones de paredes", "Protección de cantos", "Obras de construcción", "Cantoneras"],
    material: ["Chapa galvanizada"]
  },

  // ===== MALLAS DE FIBRA DE VIDRIO =====
  {
    id: "mf-000",
    nombre: "Malla Fibra de Vidrio 75gr 5x5mm",
    descripcion: "Malla de fibra de vidrio de gramaje liviano. Tejida con material elástico y antideslizante, cubierta con resina álcali-resistente. Flexible y fácil de instalar.",
    precio: 0,
    categoria: "mallas",
    subcategoria: "malla-75gr",
    empresa: "MallasSur",
    unidad: "por rollo",
    medidas: "1m (ancho) x 50m (largo) - Gramaje 75gr - Cuadrícula 5x5mm - Color Blanco",
    imagen: "/images/productos/malla de fibra de vidrio.webp",
    aplicaciones: ["Revoque fino", "Terminaciones", "Sellado de junturas"],
    material: ["Fibra de vidrio con resina antialcali"]
  },
  {
    id: "mf-001",
    nombre: "Malla Fibra de Vidrio 90gr 5x5mm",
    descripcion: "Malla de fibra de vidrio tejida con material elástico y antideslizante, cubierta con resina álcali-resistente. Flexible, liviana e inalterable con el tiempo.",
    precio: 0,
    categoria: "mallas",
    subcategoria: "malla-90gr",
    empresa: "MallasSur",
    unidad: "por rollo",
    medidas: "1m (ancho) x 50m (largo) - Gramaje 90gr - Cuadrícula 5x5mm - Color Blanco",
    imagen: "/images/productos/malla de fibra de vidrio.webp",
    aplicaciones: ["Revoque grueso y fino", "Steel framing", "EIFS", "Pisos cementicios", "Microcementicios", "Soporte de pinturas impermeabilizantes", "Revestimientos texturados"],
    material: ["Fibra de vidrio con resina antialcali"]
  },
  {
    id: "mf-002",
    nombre: "Malla Fibra de Vidrio 110gr 10x10mm",
    descripcion: "Malla de fibra de vidrio de mayor gramaje (110gr) y cuadrícula 10x10mm. Mayor resistencia y cobertura para aplicaciones más exigentes.",
    precio: 0,
    categoria: "mallas",
    subcategoria: "malla-110gr",
    empresa: "MallasSur",
    unidad: "por rollo",
    medidas: "1m (ancho) x 50m (largo) - Gramaje 110gr - Cuadrícula 10x10mm - Color Blanco",
    imagen: "/images/productos/malla de fibra de vidrio.webp",
    aplicaciones: ["Revoque grueso y fino", "Steel framing", "EIFS", "Pisos cementicios", "Microcementicios", "Soporte de pinturas impermeabilizantes", "Revestimientos texturados", "Vinculación entre materiales de distinta dilatación"],
    material: ["Fibra de vidrio con resina antialcali"]
  },

  // ===== CANTONERAS PVC =====
  {
    id: "cpvc-001",
    nombre: "Cantonera PVC con Alas de Malla de Fibra de Vidrio",
    descripcion: "Cantonera de PVC con alas de malla de fibra de vidrio. Combine la resistencia del PVC con la protección de la malla anti-alcali.",
    precio: 0,
    categoria: "materiales",
    subcategoria: "cantoneras",
    empresa: "MallasSur",
    unidad: "por unidad",
    medidas: "2.50m de largo",
    aplicaciones: ["Terminaciones de paredes", "Protección de cantos", "Zonas de alto tráfico"],
    material: ["PVC con malla de fibra de vidrio"]
  },

  // ===== TORNILLOS AUTOPERFORANTES =====
  {
    id: "ta-001",
    nombre: "Tornillo Autoperforante Punta Mecha 2\"",
    descripcion: "Tornillo autoperforante con punta mecha de 2 pulgadas. Ideal para fijación de chapas en estructuras metálicas. Caja de 1000 unidades.",
    precio: 0,
    categoria: "materiales",
    subcategoria: "tornillos-rep",
    empresa: "MallasSur",
    unidad: "por caja",
    medidas: "2\" (50.8mm) - Caja 1000u",
    aplicaciones: ["Fijación de chapas", "Techos", "Cerramientos", "Estructuras metálicas"],
    material: ["Acero cincado"]
  },
  {
    id: "ta-002",
    nombre: "Tornillo Autoperforante Punta Mecha 2.5\"",
    descripcion: "Tornillo autoperforante con punta mecha de 2.5 pulgadas. Mayor longitud para fijaciones en chapas más gruesas. Caja de 1000 unidades.",
    precio: 0,
    categoria: "materiales",
    subcategoria: "tornillos-rep",
    empresa: "MallasSur",
    unidad: "por caja",
    medidas: "2.5\" (63.5mm) - Caja 1000u",
    aplicaciones: ["Fijación de chapas", "Techos", "Cerramientos", "Maderas"],
    material: ["Acero cincado"]
  },
  {
    id: "ta-003",
    nombre: "Tornillo Autoperforante Punta Aguja 2\"",
    descripcion: "Tornillo autoperforante con punta aguja de 2 pulgadas. Punta más fina para materiales delicados. Cabeza Phillips. Caja de 1000 unidades.",
    precio: 0,
    categoria: "materiales",
    subcategoria: "tornillos-rep",
    empresa: "MallasSur",
    unidad: "por caja",
    medidas: "2\" (50.8mm) - Punta Aguja - Caja 1000u",
    aplicaciones: ["Fibrocemento", "Plásticos", "Chapas finas", "Techos de chitosan"],
    material: ["Acero cincado"]
  },
  {
    id: "ta-004",
    nombre: "Tornillo Autoperforante Punta Aguja 2.5\"",
    descripcion: "Tornillo autoperforante con punta aguja de 2.5 pulgadas. Punta fina para materiales delicados con mayor longitud. Caja de 1000 unidades.",
    precio: 0,
    categoria: "materiales",
    subcategoria: "tornillos-rep",
    empresa: "MallasSur",
    unidad: "por caja",
    medidas: "2.5\" (63.5mm) - Punta Aguja - Caja 1000u",
    aplicaciones: ["Fibrocemento", "Plásticos", "Chapas finas", "Techos de chitosan"],
    material: ["Acero cincado"]
  },

// ===== ALAMBRE NEGRO RECOCIDO =====
  { id: "an-04", nombre: "Alambre Negro Recocido Calibre 4", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 5.89mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 5.89mm - 4 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-05", nombre: "Alambre Negro Recocido Calibre 5", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 5.38mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 5.38mm - 5 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-06", nombre: "Alambre Negro Recocido Calibre 6", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 4.87mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 4.87mm - 6 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-07", nombre: "Alambre Negro Recocido Calibre 7", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 4.47mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 4.47mm - 8 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-08", nombre: "Alambre Negro Recocido Calibre 8", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 4.06mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 4.06mm - 9 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-09", nombre: "Alambre Negro Recocido Calibre 9", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 3.65mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 3.65mm - 11 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-10", nombre: "Alambre Negro Recocido Calibre 10", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 3.25mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 3.25mm - 15 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-11", nombre: "Alambre Negro Recocido Calibre 11", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 2.94mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.94mm - 18 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-12", nombre: "Alambre Negro Recocido Calibre 12", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 2.64mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.64mm - 24 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-13", nombre: "Alambre Negro Recocido Calibre 13", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 2.33mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.33mm - 30 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-14", nombre: "Alambre Negro Recocido Calibre 14", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 2.03mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.03mm - 40 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-15", nombre: "Alambre Negro Recocido Calibre 15", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 1.82mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.82mm - 50 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-16", nombre: "Alambre Negro Recocido Calibre 16", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 1.62mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.62mm - 63 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-17", nombre: "Alambre Negro Recocido Calibre 17", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 1.42mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.42mm - 83 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-18", nombre: "Alambre Negro Recocido Calibre 18", descripcion: "Alambre negro recocido. Maleabilidad, ductilidad y resistencia. Diámetro: 1.22mm. Tensión de rotura: 29.5/40.8 Kg/mm", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.22mm - 113 m/kg", aplicaciones: ["Construcción", "Ataduras"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },
  { id: "an-16-frac", nombre: "Negro Recocido Nº 16 Fraccionado", descripcion: "Alambre negro recocido fraccionado (cortado en tramos). Diámetro: 1.62mm. Ideal para ataduras y usos donde se necesita material cortado.", precio: 0, categoria: "materiales", subcategoria: "alambre-negro", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.62mm - fraccionado", aplicaciones: ["Construcción", "Ataduras", "Ferreterías"], material: ["Acero negro recocido"], imagen: "/images/productos/alambre Negro Recocido Fraccionado.webp" },

  // ALAMBRE GALVANIZADO
  { id: "ag-04", nombre: "Alambre Galvanizado Calibre 4", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 5.89mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-05", nombre: "Alambre Galvanizado Calibre 5", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 5.38mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-06", nombre: "Alambre Galvanizado Calibre 6", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 4.87mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-07", nombre: "Alambre Galvanizado Calibre 7", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 4.47mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-08", nombre: "Alambre Galvanizado Calibre 8", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 4.06mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-09", nombre: "Alambre Galvanizado Calibre 9", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 3.65mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-10", nombre: "Alambre Galvanizado Calibre 10", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 3.25mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-11", nombre: "Alambre Galvanizado Calibre 11", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.94mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-12", nombre: "Alambre Galvanizado Calibre 12", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.64mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-12.5", nombre: "Alambre Galvanizado Calibre 12.5", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.45mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-13", nombre: "Alambre Galvanizado Calibre 13", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.33mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-13.5", nombre: "Alambre Galvanizado Calibre 13.5", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.19mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-14", nombre: "Alambre Galvanizado Calibre 14", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 2.03mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-14.5", nombre: "Alambre Galvanizado Calibre 14.5", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.92mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-15", nombre: "Alambre Galvanizado Calibre 15", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.83mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-16", nombre: "Alambre Galvanizado Calibre 16", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.62mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-17", nombre: "Alambre Galvanizado Calibre 17", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.42mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-18", nombre: "Alambre Galvanizado Calibre 18", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.22mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-19", nombre: "Alambre Galvanizado Calibre 19", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 1.01mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-20", nombre: "Alambre Galvanizado Calibre 20", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 0.91mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-21", nombre: "Alambre Galvanizado Calibre 21", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 0.81mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-22", nombre: "Alambre Galvanizado Calibre 22", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 0.71mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },
  { id: "ag-23", nombre: "Alambre Galvanizado Calibre 23", descripcion: "Alambre galvanizado recocido para campo e industria. Resistente a corrosión.", precio: 0, categoria: "materiales", subcategoria: "alambre-galvanizado", empresa: "MallasSur", unidad: "por kg", medidas: "Ø 0.61mm", aplicaciones: ["Campo", "Industria", "Cercos"], material: ["Acero galvanizado"] },

  // ALAMBRE DE PÚAS
  { id: "ap-001", nombre: "Alambre de Púas Super Bagual", descripcion: "Alambre de púas con dos hilos de alta resistencia trenzados. Púas de alambre recocido galvanizado. Máxima seguridad.", precio: 0, categoria: "materiales", subcategoria: "alambre-puas", empresa: "MallasSur", unidad: "por rollo", medidas: "500m - sep. 4\" - púa 11mm - 450kg rotura - zinc 90 - peso 30kg", aplicaciones: ["Cercos perimetrales", "Alta seguridad"], material: ["Alambre galvanizado"], imagen: "/images/productos/alambredepuas.webp" },
  { id: "ap-002", nombre: "Alambre de Púas Bagual 500m sep 5\"", descripcion: "Alambre de púas estándar. Dos hilos de alta resistencia con púas galvanizadas.", precio: 0, categoria: "materiales", subcategoria: "alambre-puas", empresa: "MallasSur", unidad: "por rollo", medidas: "500m - sep. 5\" - púa 11mm - 450kg rotura - zinc 90 - peso 22kg", aplicaciones: ["Cercos perimetrales", "Campos"], material: ["Alambre galvanizado"], imagen: "/images/productos/alambredepuas.webp" },
  { id: "ap-003", nombre: "Alambre de Púas Bagual 500m sep 4\"", descripcion: "Alambre de púas estándar. Dos hilos de alta resistencia con púas galvanizadas.", precio: 0, categoria: "materiales", subcategoria: "alambre-puas", empresa: "MallasSur", unidad: "por rollo", medidas: "500m - sep. 4\" - púa 11mm - 350kg rotura - zinc 90 - peso 23.5kg", aplicaciones: ["Cercos perimetrales", "Campos"], material: ["Alambre galvanizado"], imagen: "/images/productos/alambredepuas.webp" },
  { id: "ap-004", nombre: "Alambre de Púas Bagualito", descripcion: "Alambre de púas Bagual en rollo de 100 metros.", precio: 0, categoria: "materiales", subcategoria: "alambre-puas", empresa: "MallasSur", unidad: "por rollo", medidas: "100m - sep. 4\" - púa 11mm - 350kg rotura - zinc 90 - peso 4.7kg", aplicaciones: ["Cercos perimetrales"], material: ["Alambre galvanizado"], imagen: "/images/productos/alambredepuas.webp" },
  { id: "ap-005", nombre: "Alambre de Púas Bull Dog", descripcion: "Alambre de púas de alta seguridad. Púas más largas (17mm) para máxima protección.", precio: 0, categoria: "materiales", subcategoria: "alambre-puas", empresa: "MallasSur", unidad: "por rollo", medidas: "100m - sep. 4\" - púa 17mm - 350kg rotura - zinc 90 - peso 4.5kg", aplicaciones: ["Alta seguridad", "Perímetros"], material: ["Alambre galvanizado"], imagen: "/images/productos/alambredepuas.webp" },

  // CONCERTINA BARBADA - SIMPLE
  { id: "cb-300", nombre: "Concertina Barbada 300mm Simple", descripcion: "Concertina barbada simple. Diámetro 300mm - 7m estirado - 56 vueltas.", precio: 0, categoria: "materiales", subcategoria: "concertina", empresa: "MallasSur", unidad: "por rollo", medidas: "Ø 300mm - 7m estirado - 56 vueltas - 4kg", aplicaciones: ["Seguridad perimetral", "Cercos de seguridad"], material: ["Acero galvanizado"] },
  { id: "cb-450", nombre: "Concertina Barbada 450mm Simple", descripcion: "Concertina barbada simple. Diámetro 450mm - 10m estirado - 55 vueltas.", precio: 0, categoria: "materiales", subcategoria: "concertina", empresa: "MallasSur", unidad: "por rollo", medidas: "Ø 450mm - 10m estirado - 55 vueltas - 7kg", aplicaciones: ["Seguridad perimetral", "Cercos de seguridad"], material: ["Acero galvanizado"] },
  { id: "cb-730", nombre: "Concertina Barbada 730mm Simple", descripcion: "Concertina barbada simple. Diámetro 730mm - 10-12m estirado - 55 vueltas.", precio: 0, categoria: "materiales", subcategoria: "concertina", empresa: "MallasSur", unidad: "por rollo", medidas: "Ø 730mm - 10-12m estirado - 55 vueltas - 10.5kg", aplicaciones: ["Seguridad perimetral", "Cercos de seguridad"], material: ["Acero galvanizado"] },
  { id: "cb-980", nombre: "Concertina Barbada 980mm Simple", descripcion: "Concertina barbada simple. Diámetro 980mm - 12-15m estirado - 55 vueltas. Máxima protección.", precio: 0, categoria: "materiales", subcategoria: "concertina", empresa: "MallasSur", unidad: "por rollo", medidas: "Ø 980mm - 12-15m estirado - 55 vueltas - 14kg", aplicaciones: ["Seguridad perimetral", "Alta seguridad"], material: ["Acero galvanizado"] },

  // CONCERTINA BARBADA - CRUZADA
  { id: "cb-300-cruzada", nombre: "Concertina Barbada 300mm Cruzada", descripcion: "Concertina barbada cruzada con doble línea de púas. Mayor seguridad.", precio: 0, categoria: "materiales", subcategoria: "concertina", empresa: "MallasSur", unidad: "por rollo", medidas: "Ø 300mm - cruzada", aplicaciones: ["Seguridad perimetral", "Alta seguridad"], material: ["Acero galvanizado"] },
  { id: "cb-450-cruzada", nombre: "Concertina Barbada 450mm Cruzada", descripcion: "Concertina barbada cruzada con doble línea de púas. Mayor seguridad.", precio: 0, categoria: "materiales", subcategoria: "concertina", empresa: "MallasSur", unidad: "por rollo", medidas: "Ø 450mm - cruzada", aplicaciones: ["Seguridad perimetral", "Alta seguridad"], material: ["Acero galvanizado"] },

  // FLATWRAP
  { id: "fw-500", nombre: "Flatwrap 500mm", descripcion: "Rollo plano de alambre de púas para cercos perimetrales.", precio: 0, categoria: "materiales", subcategoria: "alambre-puas", empresa: "MallasSur", unidad: "por rollo", medidas: "500mm - 15m - 9.5kg", aplicaciones: ["Cercos perimetrales", "Seguridad"], material: ["Acero galvanizado"] },
  { id: "fw-700", nombre: "Flatwrap 700mm", descripcion: "Rollo plano de alambre de púas para cercos perimetrales.", precio: 0, categoria: "materiales", subcategoria: "alambre-puas", empresa: "MallasSur", unidad: "por rollo", medidas: "700mm - 15m - 13kg", aplicaciones: ["Cercos perimetrales", "Seguridad"], material: ["Acero galvanizado"] },
  { id: "fw-900", nombre: "Flatwrap 900mm", descripcion: "Rollo plano de alambre de púas para cercos perimetrales.", precio: 0, categoria: "materiales", subcategoria: "alambre-puas", empresa: "MallasSur", unidad: "por rollo", medidas: "900mm - 15m - 14.5kg", aplicaciones: ["Cercos perimetrales", "Seguridad"], material: ["Acero galvanizado"] },

  // ALAMBRE TEJIDO ROMBOIDAL
  { id: "tr-38", nombre: "Alambre Tejido Romboidal 1.1/2\"", descripcion: "Tejido romboidal para cerramientos perimetrales. Galvanizado. Máxima seguridad.", precio: 0, categoria: "materiales", subcategoria: "tejido-romboidal", empresa: "MallasSur", unidad: "por rollo", medidas: "38mm (1.1/2\") - varias alturas", aplicaciones: ["Cerramientos perimetrales", "Cercos"], material: ["Acero galvanizado"] },
  { id: "tr-51", nombre: "Alambre Tejido Romboidal 2\"", descripcion: "Tejido romboidal para cerramientos. Evita que trepen niños.", precio: 0, categoria: "materiales", subcategoria: "tejido-romboidal", empresa: "MallasSur", unidad: "por rollo", medidas: "51mm (2\") - varias alturas", aplicaciones: ["Cerramientos perimetrales", "Cercos"], material: ["Acero galvanizado"] },
  { id: "tr-63", nombre: "Alambre Tejido Romboidal 2.1/2\"", descripcion: "Tejido romboidal para cerramientos. Evita que trepen adultos.", precio: 0, categoria: "materiales", subcategoria: "tejido-romboidal", empresa: "MallasSur", unidad: "por rollo", medidas: "63mm (2.1/2\") - varias alturas", aplicaciones: ["Cerramientos perimetrales", "Cercos"], material: ["Acero galvanizado"] },
  { id: "tr-76", nombre: "Alambre Tejido Romboidal 3\"", descripcion: "Tejido romboidal económico para cerramientos.", precio: 0, categoria: "materiales", subcategoria: "tejido-romboidal", empresa: "MallasSur", unidad: "por rollo", medidas: "76mm (3\") - varias alturas", aplicaciones: ["Cerramientos perimetrales", "Cercos"], material: ["Acero galvanizado"] },

  // ALAMBRE PARA CAMPO
  { id: "ac-sm", nombre: "Alambre San Martín", descripcion: "Alambre de alta resistencia para campo. Calibre 17/15. Alta carga de rotura.", precio: 0, categoria: "materiales", subcategoria: "alambre-campo", empresa: "MallasSur", unidad: "por rollo", medidas: "1000m - calibre 17/15 - 3.00/2.40mm - 800+ kg rotura - zinc 200 - 43kg", aplicaciones: ["Cercos rurales", "Campos"], material: ["Acero galvanizado"], imagen: "/images/productos/alambresanmartin.webp" },
  { id: "ac-in", nombre: "Alambre Invencible", descripcion: "Alambre de alta resistencia para campo. Calibre 16/14.", precio: 0, categoria: "materiales", subcategoria: "alambre-campo", empresa: "MallasSur", unidad: "por rollo", medidas: "1000m - calibre 16/14 - 2.70/2.20mm - 600 kg rotura - zinc 70 - 36kg", aplicaciones: ["Cercos rurales", "Campos"], material: ["Acero galvanizado"] },

  // TORNIQUETES
  { id: "tq-06", nombre: "Torniquete Nº 6", descripcion: "Torniquete de alta resistencia. 800 kg de resistencia. Antióxido.", precio: 0, categoria: "materiales", subcategoria: "torniquetes", empresa: "MallasSur", unidad: "por fardo", medidas: "480 gr - 800 kg - fardo 25 unidades", aplicaciones: ["Cercos", "Tensado de alambre"], material: ["Acero"] },
  { id: "tq-07", nombre: "Torniquete Nº 7", descripcion: "Torniquete estándar.", precio: 0, categoria: "materiales", subcategoria: "torniquetes", empresa: "MallasSur", unidad: "por fardo", medidas: "315 gr - 450 kg - fardo 25 unidades", aplicaciones: ["Cercos", "Tensado de alambre"], material: ["Acero"] },
  { id: "tq-08", nombre: "Torniquete Nº 8", descripcion: "Torniquete reforzado. 1000 kg de resistencia. Zincado.", precio: 0, categoria: "materiales", subcategoria: "torniquetes", empresa: "MallasSur", unidad: "por fardo", medidas: "580 gr - 1000 kg - fardo 25 unidades", aplicaciones: ["Cercos", "Tensado de alambre"], material: ["Acero zincado"] },
  { id: "tq-mini", nombre: "Torniquete Mini/TV", descripcion: "Torniquete pequeño para trabajos livianos.", precio: 0, categoria: "materiales", subcategoria: "torniquetes", empresa: "MallasSur", unidad: "por fardo", medidas: "180 gr - 250 kg - fardo 50 unidades", aplicaciones: ["Cercos", "Tensado de alambre"], material: ["Acero"] },
  { id: "tq-dob", nombre: "Torniquete Doble", descripcion: "Torniquete doble para mayor tensión. 500 kg por lado.", precio: 0, categoria: "materiales", subcategoria: "torniquetes", empresa: "MallasSur", unidad: "por fardo", medidas: "1.32 kg - 500 kg/lado - fardo 5 unidades", aplicaciones: ["Cercos", "Tensado de alambre"], material: ["Acero"] },
  { id: "tq-dob-r", nombre: "Torniquete Doble Reforzado", descripcion: "Torniquete doble reforzado. Máxima resistencia. Acabado asfáltico.", precio: 0, categoria: "materiales", subcategoria: "torniquetes", empresa: "MallasSur", unidad: "por fardo", medidas: "1.67 kg - 700 kg/lado - fardo 5 unidades", aplicaciones: ["Cercos", "Tensado de alambre"], material: ["Acero"] },

  // CLAVOS PUNTA PARÍS
  { id: "cp-1", nombre: "Clavos Punta París 1\"", descripcion: "Clavos de acero para encofrados, postes, machimbres y madera en general.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "1\" (25.4mm) - Ø 2.15mm", aplicaciones: ["Encofrados", "Postes", "Machimbres", "Madera"], material: ["Acero"] },
  { id: "cp-1.5", nombre: "Clavos Punta París 1.1/2\"", descripcion: "Clavos de acero para encofrados, postes, machimbres y madera en general.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "1.1/2\" (38.1mm) - Ø 2.45mm", aplicaciones: ["Encofrados", "Postes", "Machimbres", "Madera"], material: ["Acero"] },
  { id: "cp-2", nombre: "Clavos Punta París 2\"", descripcion: "Clavos de acero para encofrados, postes, machimbres y madera en general.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "2\" (50.8mm) - Ø 2.87mm", aplicaciones: ["Encofrados", "Postes", "Machimbres", "Madera"], material: ["Acero"] },
  { id: "cp-2.5", nombre: "Clavos Punta París 2.1/2\"", descripcion: "Clavos de acero para encofrados, postes, machimbres y madera en general.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "2.1/2\" (63.5mm) - Ø 3.33mm", aplicaciones: ["Encofrados", "Postes", "Machimbres", "Madera"], material: ["Acero"] },
  { id: "cp-3", nombre: "Clavos Punta París 3\"", descripcion: "Clavos de acero para encofrados, postes, machimbres y madera en general.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "3\" (76.2mm) - Ø 3.76mm", aplicaciones: ["Encofrados", "Postes", "Machimbres", "Madera"], material: ["Acero"] },
  { id: "cp-3.5", nombre: "Clavos Punta París 3.1/2\"", descripcion: "Clavos de acero para encofrados, postes, machimbres y madera en general.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "3.1/2\" (88.9mm) - Ø 4.11mm", aplicaciones: ["Encofrados", "Postes", "Machimbres", "Madera"], material: ["Acero"] },
  { id: "cp-4", nombre: "Clavos Punta París 4\"", descripcion: "Clavos de acero para encofrados, postes, machimbres y madera en general.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "4\" (101.6mm) - Ø 4.25mm", aplicaciones: ["Encofrados", "Postes", "Machimbres", "Madera"], material: ["Acero"] },
  { id: "cp-5", nombre: "Clavos Punta París 5\"", descripcion: "Clavos de acero para encofrados y construcción.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "5\" (127mm) - Ø 5.5mm", aplicaciones: ["Encofrados", "Postes", "Madera"], material: ["Acero"] },
  { id: "cp-6", nombre: "Clavos Punta París 6\"", descripcion: "Clavos de acero para encofrados y construcción.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "6\" (152.4mm) - Ø 5.5mm", aplicaciones: ["Encofrados", "Construcción"], material: ["Acero"] },

  // CLAVOS ESPIRALADOS
  { id: "ce-1", nombre: "Clavos Espiralados 1\"", descripcion: "Clavos espiralados para pallets, tirantes y techos de madera.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "1\" (25.4mm) - Ø 1.90-2.00mm", aplicaciones: ["Pallets", "Tirantes", "Techos de madera"], material: ["Acero"] },
  { id: "ce-1.5", nombre: "Clavos Espiralados 1.1/2\"", descripcion: "Clavos espiralados para pallets, tirantes y techos de madera.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "1.1/2\" (38.1mm) - Ø 2.20-2.30mm", aplicaciones: ["Pallets", "Tirantes", "Techos de madera"], material: ["Acero"] },
  { id: "ce-2", nombre: "Clavos Espiralados 2\"", descripcion: "Clavos espiralados para pallets, tirantes y techos de madera.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "2\" (50.8mm) - Ø 2.70-2.80mm", aplicaciones: ["Pallets", "Tirantes", "Techos de madera"], material: ["Acero"] },
  { id: "ce-2.5", nombre: "Clavos Espiralados 2.1/2\"", descripcion: "Clavos espiralados para pallets, tirantes y techos de madera.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "2.1/2\" (63.5mm) - Ø 3.10-3.20mm", aplicaciones: ["Pallets", "Tirantes", "Techos de madera"], material: ["Acero"] },
  { id: "ce-3", nombre: "Clavos Espiralados 3\"", descripcion: "Clavos espiralados para pallets, tirantes y techos de madera.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "3\" (76.2mm) - Ø 3.90-4.00mm", aplicaciones: ["Pallets", "Tirantes", "Techos de madera"], material: ["Acero"] },
  { id: "ce-4", nombre: "Clavos Espiralados 4\"", descripcion: "Clavos espiralados para pallets, tirantes y techos de madera.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "4\" (101.6mm) - Ø 4.14-4.25mm", aplicaciones: ["Pallets", "Tirantes", "Techos de madera"], material: ["Acero"] },
  { id: "ce-5", nombre: "Clavos Espiralados 5\"", descripcion: "Clavos espiralados para pallets, tirantes y techos de madera.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "5\" (127mm) - Ø 4.70-4.80mm", aplicaciones: ["Pallets", "Tirantes", "Techos de madera"], material: ["Acero"] },
  { id: "ce-6", nombre: "Clavos Espiralados 6\"", descripcion: "Clavos espiralados para pallets, tirantes y techos de madera.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "6\" (152.4mm) - Ø 5.10-5.20mm", aplicaciones: ["Pallets", "Tirantes", "Techos de madera"], material: ["Acero"] },

  // CLAVOS CABEZA DE PLOMO
  { id: "cpl-2.5", nombre: "Clavos Cabeza de Plomo 2.1/2\"", descripcion: "Clavos con cabeza de plomo para techos de chapa.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "2.1/2\" (63.5mm) - Ø 4.19mm", aplicaciones: ["Techos de chapa"], material: ["Acero con plomo"] },
  { id: "cpl-3", nombre: "Clavos Cabeza de Plomo 3\"", descripcion: "Clavos con cabeza de plomo para techos de chapa.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "3\" (76.2mm) - Ø 4.19mm", aplicaciones: ["Techos de chapa"], material: ["Acero con plomo"] },
  { id: "cpl-4", nombre: "Clavos Cabeza de Plomo 4\"", descripcion: "Clavos con cabeza de plomo para techos de chapa.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "4\" (101.4mm) - Ø 4.19mm", aplicaciones: ["Techos de chapa"], material: ["Acero con plomo"] },

  // CLAVOS CABEZA CHATA Y PERDIDA
  { id: "cch", nombre: "Clavos Cabeza Chata y Perdida 9x25", descripcion: "Clavos de cabeza chata y perdida para múltiples usos.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "9 x 25mm", aplicaciones: ["Construcción", "Carpintería"], material: ["Acero"] },

  // CLAVOS COBRE FRACCIONADO
  { id: "cc-1.5", nombre: "Clavos Cobre Fraccionado 1.1/2\"", descripcion: "Clavos de cobre para tejas coloniales y francesas.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "1.1/2\" (38.1mm) - Ø 2.50mm", aplicaciones: ["Tejas coloniales", "Tejas francesas"], material: ["Cobre"] },
  { id: "cc-2", nombre: "Clavos Cobre Fraccionado 2\"", descripcion: "Clavos de cobre para tejas coloniales y francesas.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "2\" (50.8mm) - Ø 2.50mm", aplicaciones: ["Tejas coloniales", "Tejas francesas"], material: ["Cobre"] },
  { id: "cc-2.5", nombre: "Clavos Cobre Fraccionado 2.1/2\"", descripcion: "Clavos de cobre para tejas coloniales y francesas.", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por kg", medidas: "2.1/2\" (63.5mm) - Ø 2.50mm", aplicaciones: ["Tejas coloniales", "Tejas francesas"], material: ["Cobre"] },

  // CLAVOS PARAGUA FRACCIONADOS
  { id: "cpf-2.5", nombre: "Clavos Paragua Fraccionados 2.1/2\"", descripcion: "Clavos Paragua para fijación de techos de chitosan. Espesor 9 (3.66mm).", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por caja", medidas: "2.1/2\" (63.5mm) - Caja 20", aplicaciones: ["Techos de chitosan"], material: ["Acero"] },
  { id: "cpf-3", nombre: "Clavos Paragua Fraccionados 3\"", descripcion: "Clavos Paragua para fijación de techos de chitosan. Espesor 9 (3.66mm).", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por caja", medidas: "3\" (76mm) - Caja 16", aplicaciones: ["Techos de chitosan"], material: ["Acero"] },
  { id: "cpf-4", nombre: "Clavos Paragua Fraccionados 4\"", descripcion: "Clavos Paragua para fijación de techos de chitosan. Espesor 9 (3.66mm).", precio: 0, categoria: "materiales", subcategoria: "clavos", empresa: "MallasSur", unidad: "por caja", medidas: "4\" (101mm) - Caja 12", aplicaciones: ["Techos de chitosan"], material: ["Acero"] },

  // FILM DE POLIETILENO
  { id: "fp-200", nombre: "Film de Polietileno Negro 200 micrones", descripcion: "Film de polietileno negro de 200 micrones de espesor. Alta resistencia y durabilidad.", precio: 0, categoria: "materiales", subcategoria: "film-polietileno", empresa: "MallasSur", unidad: "por rollo", medidas: "4m x 50m - 200 micrones", aplicaciones: ["Impermeabilización", "Cobertura de suelo", "Protección de materiales", "Construcción"], material: ["Polietileno"], imagen: "/images/productos/filmpolitirenonegro.webp" },

  // MALLAS DE SEGURIDAD
  { id: "ms-naranja", nombre: "Malla Seguridad Naranja Liviana", descripcion: "Malla de seguridad color naranja, versión liviana. Alta visibilidad para señalización y protección perimetral.", precio: 0, categoria: "materiales", subcategoria: "mallas-seguridad", empresa: "MallasSur", unidad: "por rollo", medidas: "1m x 50m - Color Naranja", aplicaciones: ["Seguridad perimetral", "Señalización", "Cercos temporales", "Obras"], material: ["Polietileno de alta densidad"] },

  // MEDIA SOMBRA
  { id: "ms-negra80", nombre: "Media Sombra 80% Negra", descripcion: "Media sombra de 80% de sombra color negro. Ideal para cubrir tinglados, invernáculos, terrazas y protección solar.", precio: 0, categoria: "materiales", subcategoria: "media-sombra", empresa: "MallasSur", unidad: "por metro", medidas: "80% sombra - Color Negro", aplicaciones: ["Cubierta de tinglados", "Invernáculos", "Terrazas", "Protección solar"], material: ["Polietileno UV"], imagen: "/images/productos/mediasombra80.webp" },
  { id: "ms-verde80", nombre: "Media Sombra 80% Verde", descripcion: "Media sombra de 80% de sombra color verde. Ideal para cercos perimetrales, cubrir tinglados y decoración.", precio: 0, categoria: "materiales", subcategoria: "media-sombra", empresa: "MallasSur", unidad: "por metro", medidas: "80% sombra - Color Verde", aplicaciones: ["Cercos perimetrales", "Cubierta de tinglados", "Decoración", "Protección solar"], material: ["Polietileno UV"], imagen: "/images/productos/filmpolitirenonegro.webp" },

  // RAFIA CUBRE CERCO
  { id: "rc-verde", nombre: "Rafia Cubre Cerco 110gr Verde", descripcion: "Rafia para cubre cerco color verde, gramaje 110gr. Ideal para privacidad en cercos perimetrales.", precio: 0, categoria: "materiales", subcategoria: "cubre-cerco", empresa: "MallasSur", unidad: "por metro", medidas: "110gr - Color Verde", aplicaciones: ["Cercos perimetrales", "Privacidad", "Delimitación de espacios", "Obras"], material: ["Rafia polipropileno"] },

  // ===== CHAPAS DECORATIVAS (de Desplegar - confirmadas) =====
  { id: "cd-lunas", nombre: "Chapa Decorativa Lunas", descripcion: "Diseño ornamental de efecto lunar. Área libre: 34%. Metal desplegado decorativo de alta calidad para revestimientos arquitectónicos, fachadas, cielorrasos y decoración de interiores.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Revestimientos architectónicos", "Fachadas", "Cielorrasos", "Decoración"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/lunas.png" },
  { id: "cd-puntos", nombre: "Chapa Decorativa Puntos", descripcion: "Diseño de puntos circulares. Área libre: 4%. Ideal para aplicaciones industriales y decorativas que requieren alta circulación de aire.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Ventilación", "Cribado", "Decoración"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/puntos.png" },
  { id: "cd-areca", nombre: "Chapa Decorativa Areca", descripcion: "Diseño ornamental inspirado en palmera. Área libre: 35%. Perfecto para crear ambientes tropicales y naturales en decoración.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Revestimientos", "Decoración", "Mamparas"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/areca.png" },
  { id: "cd-ficus", nombre: "Chapa Decorativa Ficus", descripcion: "Diseño de hojas de ficus entrelazadas. Área libre: 22%. Excelente para ventilación con estética natural.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Revestimientos", "Decoración", "Ventilación"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/ficus.png" },
  { id: "cd-burbujas", nombre: "Chapa Decorativa Burbujas", descripcion: "Diseño de burbujas entrelazadas. Área libre: 50%. Alta circulación de aire con diseño moderno.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Ventilación", "Filtros decorativos", "Revestimientos"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/burbujas.png" },
  { id: "cd-espuma", nombre: "Chapa Decorativa Espuma", descripcion: "Diseño de espuma expandida. Área libre: 54%. Máximo flujo de aire con patrón orgánico.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Ventilación", "Cribado", "Filtros"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/espuma.png" },
  { id: "cd-pampa", nombre: "Chapa Decorativa Pampa", descripcion: "Diseño pampeano de líneas entrecruzadas. Área libre: 9%. Estética rustica y moderna.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Revestimientos", "Decoración"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/pampa.png" },
  { id: "cd-selva", nombre: "Chapa Decorativa Selva", descripcion: "Diseño de follaje selvático. Área libre: 20%. Patrón natural de alta densidad.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Revestimientos", "Decoración", "Fachadas"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/selva.png" },
  { id: "cd-rayones", nombre: "Chapa Decorativa Rayones", descripcion: "Diseño de rayas paralelas. Área libre: 36%. Patrón lineal moderno.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Revestimientos", "Decoración", "Separadores"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/rayones.png" },
  { id: "cd-puntos-plus", nombre: "Chapa Decorativa Puntos+", descripcion: "Diseño de puntos grandes. Área libre: 17%. Equilibrio entre ventilación y privacidad.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Ventilación", "Decoración", "Cribado"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/puntos-mas.png" },
  { id: "cd-galaxia", nombre: "Chapa Decorativa Galaxia", descripcion: "Diseño estelar tipo galaxy. Área libre: 22%. Patrón de estrellas agrupadas.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/galaxia.png" },
  { id: "cd-lineas", nombre: "Chapa Decorativa Lineas", descripcion: "Diseño de líneas horizontales. Área libre: 6%. Patrón lineal sutil.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/lineas.png" },
  { id: "cd-diagonales", nombre: "Chapa Decorativa Diagonales", descripcion: "Diseño de líneas diagonales. Área libre: 4%. Efecto dinámico.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/diagonales.png" },
  { id: "cd-verticales", nombre: "Chapa Decorativa Verticales", descripcion: "Diseño de líneas verticales. Área libre: 5%. Efecto de privacidad vertical.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/verticales.png" },
  { id: "cd-cafe", nombre: "Chapa Decorativa Cafe", descripcion: "Diseño de cafes concéntricos. Área libre: 4%. Patrón clásico de ondas.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/cafe.png" },
  { id: "cd-floral", nombre: "Chapa Decorativa Floral", descripcion: "Diseño floral ornamental. Área libre: 36%. Patrón floral de alta definición.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos", "Fachadas"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/floral.png" },
  { id: "cd-brisa", nombre: "Chapa Decorativa Brisa", descripcion: "Diseño de brisa ondulada. Área libre: 41%. Patrón suave y fluido.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos", "Ventilación"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/brisa.png" },
  { id: "cd-flechas", nombre: "Chapa Decorativa Flechas", descripcion: "Diseño direccional de flechas. Área libre: 18%. Patrón dinámico direccional.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/flechas.png" },
  { id: "cd-pixel", nombre: "Chapa Decorativa Pixel", descripcion: "Diseño de píxeles rectangulares. Área libre: 10%. Estética digital y moderna.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/pixel.png" },
  { id: "cd-degrade", nombre: "Chapa Decorativa Degrade", descripcion: "Diseño degradé de tamaño. Área libre: 8%. Transición de holes pequeños a grandes.", precio: 0, categoria: "chapas", empresa: "Desplegados Sur", unidad: "por m2", medidas: "1.22 x 2.44m", aplicaciones: ["Decoración", "Revestimientos", "Fachadas"], material: ["Hierro", "Acero Galvanizado"], imagen: "/images/chapas-decorativas/degrade.png" }
];

export const categorias = [
  { 
    id: "desplegados", 
    nombre: "Metal Desplegado", 
    icono: "MD", 
    imagen: "/images/productos/metal desplegado.jpg",
    descripcion: "Metal desplegado liviano, mediano, pesado y reforzado para yeseros. Material maleable y fácil de cortar, adaptable a diferentes formas y tamaños. Entregado en paquetes de 10 hojas (15 mts2) con tratamiento de pintura asfáltica anticorrosiva.",
    aplicaciones: ["Yesería", "Mochetas", "Revoque de vigas", "Piletas de natación", "Ductos", "Taparrollos", "Reparación de rajaduras", "Soporte de revoque"],
    subcategorias: [
      { id: "metal-yeseria", nombre: "Metal para Yesería", imagen: "/images/productos/metal desplegado.jpg" },
      { id: "guardacantos", nombre: "Guardacantos", imagen: "/images/productos/metal desplegado.jpg" }
    ]
  },
  { 
    id: "chapas", 
    nombre: "Chapas Decorativas", 
    icono: "CH", 
    imagen: "/images/chapas-decorativas/burbujas.png",
    descripcion: "Chapas perforadas decorativas en hierro y acero galvanizado. 20 diseños diferentes para arquitectura, fachadas, cielorrasos y decoración de interiores.",
    aplicaciones: ["Revestimientos arquitectónicos", "Fachadas", "Cielorrasos", "Decoración de interiores", "Ventilación"],
    subcategorias: [
      { id: "chapas", nombre: "Decorativas", imagen: "/images/chapas-decorativas/burbujas.png" }
    ]
  },
  { 
    id: "mallas", 
    nombre: "Mallas", 
    icono: "ML", 
    imagen: "/images/productos/malla de fibra de vidrio.webp",
    descripcion: "Mallas de fibra de vidrio antialcalinas para construcción. Gramajes de 75gr, 90gr y 110gr con diferentes cuadrículas.",
    aplicaciones: ["Revoque", "Steel framing", "EIFS", "Pisos cementicios", "Microcementicios"],
    subcategorias: [
      { id: "malla-75gr", nombre: "75gr 5x5mm", imagen: "/images/productos/malla de fibra de vidrio.webp" },
      { id: "malla-90gr", nombre: "90gr 5x5mm", imagen: "/images/productos/malla de fibra de vidrio.webp" },
      { id: "malla-110gr", nombre: "110gr 10x10mm", imagen: "/images/productos/malla de fibra de vidrio.webp" }
    ]
  },
  { 
    id: "materiales", 
    nombre: "Materiales y Fijaciones", 
    icono: "MF", 
    imagen: "/images/productos/clavos.webp",
    descripcion: "Clavos, alambres, tornillos, concertinas, torniquetes y accesorios para construcción, campo e industria.",
    aplicaciones: ["Construcción", "Campo", "Industria", "Cercos", "Fijaciones"],
    subcategorias: [
      { id: "alambre-negro", nombre: "Alambre Negro", imagen: "/images/productos/alambre galvanizado.jpg" },
      { id: "alambre-galvanizado", nombre: "Alambre Galvanizado", imagen: "/images/productos/alambre galvanizado.jpg" },
      { id: "alambre-puas", nombre: "Alambre de Púas", imagen: "/images/productos/Alambre-puas-100.jpg" },
      { id: "concertina", nombre: "Concertinas", imagen: "/images/productos/concertina.jpg" },
      { id: "clavos", nombre: "Clavos", imagen: "/images/productos/clavos.webp" },
      { id: "tornillos-rep", nombre: "Tornillos", imagen: "/images/productos/clavos.webp" },
      { id: "hierro-dulce", nombre: "Hierro Dulce", imagen: "/images/productos/metal desplegado.jpg" },
      { id: "media-sombra", nombre: "Media Sombra", imagen: "/images/productos/malla metalica.webp" }
    ]
  }
];

export const empresas = [
  "MallasSur",
  "Desplegados Sur"
];