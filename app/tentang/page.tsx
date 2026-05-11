"use client";

import { motion } from "framer-motion";
import { Target, Flag, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function TentangPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Mini */}
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
            Mengenal lebih dekat Pelayanan Statistik Terpadu (PST) Badan Pusat Statistik Kabupaten Flores Timur.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 flex-grow bg-[var(--surface)]/30">
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          
          {/* Tentang PST */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2 className="text-3xl font-heading font-bold text-[var(--primary)] mb-6">Apa itu PST BPS?</h2>
            {/* TODO: Ganti dengan deskripsi real PST BPS Flores Timur */}
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              Pelayanan Statistik Terpadu (PST) merupakan gerbang utama bagi masyarakat untuk mendapatkan pelayanan data dan informasi statistik dari Badan Pusat Statistik. Kami berkomitmen untuk menyediakan layanan publik yang prima, cepat, dan transparan.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Di BPS Kabupaten Flores Timur, PST melayani berbagai kebutuhan mulai dari konsultasi data, permintaan data mikro, hingga penyediaan publikasi statistik yang dapat diakses oleh instansi pemerintah, akademisi, swasta, maupun masyarakat umum.
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
                  <CardTitle className="text-2xl text-[var(--primary)]">Visi</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* TODO: Ganti dengan visi real BPS */}
                  <p className="text-slate-600 text-lg italic border-l-4 border-[var(--accent)] pl-4">
                    "Penyedia Data Statistik Berkualitas untuk Indonesia Maju"
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
                  <CardTitle className="text-2xl text-[var(--primary)]">Misi</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* TODO: Ganti dengan misi real BPS */}
                  <ul className="space-y-3 text-slate-600 text-base">
                    <li className="flex items-start">
                      <span className="text-[var(--secondary)] mr-3 font-bold">•</span>
                      <span>Menyediakan statistik dasar yang berkualitas melalui penerapan standardisasi dan metodologi statistik yang baku.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--secondary)] mr-3 font-bold">•</span>
                      <span>Memperkuat sistem statistik nasional berkesinambungan melalui pembinaan dan koordinasi di bidang statistik.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--secondary)] mr-3 font-bold">•</span>
                      <span>Membangun insan statistik yang profesional, berintegritas dan amanah untuk kemajuan perstatistikan.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Struktur Organisasi */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--surface)] text-[var(--primary)] mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-[var(--primary)] mb-6">Struktur Organisasi</h2>
            {/* TODO: Ganti dengan bagan/gambar struktur organisasi BPS Flotim */}
            <div className="w-full h-80 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center">
              <p className="text-slate-500 font-medium">
                [ Placeholder Struktur Organisasi ]<br/>
                <span className="text-sm font-normal">Ganti dengan komponen Image di kemudian hari</span>
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
