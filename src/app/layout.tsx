import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://qurrota-ayun.org"),
  title: "Yayasan Markaz Qurrota A'yun",
  description:
    "Lembaga dakwah Islam yang berfokus pada pendidikan Qur'an dan pembentukan karakter",
  keywords: [
    "yayasan islam",
    "pendidikan quran",
    "tahfidzul quran",
    "jakarta",
    "dakwah",
  ],
  authors: [{ name: "Yayasan Markaz Qurrota A'yun" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://qurrota-ayun.org",
    title: "Yayasan Markaz Qurrota A'yun",
    description:
      "Lembaga dakwah Islam yang berfokus pada pendidikan Qur'an dan pembentukan karakter",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yayasan Markaz Qurrota A'yun",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta name="theme-color" content="#08484A" />
        <link rel="canonical" href="https://qurrota-ayun.org" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Yayasan Markaz Qurrota A'yun",
              url: "https://qurrota-ayun.org",
              logo: "https://qurrota-ayun.org/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jalan Aup No.9 Rt.04 Rw.10",
                addressLocality: "Jakarta Selatan",
                addressRegion: "DKI Jakarta",
                postalCode: "12520",
                addressCountry: "ID",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62-XXX-XXXX-XXXX",
                email: "info@qurrota-ayun.org",
                contactType: "Customer Service",
              },
              sameAs: [
                "https://facebook.com/qurrota-ayun",
                "https://instagram.com/qurrota_ayun",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
