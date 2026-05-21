import { NextRequest, NextResponse } from 'next/server';

// Generar PDF de "Sobre Nosotros" con diseño profesional
export async function GET(request: NextRequest) {
  try {
    // Generar HTML para el PDF con diseño mejorado
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Martinelli Representaciones - Sobre Nosotros</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    body { 
      font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; 
      color: #1e293b; 
      line-height: 1.7; 
      padding: 0;
      background: #fff;
    }
    
    .page {
      max-width: 850px;
      margin: 0 auto;
      background: #fff;
    }
    
    /* Header con gradiente */
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
      color: white;
      padding: 60px 50px;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%);
      border-radius: 50%;
    }
    
    .header::after {
      content: '';
      position: absolute;
      bottom: -30%;
      left: -10%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%);
      border-radius: 50%;
    }
    
    .header-content {
      position: relative;
      z-index: 1;
    }
    
    .logo { 
      font-size: 42px; 
      font-weight: 800; 
      margin-bottom: 8px;
      letter-spacing: -1px;
    }
    .logo span { color: #60a5fa; }
    .tagline { 
      font-size: 20px; 
      color: #94a3b8;
      font-weight: 300;
    }
    
    .header-stats {
      display: flex;
      gap: 40px;
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .header-stat {
      text-align: center;
    }
    .header-stat-number {
      font-size: 36px;
      font-weight: 700;
      color: #60a5fa;
    }
    .header-stat-label {
      font-size: 13px;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    /* Sections */
    .section { 
      padding: 50px; 
      border-bottom: 1px solid #e2e8f0;
    }
    .section:last-child { border-bottom: none; }
    
    .section-title { 
      font-size: 28px; 
      font-weight: 700; 
      margin-bottom: 25px; 
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .section-title .icon {
      width: 45px;
      height: 45px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 22px;
    }
    
    /* About text */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    .about-text {
      font-size: 16px;
      color: #475569;
      line-height: 1.8;
    }
    .about-text strong {
      color: #0f172a;
    }
    .about-highlight {
      background: linear-gradient(135deg, #eff6ff, #dbeafe);
      padding: 25px;
      border-radius: 16px;
      border-left: 4px solid #2563eb;
    }
    .about-highlight p {
      color: #1e40af;
      font-weight: 500;
    }
    
    /* Values */
    .values {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 25px;
    }
    .value-card {
      background: #fff;
      border: 2px solid #f1f5f9;
      border-radius: 20px;
      padding: 30px;
      text-align: center;
      transition: all 0.3s ease;
    }
    .value-card:hover {
      border-color: #2563eb;
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(37, 99, 235, 0.1);
    }
    .value-icon {
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, #eff6ff, #dbeafe);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 32px;
    }
    .value-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #0f172a;
    }
    .value-desc {
      font-size: 14px;
      color: #64748b;
      line-height: 1.6;
    }
    
    /* Services */
    .services {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }
    .service {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 20px 25px;
      background: #f8fafc;
      border-radius: 14px;
      transition: all 0.3s ease;
    }
    .service:hover {
      background: #f1f5f9;
      transform: translateX(5px);
    }
    .service-check {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
      font-weight: bold;
      flex-shrink: 0;
    }
    .service span {
      font-size: 15px;
      color: #334155;
      font-weight: 500;
    }
    
    /* Products */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .category {
      background: #f8fafc;
      border-radius: 16px;
      padding: 25px;
      transition: all 0.3s ease;
    }
    .category:hover {
      background: #f1f5f9;
      transform: translateY(-3px);
    }
    .category-icon {
      font-size: 32px;
      margin-bottom: 15px;
    }
    .category-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 15px;
      color: #0f172a;
    }
    .category ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .category li {
      padding: 6px 0;
      color: #64748b;
      font-size: 13px;
      border-bottom: 1px solid #e2e8f0;
    }
    .category li:last-child {
      border-bottom: none;
    }
    .category li::before {
      content: "→";
      color: #2563eb;
      margin-right: 8px;
      font-weight: 600;
    }
    
    /* Contact */
    .contact-section {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      padding: 60px 50px;
      color: white;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .contact-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    
    .contact-content {
      position: relative;
      z-index: 1;
    }
    
    .contact-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 15px;
    }
    .contact-subtitle {
      font-size: 18px;
      color: #94a3b8;
      margin-bottom: 40px;
    }
    
    .contact-methods {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 35px;
      flex-wrap: wrap;
    }
    .contact-method {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,0.1);
      padding: 18px 28px;
      border-radius: 14px;
      transition: all 0.3s ease;
    }
    .contact-method:hover {
      background: rgba(255,255,255,0.15);
      transform: translateY(-3px);
    }
    .contact-method-icon {
      font-size: 24px;
    }
    .contact-method-text {
      text-align: left;
    }
    .contact-method-label {
      font-size: 12px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .contact-method-value {
      font-size: 16px;
      color: white;
      font-weight: 600;
      text-decoration: none;
    }
    .contact-method a {
      color: white;
      text-decoration: none;
    }
    
    .whatsapp-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: white;
      padding: 20px 45px;
      border-radius: 14px;
      text-decoration: none;
      font-weight: 700;
      font-size: 18px;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
    }
    .whatsapp-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(34, 197, 94, 0.4);
    }
    
    /* Footer */
    .footer {
      background: #f8fafc;
      padding: 30px 50px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer-text {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 8px;
    }
    .footer-text strong {
      color: #0f172a;
    }
    
    /* Why choose us */
    .why-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 25px;
    }
    .why-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 14px;
    }
    .why-icon {
      width: 45px;
      height: 45px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      flex-shrink: 0;
    }
    .why-content h4 {
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 5px;
    }
    .why-content p {
      font-size: 14px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <div class="logo">Martinelli <span>Representaciones</span></div>
        <div class="tagline">Más de 20 años ofreciendo los mejores materiales de construcción</div>
        
        <div class="header-stats">
          <div class="header-stat">
            <div class="header-stat-number">20+</div>
            <div class="header-stat-label">Años de Experiencia</div>
          </div>
          <div class="header-stat">
            <div class="header-stat-number">6+</div>
            <div class="header-stat-label">Fábricas Aliadas</div>
          </div>
          <div class="header-stat">
            <div class="header-stat-number">100%</div>
            <div class="header-stat-label">Atención Personalizada</div>
          </div>
          <div class="header-stat">
            <div class="header-stat-number">AR</div>
            <div class="header-stat-label">Envíos a Todo el País</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sobre Nosotros -->
    <div class="section">
      <h2 class="section-title">
        <span class="icon">🏢</span>
        Sobre Nosotros
      </h2>
      <div class="about-grid">
        <div class="about-text">
          <p style="margin-bottom: 20px;">
            <strong>Martinelli Representaciones</strong> es una empresa argentina con más de 20 años de experiencia en el mercado de materiales de construcción. Nos especializamos en la comercialización de Chapas Perforadas, Mallas Metálicas, Grifería y Materiales de primera calidad.
          </p>
          <p style="margin-bottom: 20px;">
            Nuestro compromiso es ayudarte a encontrar exactamente lo que necesitás, asesorándote en cada paso del proceso de compra. Trabajamos directamente con fábricas nacionales, lo que nos permite ofrecerte precios competitivos sin sacrificar la calidad.
          </p>
          <p>
            Nos enorgullece construir relaciones duraderas con nuestros clientes basadas en la honestidad, el compromiso y el servicio profesional.
          </p>
        </div>
        <div class="about-highlight">
          <p>💡"No solo vendemos productos, sino soluciones integrales para cada proyecto de construcción"</p>
        </div>
      </div>
    </div>
    
    <!-- Valores -->
    <div class="section">
      <h2 class="section-title">
        <span class="icon">💎</span>
        Nuestros Valores
      </h2>
      <div class="values">
        <div class="value-card">
          <div class="value-icon">🤝</div>
          <div class="value-title">Compromiso</div>
          <div class="value-desc">Nos comprometemos a entender tus necesidades y ofrecerte la mejor solución posible, siempre.</div>
        </div>
        <div class="value-card">
          <div class="value-icon">⭐</div>
          <div class="value-title">Calidad</div>
          <div class="value-desc">Trabajamos solo con productos de primera calidad de los mejores fabricantes del mercado argentino.</div>
        </div>
        <div class="value-card">
          <div class="value-icon">💚</div>
          <div class="value-title">Confianza</div>
          <div class="value-desc">Construimos relaciones duraderas basadas en la honestidad y el servicio honesto.</div>
        </div>
      </div>
    </div>
    
    <!-- Por qué elegirnos -->
    <div class="section">
      <h2 class="section-title">
        <span class="icon">🎯</span>
        ¿Por Qué Elegirnos?
      </h2>
      <div class="why-grid">
        <div class="why-item">
          <div class="why-icon">✓</div>
          <div class="why-content">
            <h4>Atención personalizada</h4>
            <p>Asesoramiento técnico especializado para cada proyecto</p>
          </div>
        </div>
        <div class="why-item">
          <div class="why-icon">✓</div>
          <div class="why-content">
            <h4>Los mejores precios</h4>
            <p>Precios competitivos con servicio directo de fábrica</p>
          </div>
        </div>
        <div class="why-item">
          <div class="why-icon">✓</div>
          <div class="why-content">
            <h4>Envíos a todo el país</h4>
            <p>Distribución logística en toda Argentina</p>
          </div>
        </div>
        <div class="why-item">
          <div class="why-icon">✓</div>
          <div class="why-content">
            <h4>Productos garantizados</h4>
            <p>Calidad asegurada con respaldo de fabricantes</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Servicios -->
    <div class="section">
      <h2 class="section-title">
        <span class="icon">🔧</span>
        Nuestros Servicios
      </h2>
      <div class="services">
        <div class="service">
          <span class="service-check">✓</span>
          <span>Venta de Chapas Perforadas y Decorativas</span>
        </div>
        <div class="service">
          <span class="service-check">✓</span>
          <span>Venta de Mallas Metálicas (todas las variantes)</span>
        </div>
        <div class="service">
          <span class="service-check">✓</span>
          <span>Venta de Grifería Industrial y Comercial</span>
        </div>
        <div class="service">
          <span class="service-check">✓</span>
          <span>Venta de Materiales de Construcción</span>
        </div>
        <div class="service">
          <span class="service-check">✓</span>
          <span>Asesoramiento técnico personalizado</span>
        </div>
        <div class="service">
          <span class="service-check">✓</span>
          <span>Envíos a todo el país</span>
        </div>
      </div>
    </div>
    
    <!-- Productos -->
    <div class="section">
      <h2 class="section-title">
        <span class="icon">📦</span>
        Nuestros Productos
      </h2>
      <div class="products-grid">
        <div class="category">
          <div class="category-icon">🏗️</div>
          <div class="category-title">Metal para Yesería</div>
          <ul>
            <li>Metal Desplegado Liviano</li>
            <li>Metal Desplegado Mediano</li>
            <li>Metal Desplegado Reforzado</li>
            <li>Metal Desplegado Pesado</li>
            <li>Guardacantos Galvanizado</li>
          </ul>
        </div>
        <div class="category">
          <div class="category-icon">🔲</div>
          <div class="category-title">Mallas</div>
          <ul>
            <li>Malla Fibra de Vidrio 75gr</li>
            <li>Malla Fibra de Vidrio 90gr</li>
            <li>Malla Fibra de Vidrio 110gr</li>
            <li>Cantonera PVC</li>
          </ul>
        </div>
        <div class="category">
          <div class="category-icon">🪵</div>
          <div class="category-title">Alambre</div>
          <ul>
            <li>Alambre Negro Recocido</li>
            <li>Alambre Galvanizado</li>
            <li>Alambre de Púas</li>
            <li>Alambre San Martín</li>
            <li>Alambre Invencible</li>
          </ul>
        </div>
        <div class="category">
          <div class="category-icon">🔒</div>
          <div class="category-title">Seguridad perimetral</div>
          <ul>
            <li>Concertina Barbada</li>
            <li>Flatwrap</li>
            <li>Alambre Tejido Romboidal</li>
            <li>Malla Seguridad Naranja</li>
          </ul>
        </div>
        <div class="category">
          <div class="category-icon">🏠</div>
          <div class="category-title">Materiales</div>
          <ul>
            <li>Tornillos Autoperforantes</li>
            <li>Torniquetes</li>
            <li>Clavos (varios tipos)</li>
            <li>Film de Polietileno</li>
            <li>Media Sombra</li>
            <li>Rafia Cubre Cerco</li>
          </ul>
        </div>
        <div class="category">
          <div class="category-icon">🎨</div>
          <div class="category-title">Chapas Decorativas</div>
          <ul>
            <li>Chapa Decorativa Lunas</li>
            <li>Chapa Decorativa Puntos</li>
            <li>Chapa Decorativa Areca</li>
            <li>Chapa Decorativa Ficus</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Contacto -->
    <div class="contact-section">
      <div class="contact-content">
        <div class="contact-title">¿Necesitás más información?</div>
        <div class="contact-subtitle">Escribinos y te asesoramos sin compromiso</div>
        
        <div class="contact-methods">
          <div class="contact-method">
            <div class="contact-method-icon">📱</div>
            <div class="contact-method-text">
              <div class="contact-method-label">WhatsApp</div>
              <div class="contact-method-value">
                <a href="https://wa.me/5411599229083">15 5992 90 83</a>
              </div>
            </div>
          </div>
          <div class="contact-method">
            <div class="contact-method-icon">📧</div>
            <div class="contact-method-text">
              <div class="contact-method-label">Email</div>
              <div class="contact-method-value">
                <a href="mailto:martinellirepresentaciones@gmail.com">martinellirepresentaciones@gmail.com</a>
              </div>
            </div>
          </div>
          <div class="contact-method">
            <div class="contact-method-icon">📍</div>
            <div class="contact-method-text">
              <div class="contact-method-label">Ubicación</div>
              <div class="contact-method-value">Buenos Aires, Argentina</div>
            </div>
          </div>
        </div>
        
        <a href="https://wa.me/5411599229083" class="whatsapp-btn">
          💬 Chatear por WhatsApp
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-text">
        <strong>© ${new Date().getFullYear()} Martinelli Representaciones</strong> | Todos los derechos reservados
      </div>
      <div class="footer-text">
        Especialistas en Chapas, Mallas y Grifería | Envíos a todo el país
      </div>
    </div>
  </div>
</body>
</html>`;

    // Retornar HTML
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    
  } catch (error) {
    console.error('Error al generar PDF:', error);
    return NextResponse.json(
      { error: 'Error al generar PDF' },
      { status: 500 }
    );
  }
}