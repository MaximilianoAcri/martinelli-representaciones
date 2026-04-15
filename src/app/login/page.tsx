"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/mi-cuenta");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === "auth/invalid-credential") {
        setError("Email o contrasena incorrectos");
      } else if (err.code === "auth/too-many-requests") {
        setError("Demasiados intentos. Intenta de nuevo en unos minutos.");
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Error: " + err.code);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
      router.push("/mi-cuenta");
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Error al iniciar sesion con Google");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Marketing - Left Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 p-6 md:p-12 flex flex-col justify-center order-1 md:order-1 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-slate-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-lg relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <img src="/m.png" alt="M" className="w-12 h-12" />
            <span className="text-2xl font-bold text-white">Martinelli</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in animate-delay-100">
            Tu nexo directo con fabricas de calidad
          </h1>

          {/* Value props */}
          <div className="space-y-6 mt-8">
            <div className="flex items-start gap-4 animate-slide-up animate-delay-200">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.336 2.828.89l1.104 1.48a1.5 1.5 0 01-.522 2.178l-.94.47c-.89.44-1.83.7-2.85.7-.87 0-1.7-.18-2.47-.5l-.86-.43a1.5 1.5 0 00-1.05.09l-.94.94a1.5 1.5 0 01-2.178.522L4.336 8.89A3.52 3.52 0 013 6.17C3 4.995 3.995 4 5.17 4h1.103z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Compra al precio de fabrica</h3>
                <p className="text-slate-300 text-sm mt-1">Sin intermediarios. Directo de los mejores fabricantes.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-slide-up animate-delay-300">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Asesoria tecnica experta</h3>
                <p className="text-slate-300 text-sm mt-1">Maxi o Franco te ayudan a elegir el producto exacto.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-slide-up animate-delay-400">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2a2 2 0 00-2-2H3.055z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Envios a todo el pais</h3>
                <p className="text-slate-300 text-sm mt-1">Coordinamos la entrega segun tu ubicacion.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-white/20 animate-fade-in animate-delay-500">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">20+</div>
              <div className="text-slate-400 text-sm">Anos</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">136+</div>
              <div className="text-slate-400 text-sm">Productos</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">1500+</div>
              <div className="text-slate-400 text-sm">Clientes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form - Right Side */}
      <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-900 p-6 md:p-12 flex items-center justify-center order-2 md:order-2">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">Bienvenido de nuevo</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Ingresa a tu cuenta</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Contrasena
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Ingresando...
                  </>
                ) : (
                  "Ingresar"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
              <span className="text-sm text-slate-400">o</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm text-slate-700 dark:text-slate-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuar con Google
            </button>

            {/* Register */}
            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
              No tienes cuenta?{" "}
              <Link href="/registro" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Registrate gratis
              </Link>
            </p>

            {/* Info */}
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
              Puedes cotizar sin cuenta por WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}