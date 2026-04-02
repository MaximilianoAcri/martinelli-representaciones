import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://martinellimateriales.com"),
  title: {
    default: "Martinelli Representaciones - Chapas, Mallas, Grifería y Materiales",
    template: "%s | Martinelli Representaciones",
  },
  description: "Tu agente comercial de confianza para chapas perforadas, mallas metálicas, grifería industrial y materiales. Envíos a todo Argentina. Precios competitivos y atención personalizada.",
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
    "agente comercial materiales",
    "representaciones comerciales",
  ],
  authors: [{ name: "Martinelli Representaciones" }],
  creator: "Martinelli Representaciones",
  publisher: "Martinelli Representaciones",
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
    title: "Martinelli Representaciones - Chapas, Mallas, Grifería y Materiales",
    description: "Tu agente comercial de confianza para chapas perforadas, mallas, grifería y materiales. Envíos a todo Argentina.",
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
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Martinelli Representaciones",
              description: "Agente comercial de chapas perforadas, mallas, grifería y materiales",
              url: "https://martinellimateriales.com",
              telephone: "+54 9 11 5599 29083",
              email: "info@martinellimateriales.com",
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
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}