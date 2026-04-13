import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

// PATCH - Actualizar prospecto
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, estado, notas } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (estado) updateData.estado = estado;
    if (notas !== undefined) updateData.notas = notas;

    await db.collection('prospectos').doc(id).update(updateData);

    return NextResponse.json({ 
      success: true, 
      message: 'Prospecto actualizado' 
    });
  } catch (error) {
    console.error('Error actualizando prospecto:', error);
    return NextResponse.json(
      { error: 'Error al actualizar prospecto' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar prospecto
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

    await db.collection('prospectos').doc(id).delete();

    return NextResponse.json({ 
      success: true, 
      message: 'Prospecto eliminado' 
    });
  } catch (error) {
    console.error('Error eliminando prospecto:', error);
    return NextResponse.json(
      { error: 'Error al eliminar prospecto' },
      { status: 500 }
    );
  }
}