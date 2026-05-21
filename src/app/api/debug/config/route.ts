import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    firebase: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'OK' : 'FALTA',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'FALTA',
      serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT_JSON ? 'OK' : 'usando REST fallback',
    },
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN ? 'OK' : 'FALTA',
      chatId: process.env.TELEGRAM_CHAT_ID ? 'OK' : 'FALTA',
    },
    smtp: {
      host: process.env.SMTP_HOST || 'FALTA',
      user: process.env.SMTP_USER ? 'OK' : 'FALTA',
      pass: process.env.SMTP_PASS ? 'OK' : 'FALTA',
    },
  });
}