"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { statsData, servicesData } from "@/lib/mockData";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background placeholder */}
        {/* TODO: ganti dengan <Image> untuk background real hero */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--primary)] via-[#002255] to-black" />
        
        {/* Overlay pattern untuk tekstur (opsional) */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center pt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-block mb-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[var(--accent)] text-sm font-semibold tracking-wide">
              Pelayanan Publik Terintegrasi
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight"
            >
              Selamat Datang di <br />
              <span className="text-[var(--accent)]">Pelayanan Statistik Terpadu</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light"
            >
              Badan Pusat Statistik Kabupaten Flores Timur berkomitmen memberikan layanan data statistik yang Cepat, Mudah, dan Transparan.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/form" className={buttonVariants({ size: "lg", variant: "accent", className: "h-14 px-8 text-base font-bold shadow-lg shadow-[var(--accent)]/20 rounded-full group" })}>
                Isi Buku Tamu
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/servis" className={buttonVariants({ size: "lg", variant: "outline", className: "h-14 px-8 text-base bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm rounded-full group" })}>
                Pelajari Layanan
                <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative wave divider at bottom */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] lg:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.85,121.22,200.7,105.9,242.45,96.6,282.88,77.7,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-white relative z-20 -mt-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="text-center border-none shadow-xl shadow-slate-100 hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="pt-8 pb-6 px-6 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-6 text-[var(--secondary)]">
                      <stat.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-4xl font-heading font-bold text-[var(--primary)] mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-slate-500 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW LAYANAN SECTION */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--primary)] mb-4">
              Layanan Unggulan Kami
            </h2>
            <p className="text-slate-600 text-lg">
              Kami menyediakan berbagai layanan statistik terpadu untuk memenuhi kebutuhan data Anda dengan cepat dan akurat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicesData.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-none bg-white">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-[var(--primary)]">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-slate-600">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/servis" className={buttonVariants({ variant: "outline", size: "lg", className: "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full px-8" })}>
              Lihat Semua Layanan
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 relative overflow-hidden bg-[var(--primary)] text-white">
        {/* Background Accent Graphics */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--secondary)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Kunjungi PST BPS Hari Ini
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Bantu kami meningkatkan kualitas layanan dengan mengisi buku tamu digital sebelum Anda memulai konsultasi.
            </p>
            <Link href="/form" className={buttonVariants({ size: "lg", variant: "accent", className: "h-14 px-10 text-lg font-bold shadow-xl rounded-full" })}>
              Isi Buku Tamu Sekarang
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
