import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const { uid, email, nombre } = await request.json();

    if (!uid || !email) {
      return NextResponse.json({ error: "UID y email son requeridos" }, { status: 400 });
    }

    const userRef = db.collection("usuarios").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Crear nuevo usuario
      await userRef.set({
        uid,
        email,
        nombre: nombre || "",
        telefono: "",
        empresa: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Actualizar último acceso
      await userRef.update({
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en /api/usuarios:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "UID requerido" }, { status: 400 });
    }

    const userDoc = await db.collection("usuarios").doc(uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ usuario: userDoc.data() });
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
