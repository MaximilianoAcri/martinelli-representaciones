import Link from "next/link";
import { Metadata } from "next";
import { empresas } from "@/data/productos";
import { HistoryTimeline } from "@/components/HistoryTimeline";

export const metadata: Metadata = {
  title: "Nosotros - Martinelli Representaciones | Sobre Nuestra Empresa",
  description: "Conoce más sobre Martinelli Representaciones. Más de 20 años de experiencia en chapas perforadas, mallas, grifería y materiales. Atención personalizada y envíos a todo Argentina.",
  keywords: ["nosotros", "empresa", "historia", "Martinelli Representaciones", "chapas perforadas", "mallas"],
  openGraph: {
    title: "Nosotros - Martinelli Representaciones",
    description: "Más de 20 años de experiencia en chapas, mallas, grifería y materiales.",
  },
  alternates: {
    canonical: "/nosotros",
  },
};

export default function NosotrosPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-900 dark:text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
            ← Volver
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
            Conoce más sobre Martinelli Representaciones y nuestro compromiso con la calidad
          </p>
        </div>
      </section>

      {/* Historia y Valores */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-500/5 dark:bg-slate-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
<h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Más de 20 años ofreciendo los mejores materiales
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-lg">
                <p>
                  <strong className="text-slate-900 dark:text-white">Martinelli Representaciones</strong> te ofrece Chapas Perforadas, Mallas Metálicas, Grifería y Materiales de primera calidad.
                </p>
                <p>
                  Con más de 20 años de experiencia en el mercado argentino, trabajamos para ofrecerte los mejores productos con atención personalizada y precios competitivos.
                </p>
                <p>
                  Nuestro compromiso es ayudarte a encontrar exactamente lo que necesitás, asesorándote en cada paso del proceso de compra.
                </p>
                <p>
                  Trabajamos con productos de primera calidad y servicio directo de fábrica.
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-6 md:p-8 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white dark:text-white">20+</div>
                <div className="text-slate-600 dark:text-slate-300 dark:text-slate-400">Años de Experiencia</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 dark:bg-slate-800 p-6 md:p-8 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white dark:text-white">6+</div>
                <div className="text-slate-600 dark:text-slate-300 dark:text-slate-400">Fábricas Nacionales</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 md:p-8 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white dark:text-white">42+</div>
                <div className="text-slate-600 dark:text-slate-300 dark:text-slate-400">Productos</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 md:p-8 rounded-2xl text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white dark:text-white">100%</div>
                <div className="text-slate-600 dark:text-slate-300 dark:text-slate-400">Atención Personalizada</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 relative overflow-hidden">
        {/* Pattern decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/5 dark:bg-slate-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Nuestros Valores
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Lo que nos define y guía en cada interacción con vos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-600 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 dark:from-slate-600 dark:to-slate-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">CO</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Compromiso
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Nos comprometemos a entender tus necesidades y ofrecerte la mejor solución posible, siempre.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-600 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">CA</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Calidad
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Trabajamos solo con productos de primera calidad de los mejores fabricantes del mercado.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-600 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 dark:from-slate-600 dark:to-slate-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">CF</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Confianza
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Construimos relaciones duraderas basadas en la honestidad y el servicio honesto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline de Historia */}
      <section className="py-16 md:py-24 bg-slate-200 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
<h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white dark:text-white mb-4">
            Nuestra Historia
          </h2>
          <p className="text-slate-600 dark:text-slate-300 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Más de 20 años de trayectoria en el mercado argentino
            </p>
          </div>

          <HistoryTimeline />
        </div>
      </section>



      {/* Por qué elegirnos vs MaleMax */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Por qué elegirnos */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                ¿Por qué elegir Martinelli Representaciones?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-slate-600 dark:text-slate-300 text-xl">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Atención personalizada y asesoramiento técnico</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-600 dark:text-slate-300 text-xl">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Los mejores precios del mercado</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-600 dark:text-slate-300 text-xl">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Envíos a todo el país</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-600 dark:text-slate-300 text-xl">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Productos de primera calidad garantizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-600 dark:text-slate-300 text-xl">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Más de 20 años de experiencia en el mercado</span>
                </li>
              </ul>
            </div>

            {/* Servicios */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Nuestros Servicios
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Venta de Chapas Perforadas y Decorativas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Venta de Mallas Metálicas (Hexagonal, Gallinero, Simétrica)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Venta de Grifería Industrial y Comercial</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Venta de Materiales de Construcción</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">Asesoramiento técnico personalizado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitás más información?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Escribinos y te contamos todo sobre nuestros productos y servicios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/541559929083"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-200 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chatear por WhatsApp
            </a>
            <Link 
              href="/contacto" 
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}