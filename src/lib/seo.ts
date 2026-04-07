export const seoConfig = {
  title: "Yayasan Markaz Qurrota A'yun - Lembaga Dakwah Islam",
  description:
    "Yayasan Markaz Qurrota A'yun adalah lembaga dakwah Islam yang berfokus pada pendidikan Qur'an, pembentukan karakter, dan pemberdayaan umat.",
  canonical: "https://qurrota-ayun.org",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://qurrota-ayun.org",
    siteName: "Yayasan Markaz Qurrota A'yun",
    images: [
      {
        url: "https://qurrota-ayun.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yayasan Markaz Qurrota A'yun",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@qurrota_ayun",
    site: "@qurrota_ayun",
    cardType: "summary_large_image",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Yayasan Markaz Qurrota A'yun",
  url: "https://qurrota-ayun.org",
  logo: "https://qurrota-ayun.org/logo.png",
  description:
    "Lembaga dakwah Islam yang berfokus pada pendidikan Qur'an dan pembentukan karakter.",
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
    "https://youtube.com/@qurrota-ayun",
  ],
};
