"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const esProspectos = pathname?.includes("prospectos");

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header con navegación */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard - Martinelli Representaciones</h1>
              <p className="text-sm text-slate-200">
                {esProspectos ? "Gestión de clientes potenciales" : "Gestión de cotizaciones"}
              </p>
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
                Cotizaciones
              </Link>
              <Link 
                href="/dashboard/prospectos" 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  esProspectos 
                    ? "bg-slate-600 text-white shadow-sm" 
                    : "text-slate-300 hover:bg-slate-600 hover:text-white"
                }`}
              >
                Prospectos
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}