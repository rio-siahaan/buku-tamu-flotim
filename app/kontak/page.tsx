"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function KontakPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Mini */}
      <section className="bg-[var(--primary)] text-white py-16 md:py-24 relative overflow-hidden">
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
            Punya pertanyaan atau butuh bantuan lebih lanjut? Tim kami siap melayani Anda.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 flex-grow bg-[var(--surface)]/30">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Informasi Kontak */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-heading font-bold text-[var(--primary)] mb-8">Informasi Kontak</h2>
              
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex items-start p-6">
                  <div className="h-12 w-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mr-5 shrink-0 text-[var(--primary)]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Lokasi Kantor</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {/* TODO: Ganti alamat real */}
                      Jl. Diponegoro No.1, Larantuka<br />
                      Kabupaten Flores Timur<br />
                      Nusa Tenggara Timur, 86219
                    </p>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm" className="gap-2 text-[var(--primary)] border-[var(--primary)]/20 hover:bg-[var(--primary)] hover:text-white">
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
                    <p className="text-slate-600 text-lg">(0383) 21123</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex items-center p-6">
                  <div className="h-12 w-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mr-5 shrink-0 text-amber-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">Jam Operasional</h3>
                    <p className="text-slate-600 font-medium">Senin - Jumat</p>
                    <p className="text-slate-500">08.00 - 16.00 WITA</p>
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
                  <h3 className="text-white font-bold text-center">Peta Lokasi BPS Flores Timur</h3>
                </div>
                <div className="flex-grow w-full relative min-h-[400px]">
                  {/* TODO: Ganti src iframe dengan link embed Google Maps real BPS Flotim */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.718306061329!2d122.98188161478335!3d-8.332405693991206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2cad051515151515%3A0x1515151515151515!2sLarantuka!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Card>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
