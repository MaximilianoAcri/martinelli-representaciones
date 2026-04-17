import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

function loadServiceAccount(): ServiceAccount | null {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (inline) {
    try {
      return JSON.parse(inline) as ServiceAccount;
    } catch (e) {
      console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_JSON:", e);
    }
  }

  const fromEnvPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (fromEnvPath && fs.existsSync(fromEnvPath)) {
    try {
      return JSON.parse(fs.readFileSync(fromEnvPath, "utf8")) as ServiceAccount;
    } catch (e) {
      console.error("Error reading credentials file:", e);
    }
  }

  const localDefault = path.join(
    process.cwd(),
    "credentials",
    "firebase-creds.json"
  );
  if (fs.existsSync(localDefault)) {
    try {
      return JSON.parse(fs.readFileSync(localDefault, "utf8")) as ServiceAccount;
    } catch (e) {
      console.error("Error reading local credentials:", e);
    }
  }

  console.warn("Firebase Admin: No credentials found. Firebase features will be disabled.");
  return null;
}

// Class-based singleton to avoid const reassignment
class FirestoreManager {
  private static instance: Firestore | null = null;
  private static initialized = false;

  static getInstance(): Firestore | null {
    if (this.instance) return this.instance;
    if (this.initialized) return null;

    const serviceAccount = loadServiceAccount();
    if (!serviceAccount) {
      this.initialized = true;
      return null;
    }

    try {
      initializeApp({ credential: cert(serviceAccount) });
      this.instance = getFirestore();
      this.initialized = true;
      return this.instance;
    } catch (e) {
      console.error("Error initializing Firebase Admin:", e);
      this.initialized = true;
      return null;
    }
  }
}

export const firestore = new Proxy({} as Firestore, {
  get(_target, prop) {
    const real = FirestoreManager.getInstance();
    if (!real) {
      if (typeof prop === 'string' && (prop === 'collection' || prop === 'doc' || prop === 'runTransaction')) {
        return () => {
          throw new Error("Firebase Admin not initialized. Add FIREBASE_SERVICE_ACCOUNT_JSON to your environment variables.");
        };
      }
      return undefined;
    }
    const value = Reflect.get(real, prop);
    if (typeof value === "function") {
      return value.bind(real);
    }
    return value;
  },
});

export const db = firestore;

export function isFirebaseReady(): boolean {
  return FirestoreManager.getInstance() !== null;
}