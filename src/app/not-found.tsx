import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-slate-200 dark:text-slate-800 leading-none select-none">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">Página no encontrada</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Ups, esta página se perdió
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            La página que buscás no existe o fue movida. Pero no te preocupes, tenemos lo que necesitás.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href="/"
              className="group inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-300 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>
            
            <Link 
              href="/catalogo"
              className="group inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
            >
              Ver Catálogo
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              También podés visitar:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/nosotros" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Nosotros</Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Link href="/contacto" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Contacto</Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Link href="/faq" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Preguntas Frecuentes</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}