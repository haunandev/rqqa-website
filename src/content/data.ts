import { Organization, Program, Unit } from "@/types";

export const organizationData: Organization = {
  name: "Yayasan Markaz Qurrota A'yun",
  foundedYear: 2022,
  address: {
    street: "Jalan Aup No.9 Rt.04 Rw.10",
    subdistrict: "Pasar Minggu",
    district: "Jakarta Selatan",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12520",
  },
  background: [
    "Yayasan Markaz Qurrota A'yun didirikan dari niatan untuk mencari ridho Allah SWT dan upaya untuk ikut aktif dalam perbaikan moral generasi bangsa dan umat Islam saat ini.",
    "Yayasan Markaz Qurrota A'yun terdaftar resmi di Kementerian Hukum dan HAM RI melalui akta Yayasan. Yayasan ini adalah lembaga nirlaba yang berorientasi pada dunia pendidikan dan dakwah di masyarakat.",
    "Harapan kami adalah hadirnya Yayasan Markaz Qurrota A'yun akan memberikan kontribusi nyata bagi Ummat Islam dan bangsa untuk semakin maju dan menggapai ridho Allah SWT, serta mendapat kemenangan dan kebaikan Dunia dan Akhirat.",
  ],
  vision:
    "Menjadi lembaga dakwah Islam yang berfokus pada ukhuwah dan optimalisasi potensi umat, guna mewujudkan generasi Islam yang berakhlak mulia.",
  missions: [
    "Menyelenggarakan tempat pendidikan Islam berbasis mulazamah",
    "Mewujudkan pendidikan Quran yang berkualitas serta berfokus pada pembentukan karakter dan adab Islami",
    "Mengembangkan program-program pemberdayaan umat melalui peningkatan potensi individu dan komunitas",
    "Mengintegrasikan nilai-nilai syariat islam dalam setiap aspek kehidupan",
    "Menghadirkan program bimbingan Islam dan Quran di masyarakat",
    "Melakukan kolaborasi dan sinergi dengan berbagai pihak guna memperluas jangkauan dan program dakwah",
    "Menyediakan program kaderisasi ulama dan dai di Timur Tengah/luar negeri bekerja sama dengan institusi pendidikan",
    "Memberikan beasiswa dan dukungan bagi yang membutuhkan dan berprestasi",
    "Membangun jaringan alumni dan masyarakat untuk saling mendukung dan berkolaborasi dalam berbagai kegiatan dakwah",
  ],
  contact: {
    email: "info@qurrota-ayun.org",
    phone: "+62 XXX XXXX XXXX",
    website: "https://qurrota-ayun.org",
  },
};

export const flagshipPrograms: Program[] = [
  {
    id: "1",
    title: "Pendidikan Mulazamah",
    slug: "pendidikan-mulazamah",
    category: "flagship",
    description:
      "Memberikan pendidikan Mulazamah yang sangat efektif dalam pembentukan karakter.",
    details: [
      "Program intensif berbasis pengajaran langsung dari guru",
      "Fokus pada pembentukan karakter dan kedisiplinan",
      "Integrasi nilai-nilai Islam dalam pembelajaran",
      "Mentor one-on-one untuk setiap siswa",
    ],
  },
  {
    id: "2",
    title: "Tahfidzul Qur'an",
    slug: "tahfidzul-quran",
    category: "flagship",
    description:
      "Program khusus untuk menghafal Al-Qur'an dengan metode yang efektif dan terstruktur mengedepankan kuatnya hafalan dan perbaikan bacaan.",
    details: [
      "Metode hafalan yang terbukti efektif",
      "Perbaikan kualitas bacaan (Tajweed)",
      "Pengulangan dan muraja'ah terstruktur",
      "Sertifikat resmi setelah menuntaskan target hafalan",
    ],
  },
  {
    id: "3",
    title: "Pengembangan Karakter",
    slug: "pengembangan-karakter",
    category: "flagship",
    description:
      "Program pembinaan akhlak melalui kegiatan ekstrakurikuler dan pengajian rutin yang mendukung pengembangan kepribadian Islami.",
    details: [
      "Aktivitas pembinaan akhlak harian",
      "Pengajian rutin berkelanjutan",
      "Mentoring personal untuk pengembangan karakter",
      "Program kepemimpinan dan soft skills",
    ],
  },
  {
    id: "4",
    title: "Sosial Kemasyarakatan",
    slug: "sosial-kemasyarakatan",
    category: "flagship",
    description:
      "Kegiatan sosial dan pemberdayaan masyarakat untuk membantu kaum dhuafa, anak yatim, dan masyarakat yang membutuhkan.",
    details: [
      "Program pendampingan keluarga kurang mampu",
      "Beasiswa untuk anak yatim dan berprestasi",
      "Kegiatan bakti sosial berkala",
      "Pemberdayaan ekonomi masyarakat",
    ],
  },
];

export const programUnits: Unit[] = [
  {
    id: "1",
    name: "Rumah Qur'an Qurrota A'yun",
    slug: "rumah-quran",
    description:
      "Pusat pendidikan Qur'an dengan fokus pada hafalan dan pemahaman.",
  },
  {
    id: "2",
    name: "Ma'Had Riyadhus Shalihin (MARS)",
    slug: "mars",
    description:
      "Ma'had (asrama) untuk pendidikan Islam intensif dan pembinaan karakter.",
  },
  {
    id: "3",
    name: "Kelas Qur'an",
    slug: "kelas-quran",
    description: "Program kelas Qur'an untuk berbagai tingkat kemampuan.",
  },
  {
    id: "4",
    name: "Markaz Mulazamah Mahasiswa Qurrota Ayun",
    slug: "markaz-mulazamah",
    description:
      "Program khusus untuk mahasiswa yang ingin intensif belajar Islam.",
  },
  {
    id: "5",
    name: "Lembaga Mitra Kerjasama",
    slug: "lembaga-mitra",
    description:
      "Kerjasama dengan berbagai institusi untuk memperluas jangkauan dakwah.",
  },
  {
    id: "6",
    name: "Kaderisasi Dai dan Ulama",
    slug: "kaderisasi-dai",
    description:
      "Program pengembangan kader dai dan ulama untuk menyebarkan dakwah Islam.",
  },
];
