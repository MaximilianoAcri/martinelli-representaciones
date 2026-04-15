import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, estado } = body;

    if (!id || !estado) {
      return NextResponse.json(
        { error: 'ID y estado son requeridos' },
        { status: 400 }
      );
    }

    const cotizacionRef = db.collection('cotizaciones').doc(id);
    const doc = await cotizacionRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Cotización no encontrada' },
        { status: 404 }
      );
    }

    await cotizacionRef.update({
      estado,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Estado actualizado correctamente'
    });
  } catch (error) {
    console.error('Error actualizando cotización:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la cotización' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      );
    }

    await db.collection('cotizaciones').doc(id).delete();

    return NextResponse.json({ 
      success: true, 
      message: 'Cotización eliminada correctamente'
    });
  } catch (error) {
    console.error('Error eliminando cotización:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la cotización' },
      { status: 500 }
    );
  }
}