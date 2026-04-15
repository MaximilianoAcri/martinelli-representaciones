import { NextResponse } from 'next/server';

export async function GET() {
  // Verificar variables de Firebase
  const hasApiKey = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const hasAuthDomain = !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const hasProjectId = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const hasAppId = !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
  
  // Verificar si las variables son las correctas
  const configStatus = {
    apiKey: hasApiKey ? 'OK' : 'FALTA',
    authDomain: hasAuthDomain ? 'OK' : 'FALTA',
    projectId: hasProjectId ? 'OK' : 'FALTA',
    appId: hasAppId ? 'OK' : 'FALTA',
    projectIdValue: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NO CONFIGURADO',
    authDomainValue: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'NO CONFIGURADO',
  };
  
  return NextResponse.json({
    firebaseConfig: configStatus,
    mensaje: 'Verificá que Google Auth esté habilitado en Firebase Console → Authentication → Sign-in method → Google',
    pasos: [
      '1. Ir a Firebase Console',
      '2. Build → Authentication → Sign-in method',
      '3. Habilitar Google provider',
      '4. Agregar dominio: venta-productos-silk.vercel.app',
    ]
  });
}