"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
}

const photos: PhotoItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face",
    title: "Kelas Tahfidz Al-Qur'an",
    description:
      "Santri-santri muda fokus menghafal Al-Qur'an dengan metode mulazamah yang efektif",
    category: "Pendidikan",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=800&h=600&fit=crop",
    title: "Sesi Sholat Berjamaah",
    description:
      "Momen khusyuk dalam sholat berjamaah yang menjadi rutinitas harian di yayasan",
    category: "Ibadah",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
    title: "Kegiatan Komunitas",
    description:
      "Aktivitas sosial dan dakwah yang melibatkan masyarakat sekitar",
    category: "Komunitas",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    title: "Majelis Ta'lim",
    description:
      "Pengajian rutin yang membahas berbagai aspek keislaman dan kehidupan",
    category: "Pendidikan",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop",
    title: "Kegiatan Sosial",
    description:
      "Program bakti sosial dan pemberdayaan masyarakat di sekitar yayasan",
    category: "Sosial",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    title: "Program Pemuda",
    description:
      "Aktivitas pengembangan potensi remaja muslim untuk masa depan yang lebih baik",
    category: "Pemuda",
  },
];

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Galeri Kegiatan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dokumentasi kegiatan dan momen berharga di Yayasan Markaz Qurrota
            A'yun
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary-600/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative h-96 md:h-[500px] lg:h-[600px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${photos[currentIndex].image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full mb-3">
                      {photos[currentIndex].category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {photos[currentIndex].title}
                    </h3>
                    <p className="text-gray-200 text-lg leading-relaxed max-w-2xl">
                      {photos[currentIndex].description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-primary-600 scale-125"
                    : "bg-gray-300 hover:bg-primary-400"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-4"
          >
            {photos.map((photo, index) => (
              <motion.button
                key={photo.id}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative overflow-hidden rounded-xl aspect-square group ${
                  index === currentIndex
                    ? "ring-2 ring-primary-600 ring-offset-2"
                    : "hover:ring-2 hover:ring-primary-400 hover:ring-offset-2"
                } transition-all duration-200`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundImage: `url(${photo.image})` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
              </motion.button>
            ))}
          </motion.div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isAutoPlaying
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isAutoPlaying ? "⏸️ Pause Auto-play" : "▶️ Start Auto-play"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
