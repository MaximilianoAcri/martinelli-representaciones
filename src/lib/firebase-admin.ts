import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";
import { restDb } from "./firestore-rest";

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

  return null;
}

// Class-based singleton to avoid const reassignment
class FirestoreManager {
  private static instance: Firestore | null = null;
  private static initialized = false;
  private static usingRest = false;

  static getInstance(): Firestore | null {
    if (this.instance) return this.instance;
    if (this.initialized) return null;

    const serviceAccount = loadServiceAccount();
    if (!serviceAccount) {
      // Fall back to REST client — no service account needed
      this.initialized = true;
      this.usingRest = true;
      console.info("Firebase Admin: using REST API fallback (no service account found).");
      return null; // signal to use restDb
    }

    try {
      initializeApp({ credential: cert(serviceAccount) });
      this.instance = getFirestore();
      this.initialized = true;
      return this.instance;
    } catch (e) {
      console.error("Error initializing Firebase Admin:", e);
      this.initialized = true;
      this.usingRest = true;
      return null;
    }
  }

  static isUsingRest(): boolean {
    if (!this.initialized) this.getInstance();
    return this.usingRest;
  }
}

export const firestore = new Proxy({} as Firestore, {
  get(_target, prop) {
    const real = FirestoreManager.getInstance();

    // If no Admin SDK instance, proxy to the REST client
    if (!real) {
      if (prop === "collection") {
        return (name: string) => restDb.collection(name);
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
  // Always ready: either via Admin SDK or via REST fallback
  return true;
}
