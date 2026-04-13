import type { NextConfig } from "next";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** Carga .env.local / .env desde esta carpeta (por si Next detecta otra raíz y no inyecta NEXT_PUBLIC_*). */
function loadLocalEnvFiles() {
  for (const name of [".env.local", ".env"]) {
    const full = path.join(projectRoot, name);
    if (!fs.existsSync(full)) continue;
    const text = fs.readFileSync(full, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (key && process.env[key] === undefined) {
        process.env[key] = val;
      }
    }
  }
}

loadLocalEnvFiles();

const nextConfig: NextConfig = {
  // Evita que Turbopack tome otra carpeta (p. ej. otro package-lock en el home) y deje de leer .env.local
  turbopack: {
    root: projectRoot,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
