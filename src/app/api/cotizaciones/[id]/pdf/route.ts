import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

// Generar PDF de cotización
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Obtener la cotización de Firebase
    const cotizacionRef = db.collection('cotizaciones').doc(id);
    const doc = await cotizacionRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Cotización no encontrada' },
        { status: 404 }
      );
    }
    
    const cotizacion = doc.data() as any;
    cotizacion.id = doc.id;
    
    // Generar HTML para el PDF
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Cotización ${cotizacion.id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; line-height: 1.5; padding: 40px; }
    .header { display: flex; justify-content: space-between; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #2563eb; }
    .logo { font-size: 24px; font-weight: bold; color: #1e293b; }
    .logo span { color: #2563eb; }
    .info { text-align: right; font-size: 14px; color: #64748b; }
    .title { font-size: 28px; font-weight: bold; margin-bottom: 20px; color: #1e293b; }
    .datos-cliente { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    .dato-label { font-size: 12px; color: #64748b; text-transform: uppercase; }
    .dato-valor { font-size: 16px; color: #1e293b; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th { background: #f1f5f9; padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #64748b; }
    td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
    .cantidad { text-align: center; }
    .precio { text-align: right; font-weight: bold; }
    .total { background: #f1f5f9; padding: 15px; text-align: right; font-size: 20px; font-weight: bold; }
    .mensaje { background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
    .contacto { margin-top: 20px; }
    .contacto a { color: #2563eb; text-decoration: none; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Martinelli <span>Representaciones</span></div>
    <div class="info">
      <div>Cotización #: ${cotizacion.id.substring(0, 8).toUpperCase()}</div>
      <div>Fecha: ${new Date(cotizacion.createdAt).toLocaleDateString('es-AR')}</div>
      <div>Estado: ${cotizacion.estado || 'Pendiente'}</div>
    </div>
  </div>
  
  <h1 class="title">Cotización</h1>
  
  <div class="datos-cliente">
    <div>
      <div class="dato-label">Cliente</div>
      <div class="dato-valor">${cotizacion.nombre}</div>
    </div>
    <div>
      <div class="dato-label">Teléfono</div>
      <div class="dato-valor">${cotizacion.telefono}</div>
    </div>
    <div>
      <div class="dato-label">Email</div>
      <div class="dato-valor">${cotizacion.email || '-'}</div>
    </div>
    <div>
      <div class="dato-label">Empresa</div>
      <div class="dato-valor">${cotizacion.empresa || '-'}</div>
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Unidad</th>
      </tr>
    </thead>
    <tbody>
      ${(cotizacion.productos || []).map((p: any) => `
        <tr>
          <td>${p.nombre}</td>
          <td class="cantidad">${p.cantidad || 1}</td>
          <td>${p.unidad || 'unidad'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  
  ${cotizacion.mensaje ? `
  <div class="mensaje">
    <div class="dato-label">Mensaje del cliente:</div>
    <div>${cotizacion.mensaje}</div>
  </div>
  ` : ''}
  
  <div class="footer">
    <div class="contacto">
      <strong>Contacto:</strong> 
      <a href="https://wa.me/5411599229083">15 5992 90 83</a> | 
      <a href="mailto:martinellirepresentaciones@gmail.com">martinellirepresentaciones@gmail.com</a>
    </div>
    <div style="margin-top: 10px;">
      Martinelli Representaciones - Especialistas en Chapas, Mallas y Grifería
    </div>
  </div>
</body>
</html>`;

    // Retornar HTML para renderizar como PDF en el cliente
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    
  } catch (error) {
    console.error('Error al generar PDF:', error);
    return NextResponse.json(
      { error: 'Error al generarPDF' },
      { status: 500 }
    );
  }
}