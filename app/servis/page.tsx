"use client";

import { motion } from "framer-motion";
import { servicesData } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ServisPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      {/* Hero Mini */}
      <section className="bg-[var(--primary)] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/20 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            Layanan Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Pilih layanan yang Anda butuhkan. Kami siap membantu menyediakan data dan informasi statistik terbaik untuk Anda.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 flex-grow bg-[var(--surface)]/30">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {servicesData.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="h-full flex flex-col border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white group">
                  <CardHeader className="pb-4">
                    <div className="h-16 w-16 rounded-xl bg-[var(--surface)] flex items-center justify-center mb-6 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-colors duration-300">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl text-[var(--primary)] font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <CardDescription className="text-base leading-relaxed text-slate-600 mb-6">
                      {service.description}
                    </CardDescription>
                    <div className="mt-auto">
                      <Button variant="outline" className="w-full border-gray-200 hover:border-[var(--primary)] hover:text-[var(--primary)] group-hover:bg-[var(--surface)]">
                        Selengkapnya
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
