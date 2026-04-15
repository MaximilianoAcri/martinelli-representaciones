import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones - Martinelli Representaciones",
  description: "Términos y condiciones de Martinelli Representaciones. Chapas perforadas, mallas, grifería y materiales de construcción. Ventas y presupuestos en Argentina.",
  keywords: ["términos", "condiciones", "chapas perforadas", "mallas", "grifería", "materiales construcción"],
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <section className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm mb-4 inline-flex items-center gap-2">
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Martinelli Representaciones - Chapas, Mallas, Grifería y Materiales
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3">
              Nuestra Actividad
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Martinelli Representaciones es una empresa comercializadora de materiales de construcción, especializada en la venta de chapas perforadas, chapas decorativas, mallas metálicas, grifería industrial y materiales para la construcción. No somos fabricantes, somos el puente entre los mejores fabricantes nacionales y vos.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">1. Aceptación</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Al navegar por nuestro sitio y solicitar presupuestos, aceptás estos términos. Si no estás de acuerdo, por favor no utilices nuestros servicios.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">2. Presupuestos y Cotizaciones</h2>
            <ul className="text-slate-600 dark:text-slate-300 space-y-3 mt-3">
              <li>• <strong>Los presupuestos son orientativos</strong>: los precios finales se confirman al momento de realizar el pedido, ya que pueden variar según disponibilidad y promociones de los fabricantes.</li>
              <li>• <strong>Sin obligación de compra</strong>: solicitar un presupuesto no te compromete a comprar.</li>
              <li>• <strong>Validez</strong>: los presupuestos tienen validez de 7 días corridos desde su emisión.</li>
              <li>• <strong>Stock</strong>: la disponibilidad de productos está sujeta a confirmación con los fabricantes.</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. Productos y Servicios</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3"> Comercializamos:</p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>• Chapas perforadas y decorativas (Metal Desplegado)</li>
              <li>• Mallas metálicas (hexagonal, gallinero, electrosoldada, simétrica)</li>
              <li>• Grifería industrial y comercial</li>
              <li>• Alambre, púas y cercos</li>
              <li>• Chapas de zinc, tejas y perfiles</li>
              <li>• Tornillos y accesorios de fijación</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">4. Entrega y Logística</h2>
            <ul className="text-slate-600 dark:text-slate-300 space-y-3 mt-3">
              <li>• <strong>Coordinación de entrega</strong>: coordinamos la entrega con vos. Los envíos los gestiona directamente el fabricante desde su planta.</li>
              <li>• <strong>Envíos a todo el país</strong>: podemos coordinar entregas a cualquier provincia de Argentina.</li>
              <li>• <strong>Costo de envío</strong>: se informa al momento del presupuesto según volumen y destino.</li>
              <li>• <strong>Retiro en fábrica</strong>: también podés retirar directamente en las plantas de los fabricantes.</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">5. Medios de Pago</h2>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>• Transferencia bancaria</li>
              <li>• Mercado Pago</li>
              <li>• Tarjetas de crédito y débito</li>
              <li>• Efectivo (solo en punto de entrega)</li>
              <li>• Cheques (para clientes con cuenta corriente)</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">6. Garantía</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Todos nuestros productos cuentan con garantía del fabricante. La garantía cubre defectos de fabricación y no cubre daños por mal uso, instalación incorrecta o condiciones climáticas extremas. Los tiempos de garantía varían según el producto y el fabricante.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">7. Devoluciones y Reclamos</h2>
            <ul className="text-slate-600 dark:text-slate-300 space-y-3 mt-3">
              <li>• <strong>Plazo</strong>: Las comunicaciones por problemas con el producto deben realizarse dentro de las 48hs de recibido el material.</li>
              <li>• <strong>Condición</strong>: El producto debe estar en su estado original, sin uso ni modificación.</li>
              <li>• <strong>Cambios</strong>: Solo se aceptan cambios por defectos de fabricación, previa verificación del fabricante.</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">8. Atención al Cliente</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">Nuestro equipo te atiende:</p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>• <strong>WhatsApp</strong>: 15 5992 90 83 (Maxi o Franco)</li>
              <li>• <strong>Email</strong>: martinellirepresentaciones@gmail.com</li>
              <li>• <strong>Horario</strong>: Lunes a viernes de 9:00 a 18:00hs</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">9. Propiedad Intelectual</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Todo el contenido de este sitio (catálogo, imágenes, descripciones, logos) es propiedad de Martinelli Representaciones. Está prohibida la reproducción total o parcial sin autorización escrita.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">10. Ley Aplicable</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Estos términos se rigen por las leyes de la República Argentina. Para cualquier disputa, los tribunales competentes serán los de la Ciudad de Buenos Aires.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}