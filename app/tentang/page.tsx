"use client";

import { motion } from "framer-motion";
import { Target, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import StickySection from "@/components/ui/StickySection";

export default function TentangPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Mini */}
      <StickySection zIndex={10} className="">
        <section className="bg-[var(--primary)] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-heading font-bold mb-4"
            >
              Tentang Kami
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-300 max-w-2xl mx-auto"
            >
              Mengenal lebih dekat Pelayanan Statistik Terpadu (PST) Badan Pusat
              Statistik Kabupaten Flores Timur.
            </motion.p>
          </div>
        </section>
      </StickySection>

      {/* Main Content */}
      <StickySection className="min-h-screen" zIndex={20}>

        <section className="py-16 md:py-24 flex-grow bg-[var(--surface)]">
          <div className="container mx-auto px-4 max-w-5xl space-y-16">
            {/* Tentang PST */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
            >
              <h2 className="text-3xl font-heading font-bold text-[var(--primary)] mb-6">
                Apa itu PST BPS?
              </h2>
              {/* TODO: Ganti dengan deskripsi real PST BPS Flores Timur */}
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Dalam rangka mewujudkan sistem pelayanan terpadu, BPS membangun
                Pelayanan Statistik Terpadu (PST) yang dilaksanakan oleh Pejabat
                dan Pegawai pada Direktorat Diseminasi Statistik. PST BPS adalah
                pemberian pelayanan data dan kegiatan statistik dari beberapa
                jenis pelayanan yang dilakukan secara terpadu melalui satu pintu
                oleh satu unit kerja sebagai penanggung jawab.
              </p>
            </motion.div>

            {/* Visi & Misi */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-[var(--primary)]/5 rounded-t-xl pb-8">
                    <div className="w-14 h-14 bg-[var(--primary)] rounded-xl flex items-center justify-center text-white mb-4 shadow-md shadow-[var(--primary)]/20">
                      <Target className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl text-[var(--primary)]">
                      Visi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* TODO: Ganti dengan visi real BPS */}
                    <p className="text-slate-600 text-lg italic border-l-4 border-[var(--accent)] pl-4">
                      "Penyelenggara Layanan Statistik Berkualitas Untuk
                      Mendukung Indonesia Maju"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-[var(--secondary)]/5 rounded-t-xl pb-8">
                    <div className="w-14 h-14 bg-[var(--secondary)] rounded-xl flex items-center justify-center text-white mb-4 shadow-md shadow-[var(--secondary)]/20">
                      <Flag className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl text-[var(--primary)]">
                      Misi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* TODO: Ganti dengan misi real BPS */}
                    <ul className="space-y-3 text-slate-600 text-base">
                      <li className="flex items-start">
                        <span className="text-[var(--secondary)] mr-3 font-bold">
                          •
                        </span>
                        <span>
                          Menyediakan Data Statistik Berkualitas dan Insight
                          untuk Perumusan Kebijakan dan Pengambilan Keputusan.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[var(--secondary)] mr-3 font-bold">
                          •
                        </span>
                        <span>
                          Menguatkan Kepemimpinan BPS dalam penyelenggaraan
                          Sistem Statistik Nasional (SSN).
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[var(--secondary)] mr-3 font-bold">
                          •
                        </span>
                        <span>
                          Menguatkan kapasitas kelembagaan statistik yang
                          efektif dan efisien.
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        </StickySection>
    </div>
  );
}
