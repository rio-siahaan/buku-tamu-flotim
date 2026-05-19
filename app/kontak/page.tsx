"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import StickySection from "@/components/ui/StickySection";

export default function KontakPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Mini */}
      <StickySection zIndex={10}>
        <section className="bg-[var(--primary)] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-lg mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-heading font-bold mb-4"
            >
              Hubungi Kami
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-300 max-w-2xl mx-auto"
            >
              Punya pertanyaan atau butuh bantuan lebih lanjut? Tim kami siap
              melayani Anda.
            </motion.p>
          </div>
        </section>
      </StickySection>

      {/* Main Content */}
      <StickySection zIndex={20} className="min-h-screen">
        <section className="py-16 md:py-24 flex-grow bg-[var(--surface)]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Informasi Kontak */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-heading font-bold text-[var(--primary)] mb-8">
                  Informasi Kontak
                </h2>

                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="flex items-start p-6">
                    <div className="h-12 w-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-5 shrink-0 text-[var(--primary)]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        Lokasi Kantor
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        Jl. San Juan, Sarotari Tengah, Larantuka<br />
                        Kabupaten Flores Timur<br />
                        Nusa Tenggara Timur, 86219
                      </p>
                      <a
                        href="https://www.google.com/maps/place/Badan+Pusat+Statistik+Flores+Timur/@-8.3192847,123.0111258,17z/data=!3m1!4b1!4m6!3m5!1s0x2dac7e22dda82a1f:0x2f427bb45d03ef50!8m2!3d-8.31929!4d123.0137061!16s%2Fg%2F11c60cfn60?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-[var(--primary)] border-[var(--primary)]/20 hover:bg-[var(--primary)] hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" /> Buka di Google Maps
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-5 shrink-0 text-[var(--primary)]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">Email</h3>
                      <p className="text-slate-600 text-lg">bps5309@bps.go.id</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-5 shrink-0 text-[var(--primary)]">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">Telepon</h3>
                      <p className="text-slate-600 text-lg">(0383) 21164</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mr-5 shrink-0 text-amber-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">
                        Jam Operasional
                      </h3>
                      <p className="text-slate-600 font-medium">Senin - Jumat</p>
                      <p className="text-slate-500">07.30 - 16.00 WITA</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Peta Lokasi */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="h-full min-h-[500px]"
              >
                <Card className="h-full border-none shadow-md overflow-hidden flex flex-col">
                  <div className="bg-[var(--primary)] p-4">
                    <h3 className="text-white font-bold text-center">
                      Peta Lokasi BPS Flores Timur
                    </h3>
                  </div>
                  <div className="flex-grow w-full relative min-h-[400px]">
                    <iframe
                      src="https://www.google.com/maps/place/Badan+Pusat+Statistik+Flores+Timur/@-8.3192847,123.0111258,17z/data=!3m1!4b1!4m6!3m5!1s0x2dac7e22dda82a1f:0x2f427bb45d03ef50!8m2!3d-8.31929!4d123.0137061!16s%2Fg%2F11c60cfn60?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                      width="100%"
                      height="100%"
                      style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </StickySection>
    </div>
  );
}
