import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Representamos tu Marca | Martinelli Representaciones",
  description: "¿Sos fabricante de chapas, mallas o grifería? Buscamos representación comercial exclusiva. Ampliá tu red de distribuidores en todo Argentina.",
  keywords: ["representación comercial", "fabricante", "chapas", "mallas", "representante", "agente comercial"],
  openGraph: {
    title: "Representamos tu Marca | Martinelli Representaciones",
    description: "¿Sos fabricante? Buscamos representación comercial exclusiva en Argentina.",
  },
  alternates: {
    canonical: "/fabricantes",
  },
};

export default function FabricantesPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors text-sm mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            ¿Sos fabricante y querés llegar a más clientes?
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Somos <strong>Martinelli Representaciones</strong>. Buscamos representar marcas que cumplan en tiempo y forma — como la nuestra.
          </p>
        </div>
      </section>

      {/* Propuesta de Valor */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            ¿Por qué elegirnos como representantes de tu marca?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Red establecida */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H8m5 0v-2a3 3 0 00-5.356-1.857M17 20v-2a3 3 0 00-3-3h-5m5 0v2a3 3 0 01-3 3m0-2a3 3 0 013-3h5m-5 0h5m-5 0v2a3 3 0 01-3-3m0-2a3 3 0 013-3h5" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">Red Comercial Establecida</h3>
<p className="text-slate-600 dark:text-slate-300">
                Tenemos una red de +1.500 clientes activos en todo el país: corralones, constructoras y estudios de arquitectura.
              </p>
            </div>

            {/* Experiencia */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">+20 Años de Trayectoria</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Somos seriales y cumplimos. Buscamos fábricas que también cumplan — las dos cosas van de la mano.
              </p>
            </div>

            {/* Cobertura nacional */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">Cobertura Nacional</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Envíamos a todo el país. Tu producto llega a Buenos Aires, Córdoba, Tucumán, Mendoza y más.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*Qué buscamos */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            ¿Qué buscamos?
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">Chapas Perforadas y Decorativas</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Para arquitectura, industria y filtrado</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">Mallas Metálicas</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Hexagonal, gallinero, electrosoldada, simétrica</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">Grifería Industrial</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Para construcción, saneamiento e industria</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">Materiales de Construcción</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Clavos, tornillos, fijaciones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Te interesa que reprezentemos tu marca?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Escribinos y te contaba cómo trabajamos. Buscamos representación exclusiva o distribución preferente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/5411599229083"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribinos por WhatsApp
            </a>
            <a 
              href="mailto:martinellirepresentaciones@gmail.com"
              className="bg-blue-500 hover:bg-blue-400 border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Envianos un email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}