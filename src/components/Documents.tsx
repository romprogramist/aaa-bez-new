"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type Document = {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
};

export default function Documents() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/documents")
      .then((r) => r.json())
      .then(setDocs)
      .catch(() => {});
  }, []);

  if (docs.length === 0) return null;

  return (
    <>
      <section id="documents" className="relative bg-[#1A0C0A] py-20 lg:py-28 overflow-hidden border-t border-white/[0.06]">
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-20">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: "rgba(245,209,0,0.15)", color: "#f5d100" }}
                >
                  03
                </div>
              </div>
              <h2
                className="text-white text-3xl lg:text-4xl font-bold uppercase tracking-tight"
                style={{ fontFamily: "'Neutral Face', sans-serif" }}
              >
                Документы
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/40 text-base max-w-sm"
            >
              Ознакомьтесь с документами нашей компании
            </motion.p>
          </div>

          {/* Swiper carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 28 },
              }}
              className="documents-swiper"
            >
              {docs.map((doc) => (
                <SwiperSlide key={doc.id}>
                  <div
                    className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden cursor-pointer hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-500"
                    onClick={() => setLightbox(doc.image)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={doc.image}
                        alt={doc.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Title bar */}
                    <div className="p-4">
                      <h3 className="text-white/80 text-sm font-medium">{doc.title}</h3>
                      {doc.description && (
                        <p className="text-white/30 text-xs mt-1">{doc.description}</p>
                      )}
                    </div>

                    {/* Corner glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(245,209,0,0.03)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt="Документ"
              width={1200}
              height={1600}
              className="object-contain w-full h-auto max-h-[85vh] rounded-xl"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl cursor-pointer transition-colors hover:bg-white/20"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
