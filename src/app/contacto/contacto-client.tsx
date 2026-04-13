"use client";

import { useState } from "react";
import { categorias } from "@/data/productos";
import { db } from "@/lib/firebase-client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactoClient() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
    productos: [] as string[]
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    
    try {
      await addDoc(collection(db, "contactos"), {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        mensaje: formData.mensaje,
        productos: formData.productos,
        fecha: serverTimestamp(),
        estado: "nuevo"
      });
      
      setEnviado(true);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
        productos: []
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setEnviado(false), 5000);
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un problema al enviar tu mensaje. Podés contactarnos por WhatsApp.");
    } finally {
      setEnviando(false);
    }
  };
  
  const toggleProducto = (producto: string) => {
    setFormData(prev => ({
      ...prev,
      productos: prev.productos.includes(producto)
        ? prev.productos.filter(p => p !== producto)
        : [...prev.productos, producto]
    }));
  };
  
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h1>
          <p className="text-slate-300 dark:text-white text-lg">
            Escribinos y te ayudamos a encontrar lo que necesitás
          </p>
        </div>
      </section>

      {/* Opciones de contacto */}
      <section className="py-12 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <a
              href="https://wa.me/541559929083"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-slate-900 hover:bg-slate-800 text-white p-6 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-lg">Chateá por WhatsApp</p>
                <p className="text-slate-400 dark:text-slate-300">Respuesta inmediata</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@martinellimateriales.com"
              className="flex items-center gap-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white p-6 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-lg">Envianos un email</p>
                <p className="text-slate-500 dark:text-slate-300">info@martinellimateriales.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      
      {/* Formulario */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            O dejanos tu mensaje
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Nombre completo *
              </label>
              <input 
                type="text" 
                required
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Juan Pérez"
              />
            </div>
            
            {/* Email y Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email *
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="juan@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Teléfono
                </label>
                <input 
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="11 1234 5678"
                />
              </div>
            </div>
            
            {/* Productos de interés */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Productos de interés (opcional)
              </label>
              <div className="flex flex-wrap gap-2">
                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleProducto(cat.nombre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.productos.includes(cat.nombre)
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {cat.nombre}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mensaje */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Mensaje *
              </label>
              <textarea 
                rows={5}
                required
                value={formData.mensaje}
                onChange={(e) => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Contanos qué productos necesitás y te respondemos a la brevedad..."
              ></textarea>
            </div>
            
            {/* Botón enviar */}
            <button 
              type="submit"
              disabled={enviando}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              {enviando ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar Consulta"
              )}
            </button>
            
            {enviado && (
              <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl text-center">
                <p className="text-green-800 dark:text-green-300 font-medium">
                  ✓ Tu mensaje fue enviado. Te contactamos pronto.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-12 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/5 dark:bg-slate-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            Nuestra ubicación
          </h2>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.015267437854!2d-58.56323668459404!3d-34.67042168029434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbf3a1d4e3c3b%3A0x9a1e4a9a2a1a2a1a!2sMartinelli%20Representaciones!5e0!3m2!1ses!2sar!4v1234567890!5m2!1ses!2sar"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Martinelli Representaciones"
            ></iframe>
          </div>
          <p className="text-center text-slate-600 mt-4">
            Estamos en Zona Norte, Buenos Aires. Coordinamos la entrega con los fabricantes.
          </p>
        </div>
      </section>
    </div>
  );
}