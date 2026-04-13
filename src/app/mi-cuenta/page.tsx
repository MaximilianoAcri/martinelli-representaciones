"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

interface Cotizacion {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  empresa: string;
  productos: { id: string; nombre: string; unidad: string }[];
  mensaje: string;
  estado: string;
  createdAt: string;
  userId?: string;
}

export default function MiCuentaPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Cotizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pedidos" | "perfil">("pedidos");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      cargarPedidos();
    }
  }, [user]);

  const cargarPedidos = async () => {
    try {
      const response = await fetch(
        `/api/cotizaciones?userId=${user?.uid}`
      );
      if (!response.ok) throw new Error("Error");
      const data = await response.json();
      setPedidos(data.cotizaciones || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "nueva": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "contactada": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "completada": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "rechazada": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case "nueva": return "📋 Pendiente";
      case "contactada": return "📞 En contacto";
      case "completada": return "✅ Completada";
      case "rechazada": return "❌ Rechazada";
      default: return estado;
    }
  };

  const formatearFecha = (fechaStr: string) => {
    return new Date(fechaStr).toLocaleDateString("es-AR", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  ¡Hola, {user.displayName || "Cliente"}!
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/catalogo"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Ver Catálogo
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm font-medium transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-slate-800 rounded-xl p-1 mb-6 border border-slate-200 dark:border-slate-700 w-fit">
          <button
            onClick={() => setActiveTab("pedidos")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "pedidos"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Mis Pedidos ({pedidos.length})
          </button>
          <button
            onClick={() => setActiveTab("perfil")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "perfil"
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Mi Perfil
          </button>
        </div>

        {/* Content */}
        {activeTab === "pedidos" && (
          <div>
            {loading ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700">
                <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500 dark:text-slate-400">Cargando pedidos...</p>
              </div>
            ) : pedidos.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Todavía no tenés pedidos
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  Explorá nuestro catálogo y solicitá tu primera cotización. ¡Es fácil y rápido!
                </p>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Explorar Catálogo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {pedidos.map((pedido) => (
                  <div
                    key={pedido.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(pedido.estado)}`}>
                            {getEstadoTexto(pedido.estado)}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {formatearFecha(pedido.createdAt)}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">#{pedido.id.slice(0, 8)}</span>
                      </div>

                      {pedido.productos && pedido.productos.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Productos</p>
                          <ul className="space-y-1">
                            {pedido.productos.map((prod, idx) => (
                              <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                                {prod.nombre}
                                {prod.unidad && <span className="text-slate-400">({prod.unidad})</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {pedido.mensaje && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                          &ldquo;{pedido.mensaje}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "perfil" && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Datos de tu cuenta</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Nombre</label>
                  <p className="text-slate-900 dark:text-white font-medium">{user.displayName || "No especificado"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email</label>
                  <p className="text-slate-900 dark:text-white font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Método de acceso</label>
                  <p className="text-slate-900 dark:text-white font-medium">
                    {user.providerData[0]?.providerId === "google.com" ? "Google" : "Email y contraseña"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Miembro desde</label>
                  <p className="text-slate-900 dark:text-white font-medium">
                    {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString("es-AR", { month: "long", year: "numeric" }) : "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 Para modificar tus datos de contacto o de empresa, comunicate con nosotros por{" "}
                <a href="https://wa.me/541559929083" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                  WhatsApp
                </a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
