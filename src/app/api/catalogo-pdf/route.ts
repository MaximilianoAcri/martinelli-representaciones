import { productos } from "@/data/productos";

export async function GET() {
  // Group products by category
  const productsByCategory: Record<string, typeof productos> = {} as any;
  
  productos.forEach((producto) => {
    const cat = producto.categoria || "otros";
    if (!productsByCategory[cat]) {
      productsByCategory[cat] = [];
    }
    productsByCategory[cat].push(producto);
  });

  // Build HTML content
  let htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Catálogo Martinelli Representaciones</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: #333;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #1a365d;
    }
    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 15px;
    }
    .company-name {
      font-size: 24px;
      font-weight: bold;
      color: #1a365d;
      margin-bottom: 8px;
    }
    .tagline {
      font-size: 13px;
      color: #4a5568;
    }
    .contact-info {
      margin-top: 15px;
      font-size: 11px;
      color: #4a5568;
    }
    .section {
      margin: 25px 0;
      page-break-before: always;
    }
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #1a365d;
      background: #edf2f7;
      padding: 10px 15px;
      margin-bottom: 15px;
      border-left: 4px solid #1a365d;
    }
    .product-grid {
      display: table;
      width: 100%;
      border-collapse: collapse;
    }
    .product-row {
      display: table-row;
    }
    .product-row:nth-child(even) {
      background: #f7fafc;
    }
    .product-cell {
      display: table-cell;
      padding: 10px 8px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
    }
    .cell-nombre {
      width: 30%;
    }
    .cell-medidas {
      width: 20%;
    }
    .cell-unidad {
      width: 15%;
    }
    .cell-empresa {
      display: none;
    }
    .cell-aplicaciones {
      width: 35%;
      font-size: 10px;
      color: #4a5568;
    }
    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 10px;
      color: #718096;
    }
    .page-break {
      page-break-after: always;
    }
    @media print {
      .section {
        page-break-before: always;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://martinellimateriales.com/m.png" alt="Martinelli" class="logo">
    <div class="company-name">MARTINELLI REPRESENTACIONES</div>
    <div class="tagline">Tu partner estratégico en materiales industriales</div>
    <div class="contact-info">
      📞 +54 9 11 5599 29083 | 📧 martinellirepresentaciones@gmail.com<br>
      🌐 www.martinellimateriales.com | 📍 Buenos Aires, Argentina
    </div>
  </div>
`;

  // Add each category
  Object.entries(productsByCategory).forEach(([category, products]) => {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    
    htmlContent += `
  <div class="section">
    <div class="section-title">${categoryName.toUpperCase()}</div>
    <div class="product-grid">
      <div class="product-row" style="background: #edf2f7; font-weight: bold;">
        <div class="product-cell cell-nombre">Producto</div>
        <div class="product-cell cell-medidas">Medidas</div>
        <div class="product-cell cell-unidad">Unidad</div>
        <div class="product-cell cell-aplicaciones">Aplicaciones</div>
      </div>
`;

    products.forEach((p) => {
      htmlContent += `
      <div class="product-row">
        <div class="product-cell cell-nombre">${p.nombre}</div>
        <div class="product-cell cell-medidas">${p.medidas || "-"}</div>
        <div class="product-cell cell-unidad">${p.unidad || "-"}</div>
        <div class="product-cell cell-aplicaciones">${p.aplicaciones?.join(", ") || "-"}</div>
      </div>`;
    });

    htmlContent += `</div></div>`;
  });

  htmlContent += `
  <div class="footer">
    <p>Martinelli Representaciones - Asesoramiento técnico especializado y atención personalizada</p>
    <p>Más de 20 años de experiencia acompañando a la industria | Envíos a todo el país</p>
    <p>Este catálogo fue generado el ${new Date().toLocaleDateString("es-AR")}</p>
  </div>
</body>
</html>`;

  return new Response(htmlContent, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}