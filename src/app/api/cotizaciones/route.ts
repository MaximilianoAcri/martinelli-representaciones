import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

// Cachear por 5 minutos (300 segundos) - reduce lecturas de Firebase drásticamente
export const revalidate = 300;
export const dynamic = 'force-dynamic';

// Función para obtener cotizaciones
async function getCotizacionesFromDB() {
  console.log('Obteniendo cotizaciones desde Firebase...');
  
  const cotizacionesRef = db.collection('cotizaciones');
  const snapshot = await cotizacionesRef.orderBy('createdAt', 'desc').get();
  
  const cotizaciones = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log('Cotizaciones obtenidas:', cotizaciones.length);
  return cotizaciones;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      nombre,
      telefono,
      email,
      empresa,
      productos,
      mensaje,
      userId,
    } = body;

    // Validar datos mínimos
    if (!nombre || !telefono) {
      return NextResponse.json(
        { error: 'Nombre y teléfono son requeridos' },
        { status: 400 }
      );
    }

    // Crear la cotización
    const cotizacionRef = db.collection('cotizaciones').doc();
    const cotizacion: Record<string, any> = {
      id: cotizacionRef.id,
      nombre,
      telefono,
      email: email || '',
      empresa: empresa || '',
      productos: productos || [],
      mensaje: mensaje || '',
      estado: 'nueva',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Si el usuario está logueado, vincular la cotización
    if (userId) {
      cotizacion.userId = userId;
    }

    await cotizacionRef.set(cotizacion);

    // Enviar notificación por Telegram si están las credenciales
    try {
      const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
      const telegramChatId = process.env.TELEGRAM_CHAT_ID;

      if (telegramToken && telegramChatId) {
        // Armar mensaje con los productos
        let productosText = productos?.length 
          ? productos.map((p: any) => `• ${p.nombre} (${p.unidad})`).join('\n')
          : 'Sin productos específicos';
        
        if (mensaje) {
          productosText += `\n\n📝 *Mensaje:* ${mensaje}`;
        }

        const textMsg = `🚨 *NUEVA COTIZACIÓN*\n\n` +
          `━━━━━━━━━━━━━━━━\n\n` +
          `👤 *Cliente:* ${nombre}\n` +
          `📞 *Teléfono:* ${telefono}\n` +
          `📧 *Email:* ${email || '-'}\n` +
          `🏢 *Empresa:* ${empresa || '-'}\n\n` +
          `🛒 *Productos solicitados:*\n${productosText}\n\n` +
          `━━━━━━━━━━━━━━━━\n\n` +
          `⏰ ${new Date().toLocaleString('es-AR', { 
            timeZone: 'America/Argentina/Buenos_Aires',
            dateStyle: 'medium',
            timeStyle: 'short'
          })}`;

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: textMsg,
            parse_mode: 'Markdown'
          })
        });
        console.log("Notificación de Telegram enviada exitosamente.");
      } else {
        console.log("No se encontró TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en el .env.local");
      }
    } catch (teleErr) {
      console.error("Error al notificar por Telegram:", teleErr);
    }

    // Enviar notificación por Email si están las credenciales
    try {
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const emailTo = process.env.EMAIL_TO || process.env.SMTP_USER;

      if (smtpHost && smtpUser && smtpPass) {
        // Armar email HTML
        const productosHtml = productos?.length 
          ? productos.map((p: any) => `<li>${p.nombre} (${p.unidad})</li>`).join('')
          : '<li>Sin productos específicos</li>';
        
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
    .label { color: #64748b; font-size: 12px; text-transform: uppercase; }
    .value { font-size: 16px; margin-bottom: 10px; }
    .productos { background: white; padding: 15px; border-radius: 8px; margin-top: 10px; }
    .footer { background: #1e293b; color: #94a3b8; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;">🚨 Nueva Cotización</h1>
      <p style="margin:5px 0 0;">Martinelli Representaciones</p>
    </div>
    <div class="content">
      <div class="label">Cliente</div>
      <div class="value"><strong>${nombre}</strong></div>
      
      <div class="label">Teléfono</div>
      <div class="value">${telefono}</div>
      
      <div class="label">Email</div>
      <div class="value">${email || '-'}</div>
      
      <div class="label">Empresa</div>
      <div class="value">${empresa || '-'}</div>
      
      <div class="productos">
        <div class="label">Productos solicitados:</div>
        <ul style="margin: 5px 0;">${productosHtml}</ul>
      </div>
      
      ${mensaje ? `
      <div style="margin-top: 15px;">
        <div class="label">Mensaje:</div>
        <div class="value">${mensaje}</div>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <p style="margin:0;">Recibido el ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
      <p style="margin:5px 0 0;">Martinelli Representaciones - martinelli.com.ar</p>
    </div>
  </div>
</body>
</html>`;

        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || '587'),
          secure: smtpPort === '465',
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: `"Martinelli Cotizaciones" <${smtpUser}>`,
          to: emailTo,
          subject: `🚨 Nueva Cotización de ${nombre} - ${telefono}`,
          html: emailHtml
        });
        
        console.log("Email de notificación enviado exitosamente.");
        
        // === ENVIAR EMAIL DE CONFIRMACIÓN AL CLIENTE ===
        if (email) {
          const productosListHtml = productos?.length 
            ? productos.map((p: any) => `<li><strong>${p.nombre}</strong> - ${p.cantidad || 1} ${p.unidad || 'unidad'}</li>`).join('')
            : '<li>Sin productos específicos</li>';
          
          const confirmadoHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de tu solicitud</title>
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;">
    <tr>
      <td align="center" style="padding:20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:bold;">✅ Solicitud Recibida</h1>
              <p style="margin:10px 0 0;color:#bfdbfe;font-size:16px;">Martinelli Representaciones</p>
            </td>
          </tr>
          
          <!-- Mensaje principal -->
          <tr>
            <td style="padding:30px 30px 10px;">
              <p style="margin:0;font-size:18px;color:#1e293b;text-align:center;">
                Hola <strong>${nombre}</strong> 👋
              </p>
              <p style="margin:15px 0;font-size:16px;color:#64748b;text-align:center;">
                Tu solicitud de cotización fue recibida correctamente.
              </p>
              <p style="margin:10px 0;font-size:14px;color:#475569;text-align:center;">
                Nos pondremos en contacto con vos a la brevedad para darte la mejor propuesta.
              </p>
            </td>
          </tr>
          
          <!-- Tu pedido -->
          <tr>
            <td style="padding:10px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;border-radius:8px;">
                <tr>
                  <td style="padding:15px;">
                    <p style="margin:0 0 10px;font-size:14px;color:#64748b;font-weight:bold;text-transform:uppercase;">Tu pedido</p>
                    <ul style="margin:0;padding-left:20px;color:#334155;font-size:15px;">
                      ${productosListHtml}
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!---info -->
          <tr>
            <td style="padding:10px 30px;">
              <p style="margin:0;font-size:14px;color:#64748b;">
                📞 <strong>Teléfono:</strong> ${telefono}
              </p>
              ${empresa ? `<p style="margin:5px 0 0;font-size:14px;color:#64748b;">🏢 <strong>Empresa:</strong> ${empresa}</p>` : ''}
            </td>
          </tr>
          
          <!-- Tiempo de respuesta -->
          <tr>
            <td style="padding:20px 30px 10px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#dbeafe;border-radius:8px;border:1px solid #93c5fd;">
                <tr>
                  <td style="padding:15px;text-align:center;">
                    <p style="margin:0;font-size:16px;color:#1e40af;font-weight:bold;">⏱️ Tiempo de respuesta</p>
                    <p style="margin:5px 0 0;font-size:14px;color:#1e3a8a;">Menor a 24 horas hábiles</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Contacto -->
          <tr>
            <td style="padding:20px 30px 30px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#64748b;">
                ¿Necesitás urgently? Contactanos directamente:
              </p>
              <p style="margin:10px 0 0;">
                <a href="https://wa.me/5411599229083" style="display:inline-block;background:#22c55e;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">💬 WhatsApp</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background:#1e293b;padding:20px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">Martinelli Representaciones</p>
              <p style="margin:5px 0 0;color:#64748b;font-size:11px;">martinelli.com.ar | Chantas, Mallas y Más</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

          await transporter.sendMail({
            from: `"Martinelli Representaciones" <${smtpUser}>`,
            to: email,
            subject: `✅ Tu solicitud de cotización fue recibida - Martinelli`,
            html: confirmadoHtml
          });
          
          console.log("Email de confirmación enviado al cliente:", email);
        }
      } else {
        console.log("No se encontró configuración SMTP en el .env.local");
      }
    } catch (emailErr) {
      console.error("Error al enviar email:", emailErr);
    }

    return NextResponse.json({ 
      success: true, 
      id: cotizacionRef.id,
      message: 'Cotización guardada correctamente'
    });
  } catch (error) {
    console.error('Error guardando cotización:', error);
    return NextResponse.json(
      { error: 'Error al guardar la cotización' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (userId) {
      // Filtrar cotizaciones del usuario
      const snapshot = await db.collection('cotizaciones')
        .where('userId', '==', userId)
        .get();
      const cotizaciones = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as any))
        .sort((a: any, b: any) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      return NextResponse.json({ cotizaciones });
    }

    const cotizaciones = await getCotizacionesFromDB();
    return NextResponse.json({ cotizaciones });
  } catch (error) {
    console.error('Error obteniendo cotizaciones:', error);
    return NextResponse.json(
      { error: 'Error al obtener las cotizaciones', details: String(error) },
      { status: 500 }
    );
  }
}