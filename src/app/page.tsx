import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { categorias } from "@/data/productos";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WhatsAppButton, CotizacionButton } from "@/components/CotizacionButton";
import { HeroSection } from "@/components/HeroSection";
import { Testimonials } from "@/components/Testimonials";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Inicio | Martinelli Representaciones",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div>
      {/* 1. HERO - El gancho inicial */}
      <HeroSection />

      {/* 2. SOBRE NOSOTROS - Credibilidad primero */}
      <AnimatedSection direction="up" delay={100}>
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-500/5 dark:bg-slate-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-slate-600 dark:text-slate-200 font-bold uppercase tracking-wider text-sm">
                  Sobre Nosotros
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-6">
                  Más de 20 años ofreciendo los mejores materiales
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-300">
                  <p className="text-lg leading-relaxed">
                    En <strong className="text-slate-900 dark:text-white">Martinelli Representaciones</strong> somos tu proveedor de confianza para materiales de construcción, chapas, mallas y grifería de primera calidad.
                  </p>
                  <p>
                    Trabajamos con los mejores fabricantes nacionales, trayéndote productos certificados con garantía.
                  </p>
                  <p>
                    Nuestro compromiso es la atención personalizada. Te asesoramos para que encuentres exactamente lo que necesitás, con precios competitivos y envíos a todo el país.
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">20+</div>
                    <div className="text-slate-500 dark:text-slate-300 text-sm">Años</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">95+</div>
                    <div className="text-slate-500 dark:text-slate-300 text-sm">Productos</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">100%</div>
                    <div className="text-slate-500 dark:text-slate-300 text-sm">Garantía</div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/nosotros" 
                    className="inline-flex items-center justify-center gap-2 text-slate-800 dark:text-white font-bold hover:text-blue-600 hover:gap-3 transition-all"
                  >
                    Conocenos más
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link 
                    href="/catalogo" 
                    className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 text-white px-6 py-2.5 rounded-lg font-medium transition-all"
                  >
                    Ver Catálogo
                  </Link>
                </div>
              </div>
              
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-slate-200 dark:bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold mb-1">Productos Certificados</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">Garantía de calidad</div>
                </div>
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-slate-200 dark:bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold mb-1">Coordinamos Entregas</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">Entrega rápida</div>
                </div>
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-slate-200 dark:bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold mb-1">Asesoría Personalizada</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">Expertos te ayudan</div>
                </div>
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-slate-200 dark:bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold mb-1">Precios Competitivos</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">El mejor valor</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 3. CATEGORÍAS - Lo que ofrecés */}
      <AnimatedSection direction="up" delay={150}>
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider text-sm">
                Catálogo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
                Nuestras Secciones
              </h2>
              <p className="text-slate-600 dark:text-white text-lg max-w-2xl mx-auto">
                Explorá todas nuestras categorías y encontrá los materiales que necesitás para tu proyecto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.id}
                  href={`/seccion/${categoria.id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={categoria.imagen} 
                      alt={categoria.nombre}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                    
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">{categoria.icono}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-bold text-white dark:text-slate-100 mb-1 group-hover:text-slate-300 transition-colors">
                      {categoria.nombre}
                    </h3>
                    
                    {categoria.subcategorias && (
                      <p className="text-slate-300 text-xs">
                        {categoria.subcategorias.length} tipos disponibles
                      </p>
                    )}
                    
                    <div className="mt-3 flex items-center text-white/80 font-medium text-sm group-hover:text-white">
                      <span>Ver productos</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link 
                href="/catalogo" 
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Ver Catálogo Completo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 4. NEWSLETTER - Captura cuando está interesado */}
      <AnimatedSection direction="up" delay={180}>
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="max-w-3xl mx-auto px-4 relative">
            <Newsletter />
          </div>
        </section>
      </AnimatedSection>

      {/* 5. ¿POR QUÉ ELEGIRNOS? - Diferenciación */}
      <AnimatedSection direction="up" delay={200}>
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <span className="text-slate-600 dark:text-slate-200 font-bold uppercase tracking-wider text-sm">
                Ventajas
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
                ¿Por qué elegirnos?
              </h2>
            </div>

            <WhyChooseUs />
          </div>
        </section>
      </AnimatedSection>

      {/* 6. PROCESO DE TRABAJO - Reducir fricción */}
      <AnimatedSection direction="up" delay={250}>
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <span className="text-slate-600 dark:text-slate-200 font-bold uppercase tracking-wider text-sm">
                Cómo Trabajamos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
                Nuestro Proceso
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
                Te acompañamos en cada paso para encontrar la mejor solución
              </p>
            </div>

            <ProcessTimeline />
          </div>
        </section>
      </AnimatedSection>

      {/* 7. TESTIMONIOS - Prueba social */}
      <AnimatedSection direction="up" delay={300}>
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-500/5 dark:bg-slate-500/10 rounded-full blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <span className="text-slate-600 dark:text-slate-200 font-bold uppercase tracking-wider text-sm">
                Nuestros Clientes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
                Empresas que confían en nosotros
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto mb-8">
                Acompañamos a corralones y constructoras de todo el país.
              </p>
            </div>
            <Testimonials />
          </div>
        </section>
      </AnimatedSection>

      {/* 8. FAQ - Resolver objeciones */}
      <AnimatedSection direction="up" delay={350}>
        <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider text-sm">
                Ayuda
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-2">
                Preguntas Frecuentes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">¿Hacen envíos a todo el país?</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Sí, coordinamos entregas a todo el país. El costo depende del volumen y tu ubicación.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">¿Tienen precios mayoristas?</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Sí, tenemos precios especiales para corralones, constructoras y revendedoras.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">¿Qué medios de pago aceptan?</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Transferencia, Mercado Pago, tarjetas de crédito/débito y efectivo.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">¿Cuánto tardan en responder?</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Respondemos en menos de 24 horas hábiles. Por WhatsApp suele ser más rápido.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">¿Tienen muestra de los productos?</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Sí, podemos enviarte muestras de algunos productos. Consultanos por el producto que necesitás.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">¿Hacen trabajos a medida?</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Sí, fabricamos productos según tus medidas y especificaciones. Hablá con nosotros.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link 
                href="/faq" 
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
              >
                Ver todas las preguntas
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 9. CTA FINAL - Llamado a la acción */}
      <AnimatedSection direction="up" delay={400}>
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-white text-sm font-medium">Atención rápida</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Necesitás ayuda para elegir?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Hablá directo con Maxi o Franco y te ayudamos a armar el pedido exacto que necesitás. 
              Te ayudamos a conseguir lo que necesitás.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton variant="green" size="lg">
                Chatear con Maxi o Franco
              </WhatsAppButton>
              <CotizacionButton size="lg">
                Solicitar Presupuesto
              </CotizacionButton>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}