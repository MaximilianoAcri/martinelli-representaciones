import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

function loadServiceAccount(): ServiceAccount {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (inline) {
    return JSON.parse(inline) as ServiceAccount;
  }

  const fromEnvPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (fromEnvPath && fs.existsSync(fromEnvPath)) {
    return JSON.parse(fs.readFileSync(fromEnvPath, "utf8")) as ServiceAccount;
  }

  const localDefault = path.join(
    process.cwd(),
    "credentials",
    "firebase-creds.json"
  );
  if (fs.existsSync(localDefault)) {
    return JSON.parse(fs.readFileSync(localDefault, "utf8")) as ServiceAccount;
  }

  throw new Error(
    "Firebase Admin: definí FIREBASE_SERVICE_ACCOUNT_JSON, o GOOGLE_APPLICATION_CREDENTIALS apuntando a un JSON, o colocá credentials/firebase-creds.json (solo local, nunca en el repo)."
  );
}

function getDb(): Firestore {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(loadServiceAccount()),
    });
  }
  return getFirestore();
}

/** Firestore Admin: se inicializa en el primer uso (build sin credenciales no falla). */
export const db = new Proxy({} as Firestore, {
  get(_target, prop, receiver) {
    const real = getDb();
    const value = Reflect.get(real, prop, receiver);
    if (typeof value === "function") {
      return value.bind(real);
    }
    return value;
  },
});
