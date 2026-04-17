import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseReady } from '@/lib/firebase-admin';

// Cachear por 1 minuto (60 segundos) - para reducir lecturas
export const revalidate = 60;
export const dynamic = 'force-dynamic';

// POST - Importar prospectos desde JSON (enviado por el cliente)
export async function POST(request: NextRequest) {
  try {
    if (!isFirebaseReady()) {
      return NextResponse.json({ error: "Firebase no configurado" }, { status: 503 });
    }
    
    const body = await request.json();
    const { prospectos, provincia } = body;

    if (!prospectos || !Array.isArray(prospectos)) {
      return NextResponse.json(
        { error: 'Se requiere un array de prospectos' },
        { status: 400 }
      );
    }

    let importados = 0;
    let duplicados = 0;

    for (const p of prospectos) {
      // Buscar si ya existe por teléfono
      const telefonoLimpio = (p.Teléfono || '').replace(/\D/g, '');
      
      if (!telefonoLimpio) continue;

      const existing = await db.collection('prospectos')
        .where('telefonoLimpio', '==', telefonoLimpio)
        .limit(1)
        .get();

      if (!existing.empty) {
        duplicados++;
        continue;
      }

      // Extraer tipo de la dirección (ej: "Tienda de materiales para la construcción", "Ferretería", etc.)
      const direccionInfo = p['Dirección / Info'] || '';
      const tipo = direccionInfo.includes('Ferretería') ? 'ferretería' :
                   direccionInfo.includes('Tienda de materiales') ? 'corralón' :
                   direccionInfo.includes(' corralón') ? 'corralón' :
                   'otro';

      await db.collection('prospectos').add({
        nombre: p.Nombre || '',
        zona: p['Zona / Localidad'] || '',
        telefono: p.Teléfono || '',
        telefonoLimpio,
        direccion: direccionInfo,
        googleMaps: p['URL Google Maps'] || '',
        provincia: provincia || '',
        tipo: tipo, // corralón, ferretería, otro
        estado: 'nuevo', // nuevo, contactado, no-contactado, cliente
        notas: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      importados++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Importados ${importados} prospectos. ${duplicados} duplicados omitidos.`
    });
  } catch (error) {
    console.error('Error importando prospectos:', error);
    return NextResponse.json(
      { error: 'Error al importar prospectos', details: String(error) },
      { status: 500 }
    );
  }
}

// GET - Obtener todos los prospectos
export async function GET() {
  try {
    const snapshot = await db.collection('prospectos')
      .orderBy('createdAt', 'desc')
      .get();

    const prospectos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ prospectos });
  } catch (error) {
    console.error('Error obteniendo prospectos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los prospectos', details: String(error) },
      { status: 500 }
    );
  }
}