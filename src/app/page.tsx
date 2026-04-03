import Link from "next/link";
import { categorias } from "@/data/productos";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { AnimatedSubtitle } from "@/components/AnimatedSubtitle";
import { CotizacionButton, WhatsAppButton } from "@/components/CotizacionButton";

export default function Home() {
  return (
    <div>
      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/541559929083"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover-lift"
        title="Chateá con nosotros"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-slate-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 slide-up">
              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                20+ años asesorando a industriales
              </span>
            </div>
              <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight slide-up animate-delay-100 flex items-center flex-wrap gap-2 md:gap-0 drop-shadow-lg">
                <img src="/m.png" alt="M" className="h-[1em] md:h-[1.3em] w-auto inline-block align-middle drop-shadow-lg" />
                <span className="text-gradient-static">artinelli</span>
                <span className="text-slate-900 dark:text-white">Representaciones</span>
              </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-4 slide-up animate-delay-200">
              Distribuidores oficiales de las mejores marcas
            </p>
            <AnimatedSubtitle />
            <div className="flex flex-col sm:flex-row gap-4 slide-up animate-delay-400 mt-8">
              <button 
                className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 px-8 py-4 rounded-xl font-semibold text-lg transition-all text-center text-white dark:text-slate-900 hover-lift hover-glow"
              >
                <Link href="/catalogo">
                  Explorar Productos
                </Link>
              </button>
              <CotizacionButton variant="secondary">
                Solicitar Cotización
              </CotizacionButton>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider slide-up">
                Sobre Nosotros
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-6 slide-up animate-delay-100">
                Experiencia y Calidad a tu Servicio
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 slide-up animate-delay-200">
                <p className="text-lg">
                  En <strong className="text-slate-900 dark:text-white">Martinelli Representaciones</strong> somos tu agente comercial de confianza para Chapas, Mallas, Grifería y Materiales.
                </p>
                <p>
                  Contamos con más de 20 años de experiencia en el mercado argentino, trabajando con los mejores fabricantes nacionales para ofrecerte productos de primera calidad.
                </p>
                <p>
                  Nuestro compromiso es la atención personalizada. Te asesoramos para que encuentres exactamente lo que necesitás, con precios competitivos y envíos a todo el país.
                </p>
              </div>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">20+</div>
                  <div className="text-slate-500 text-sm">Años de Experiencia</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">42+</div>
                  <div className="text-slate-500 text-sm">Productos</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">100%</div>
                  <div className="text-slate-500 text-sm">satisfacción</div>
                </div>
              </div>

              <div className="mt-8">
                <Link 
                  href="/nosotros" 
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:underline"
                >
                  Conocenos más
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-white dark:text-slate-900 font-bold text-lg">CP</span>
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold">Chapas Perforadas</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">Metalpar, Sinko, Acerbrag</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-white dark:text-slate-900 font-bold text-lg">MM</span>
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold">Mallas Metálicas</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">Hexagonal, Gallinero, Simétrica</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-white dark:text-slate-900 font-bold text-lg">GR</span>
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold">Grifería</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">Industrial y Comercial</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-white dark:text-slate-900 font-bold text-lg">MT</span>
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold">Materiales</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">TEFA y más</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nuestras Secciones
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Explorá nuestro catálogo por categoría y encontrá exactamente lo que necesitás.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categorias.map((categoria) => (
              <Link
                key={categoria.id}
                href={`/seccion/${categoria.id}`}
                className="group p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                  {categoria.nombre}
                </h3>
                <div className="flex items-center text-slate-600 dark:text-slate-400 font-medium">
                  <span>Ver productos</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo - Timeline */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Te acompañamos en cada étape para encontrar la mejor solución para vos
            </p>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ¿Por qué elegirnos?
            </h2>
          </div>

          <WhyChooseUs />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitás ayuda para elegir?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Escribinos y te ayudamos a encontrar exactamente lo que necesitás. 
            Somos tu agente comercial de confianza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton>
              Chatear con asesor
            </WhatsAppButton>
            <CotizacionButton>
              Solicitar Cotización
            </CotizacionButton>
          </div>
        </div>
      </section>
    </div>
  );
}