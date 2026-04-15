import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CotizacionProvider } from "@/components/CotizacionContext";
import { CotizacionModal } from "@/components/CotizacionModal";
import { AuthProvider } from "@/components/AuthContext";
import { FloatingCart } from "@/components/FloatingCart";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CotizacionToast } from "@/components/CotizacionToast";
import { CookieBanner } from "@/components/CookieBanner";
import { LeadCapturePopup } from "@/components/LeadCapturePopup";
import { MainContent } from "@/components/MainContent";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jsonLdBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Martinelli Representaciones",
  description:
    "Agente comercial de chapas perforadas, mallas, grifería y materiales",
  url: "https://martinellimateriales.com",
  telephone: "+54 9 11 5599 29083",
  email: "martinellirepresentaciones@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AR",
    addressRegion: "Buenos Aires",
  },
  areaServed: {
    "@type": "Country",
    name: "Argentina",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [],
  serviceType: [
    "Venta de chapas perforadas",
    "Venta de mallas metálicas",
    "Venta de grifería industrial",
    "Venta de materiales de construcción",
    "Representaciones comerciales",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://martinellimateriales.com"),
  title: {
    default: "Martinelli Representaciones - Chapas, Mallas, Grifería y Materiales",
    template: "%s | Martinelli Representaciones",
  },
  description:
    "Chapas perforadas, mallas metálicas, grifería industrial y materiales de construcción. Envíos a todo Argentina. Atención personalizada y mejores precios.",
  keywords: [
    "chapas perforadas",
    "mallas metálicas",
    "mallas hexagonales",
    "mallas gallinero",
    "grifería industrial",
    "materiales de construcción",
    "chapa decorativa",
    " Metalpar",
    "Sinko",
    "Acerbrag",
    "TEFA",
    "grifería Argentina",
    "envíos Argentina",
    "ventas materiales construction",
    "tienda materiales argentina",
  ],
  authors: [{ name: "Martinelli Representaciones" }],
  creator: "Martinelli Representaciones",
  publisher: "Martinelli Representaciones",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://martinellimateriales.com",
    siteName: "Martinelli Representaciones",
    title:
      "Martinelli Representaciones - Chapas, Mallas, Grifería y Materiales",
    description:
      "Chapas perforadas, mallas, grifería y materiales de construcción. Envíos a todo Argentina.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Martinelli Representaciones - Chapas, Mallas, Grifería y Materiales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Martinelli Representaciones",
    description: "Chapas, Mallas, Grifería y Materiales. Envíos a todo Argentina.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Descomentar y completar con tus códigos reales de Search Console cuando los tengas:
  // verification: {
  //   google: "tu-codigo-de-google",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={plusJakarta.variable}>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* Archivo estático: evita el aviso de React 19 por <script> con children en el cliente */}
        <Script
          id="theme-init"
          src="/theme-init.js"
          strategy="beforeInteractive"
        />
        <Script
          id="ld-json-business"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdBusiness),
          }}
        />
        <AuthProvider>
          <ThemeProvider>
            <CotizacionProvider>
              <Navbar />
              <MainContent>{children}</MainContent>
              <Footer />
              <FloatingWhatsApp />
              <FloatingCart />
              <CotizacionModal />
              <CotizacionToast />
              <CookieBanner />
              <LeadCapturePopup />
            </CotizacionProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
