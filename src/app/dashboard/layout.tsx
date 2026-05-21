"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const esProspectos = pathname?.includes("prospectos");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header con navegación */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <p className="text-white font-semibold leading-none text-sm">Martinelli</p>
                  <p className="text-slate-400 text-xs">Representaciones</p>
                </div>
              </div>

              {/* Navigation tabs */}
              <nav className="flex items-center gap-1 bg-slate-700 rounded-lg p-1">
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    !esProspectos
                      ? "bg-slate-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-600 hover:text-white"
                  }`}
                >
                  💼 Cotizaciones
                </Link>
                <Link
                  href="/dashboard/prospectos"
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    esProspectos
                      ? "bg-slate-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-600 hover:text-white"
                  }`}
                >
                  👥 Prospectos
                </Link>
              </nav>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
