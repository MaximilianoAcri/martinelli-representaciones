import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad - Martinelli Representaciones",
  description: "Política de privacidad de Martinelli Representaciones. Cómo protegemos tus datos al solicitar presupuestos de chapas, mallas y grifería.",
  keywords: ["privacidad", "protección datos", "chapas perforadas", "mallas", "grifería"],
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <section className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm mb-4 inline-flex items-center gap-2">
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Política de Privacidad
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Martinelli Representaciones - Tu privacidad es importante
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h2 className="text-xl font-bold text-green-900 dark:text-green-200 mb-3">
              Nuestro Compromiso
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              En Martinelli Representaciones valoramos tu privacidad. Solo recopilamos la información necesaria para procesarte presupuestos y atenderte mejor. No vendemos ni compartimos tus datos con terceros.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">1. Información que Recopilamos</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">Recopilamos únicamente los datos que nos permitís:</p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>• <strong>Nombre y apellido</strong>: Para identificarte al contactarte</li>
              <li>• <strong>Teléfono</strong>: Para llamarte o escribirte por WhatsApp con el presupuesto</li>
              <li>• <strong>Email</strong>: Para enviarte confirmaciones y respuestas por escrito</li>
              <li>• <strong>Empresa/Negocio</strong>: Solo si nos lo indicás (opcional)</li>
              <li>• <strong>Productos de interés</strong>: Para preparar un presupuesto personalizado</li>
              <li>• <strong>Mensaje</strong>: Para entender tu consulta específica</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">2. Cómo Usamos tu Información</h2>
            <ul className="text-slate-600 dark:text-slate-300 space-y-3 mt-3">
              <li>• <strong>Procesar tu solicitud de presupuesto</strong>: Para calcular y enviarte la mejor propuesta</li>
              <li>• <strong>Contactarte directamente</strong>: Ya sea por WhatsApp, llamada o email</li>
              <li>• <strong>Seguimiento del pedido</strong>: Para mantenerte informado sobre el estado de tu compra</li>
              <li>• <strong>Mejorar nuestro servicio</strong>: Para atenderte mejor en el futuro</li>
              <li>• <strong> Registro en Mi Cuenta</strong>: Para que puedas ver tu historial de presupuestos</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. Almacenamiento de Datos</h2>
            <ul className="text-slate-600 dark:text-slate-300 space-y-3 mt-3">
              <li>• <strong>Firebase (Google Cloud)</strong>: Nuestra base de datos está en servidores seguros de Google en Estados Unidos.</li>
              <li>• <strong>Cifrado</strong>: Los datos se transmiten de forma encriptada (SSL).</li>
              <li>• <strong>Retención</strong>: Conservamos tus datos mientras seas cliente activo. Podés solicitar eliminación en cualquier momento.</li>
              <li>• <strong>Acceso restringido</strong>: Solo Maxi y Franco tienen acceso a tus datos.</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">4. Compartir Información</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              <strong>NO vendemos ni alquilamos</strong> tu información personal. Solo la compartimos cuando es necesario:
            </p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>• <strong>Fabricantes</strong>: Para gestionar tu pedido, compartimos datos como nombre, teléfono y productos solicitados.</li>
              <li>• <strong>Proveedores de servicios</strong>: Solo empresas que nos ayudan a operar el sitio (hosting, email).</li>
              <li>• <strong>Legal</strong>: Si la ley lo requiere.</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">5. Cookies y Tecnologías</h2>
            <ul className="text-slate-600 dark:text-slate-300 space-y-3 mt-3">
              <li>• <strong>Cookies esenciales</strong>: Mantienen tu sesión iniciada y recuerdan tus preferencias básicas.</li>
              <li>• <strong>No usamos cookies de terceros</strong>: No tenemos publicidad de Google, Facebook ni otras plataformas.</li>
              <li>• <strong>Mi Cuenta</strong>: Si te registrás, usamos cookies para mantener tu sesión.</li>
              <li>• <strong>Desactivar</strong>: Podés desactivar cookies en tu navegador, pero algunas funciones pueden no funcionar.</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">6. Tus Derechos</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">Tenés derecho a:</p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>• <strong>Acceder</strong>: Pedirnos una copia de tus datos</li>
              <li>• <strong>Corregir</strong>: Si tus datos son incorrectos</li>
              <li>• <strong>Eliminar</strong>: Solicitar que borremos tus datos</li>
              <li>• <strong>Oponerte</strong>: Si no querés que procesemos tus datos</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300 mt-3">
              Para ejercer estos derechos, contactanos por WhatsApp o email.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">7. Menores de Edad</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Este sitio está diseñado para profesionales y empresas del sector de la construcción. No recopilamos intencionalmente datos de menores de 18 años.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">8. Cambios en esta Política</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Podemos modificar esta política ocasionalmente. Si hay cambios importantes, los publicaremos en esta página. La fecha de última actualización siempre está al final.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">9. Contacto</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">Para preguntas sobre privacidad:</p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2 ml-4">
              <li>• <strong>WhatsApp</strong>: 15 5599 29083</li>
              <li>• <strong>Email</strong>: info@martinellimateriales.com</li>
            </ul>
          </div>

          <div className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8">
            <p>Última actualización: Abril 2026</p>
          </div>

        </div>
      </section>
    </div>
  );
}