import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseReady } from '@/lib/firebase-admin';

// Función helpers para alertas automáticas
export async function GET() {
  try {
    if (!isFirebaseReady()) {
      return NextResponse.json({ error: "Firebase no configurado" }, { status: 503 });
    }
    
    const ahora = new Date();
    const hace24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000);
    const hace48h = new Date(ahora.getTime() - 48 * 60 * 60 * 1000);
    
    // === ALERTA 1: Cotizaciones nuevas en las últimas 24hs ===
    const cotizacionesSnap = await db.collection('cotizaciones').get();
    const todasCotizaciones = cotizacionesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    
    const cotizacionesNuevas = todasCotizaciones.filter((c: any) => 
      c?.createdAt && new Date(c.createdAt) >= hace24h
    );
    
    // === ALERTA 2: Cotizaciones sin atender (más de 48h) ===
    const pendientes = todasCotizaciones.filter((c: any) => 
      (c?.estado === 'nueva' || c?.estado === 'pendiente') && 
      c?.createdAt && new Date(c.createdAt) < hace48h
    );
    
    // === ALERTA 3: Prospectos sin contactar (más de 7 días) ===
    const hace7dias = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000);
    const prospectosSnap = await db.collection('prospectos').get();
    const prospectosSinAtender = prospectosSnap.docs
      .map(d => d.data())
      .filter((p: any) => p?.estado === 'nuevo' && p?.createdAt && new Date(p.createdAt) <= hace7dias).length;
    
    // === RESUMEN ===
    const resumen = {
      timestamp: ahora.toISOString(),
      alertas: {
        cotizacionesNuevas24h: cotizacionesNuevas.length,
        pendientesAtencion: pendientes.length,
        prospectosSinContactar: prospectosSinAtender,
      },
      necesitaAccion: (
        cotizacionesNuevas.length === 0 && 
        pendientes.length > 0
      ),
      nivelAlerta: determinarNivel(cotizacionesNuevas.length, pendientes.length, prospectosSinAtender)
    };
    
    return NextResponse.json(resumen);
    
  } catch (error) {
    console.error('Error en alertas:', error);
    return NextResponse.json(
      { error: 'Error al obtener alertas' },
      { status: 500 }
    );
  }
}

function determinarNivel(nuevas: number, pendientes: number, prospectos: number): string {
  if (pendientes > 10 || prospectos > 50) return '🔴 CRÍTICO';
  if (pendientes > 5 || prospectos > 20) return '🟡 MEDIO';
  if (nuevas > 0 || pendientes > 0) return '🟢 NORMAL';
  return '⚪ SIN ACTIVIDAD';
}

// Webhook para verificar estado de cotizaciones (se puede chamar desde cron job)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo } = body;
    
    if (tipo === 'check-pendientes') {
      // Marcar cotizaciones pendientes como "seguimiento_requerido"
      const hace48h = new Date(Date.now() - 48 * 60 * 60 * 1000);
      const snapshot = await db.collection('cotizaciones')
        .where('estado', 'in', ['nueva', 'pendiente'])
        .get();
      
      let actualizados = 0;
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const fecha = new Date(data.createdAt);
        if (fecha < hace48h) {
          await doc.ref.update({
            estado: 'seguimiento_requerido',
            updatedAt: new Date().toISOString()
          });
          actualizados++;
        }
      }
      
      return NextResponse.json({
        success: true,
        mensaje: `${actualizados} cotizaciones marcadas para seguimiento`
      });
    }
    
    return NextResponse.json({ error: 'Tipo no válido' }, { status: 400 });
    
  } catch (error) {
    console.error('Error en webhook:', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}