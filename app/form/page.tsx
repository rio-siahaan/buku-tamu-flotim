"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, User, Building, ClipboardList, PartyPopper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { guestBookSchema, type GuestBookFormValues } from "@/lib/validations";
import { servicesData } from "@/lib/mockData";

const steps = [
  { id: 1, title: "Data Pribadi", icon: User },
  { id: 2, title: "Data Kunjungan", icon: Building },
  { id: 3, title: "Konfirmasi", icon: ClipboardList },
];

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<GuestBookFormValues>({
    resolver: zodResolver(guestBookSchema),
    mode: "onTouched",
  });

  const handleNext = async () => {
    let isStepValid = false;

    if (currentStep === 1) {
      isStepValid = await trigger(["fullName", "phone", "email", "gender", "birthDate"]);
    } else if (currentStep === 2) {
      isStepValid = await trigger(["institution", "education", "occupation", "serviceType", "purpose"]);
    }

    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data: GuestBookFormValues) => {
    // Simulasi pengiriman data
    console.log(data);
    
    // Generate nomor antrian acak
    const randomQueue = `A-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`;
    setQueueNumber(randomQueue);
    
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-none shadow-2xl text-center overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-32 flex items-center justify-center relative">
              {/* Confetti effect (simulated with absolute elements) */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * 400, opacity: 1 }}
                    animate={{ 
                      y: 400, 
                      x: Math.random() * 400,
                      rotate: Math.random() * 360,
                      opacity: 0
                    }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                    className={`absolute w-3 h-3 ${['bg-red-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500'][i % 4]}`}
                    style={{ borderRadius: i % 2 === 0 ? '50%' : '0%' }}
                  />
                ))}
              </div>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10 -mb-20">
                <PartyPopper className="w-10 h-10 text-[var(--accent)]" />
              </div>
            </div>
            <CardContent className="pt-16 pb-10 px-8">
              <h2 className="text-3xl font-heading font-bold text-[var(--primary)] mb-2">Terima Kasih!</h2>
              <p className="text-slate-600 mb-8">Data Anda telah berhasil direkam dalam sistem Buku Tamu PST.</p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                <p className="text-sm text-slate-500 font-medium mb-1">Nomor Antrian Anda</p>
                <p className="text-5xl font-heading font-bold text-[var(--primary)] tracking-wider">{queueNumber}</p>
              </div>
              
              <Button onClick={() => window.location.reload()} className="w-full h-12 text-base rounded-full">
                Isi Form Baru
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)]/50 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--primary)] mb-4">Buku Tamu Digital</h1>
          <p className="text-slate-600">Silakan lengkapi data kunjungan Anda di bawah ini.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0 hidden sm:block"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[var(--primary)] -translate-y-1/2 rounded-full z-0 transition-all duration-500 hidden sm:block"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="relative z-10 flex justify-between">
            {steps.map((step) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                      isCompleted ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/30" : 
                      isCurrent ? "bg-[var(--accent)] text-slate-900 shadow-md shadow-[var(--accent)]/30 border-2 border-white" : 
                      "bg-white text-gray-400 border-2 border-gray-200"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <span className={`mt-3 text-xs md:text-sm font-medium ${isCurrent ? "text-[var(--primary)]" : "text-gray-500"}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="border-none shadow-xl bg-white overflow-hidden rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="p-0">
              <div className="p-6 md:p-10 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {/* STEP 1: Data Pribadi */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-heading font-bold text-slate-800 border-b pb-4 mb-6">Data Pribadi</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                          <input 
                            {...register("fullName")}
                            type="text" 
                            className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[var(--primary)] focus:ring-[var(--primary)]'} focus:outline-none focus:ring-1 transition-colors`}
                            placeholder="Contoh: Budi Santoso"
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">No. Handphone / WA <span className="text-red-500">*</span></label>
                            <input 
                              {...register("phone")}
                              type="tel" 
                              className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[var(--primary)] focus:ring-[var(--primary)]'} focus:outline-none focus:ring-1 transition-colors`}
                              placeholder="08123456789"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                            <input 
                              {...register("email")}
                              type="email" 
                              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[var(--primary)] focus:ring-[var(--primary)]'} focus:outline-none focus:ring-1 transition-colors`}
                              placeholder="budi@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Kelamin <span className="text-red-500">*</span></label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input {...register("gender")} type="radio" value="L" className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)]" />
                                <span className="text-slate-700">Laki-laki</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input {...register("gender")} type="radio" value="P" className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)]" />
                                <span className="text-slate-700">Perempuan</span>
                              </label>
                            </div>
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
                            <input 
                              {...register("birthDate")}
                              type="date" 
                              className={`w-full px-4 py-3 rounded-lg border ${errors.birthDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[var(--primary)] focus:ring-[var(--primary)]'} focus:outline-none focus:ring-1 transition-colors`}
                            />
                            {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Data Kunjungan */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-heading font-bold text-slate-800 border-b pb-4 mb-6">Data Kunjungan</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Instansi / Asal <span className="text-red-500">*</span></label>
                          <input 
                            {...register("institution")}
                            type="text" 
                            className={`w-full px-4 py-3 rounded-lg border ${errors.institution ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[var(--primary)] focus:ring-[var(--primary)]'} focus:outline-none focus:ring-1 transition-colors`}
                            placeholder="Contoh: Universitas Terbuka / Bappeda"
                          />
                          {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution.message}</p>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Pendidikan Terakhir <span className="text-red-500">*</span></label>
                            <select 
                              {...register("education")}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.education ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[var(--primary)] focus:ring-[var(--primary)]'} focus:outline-none focus:ring-1 bg-white`}
                            >
                              <option value="">-- Pilih Pendidikan --</option>
                              <option value="SD">SD Sederajat</option>
                              <option value="SMP">SMP Sederajat</option>
                              <option value="SMA">SMA Sederajat</option>
                              <option value="D3">Diploma 1/2/3</option>
                              <option value="S1">S1 / Diploma 4</option>
                              <option value="S2">S2</option>
                              <option value="S3">S3</option>
                            </select>
                            {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Pekerjaan <span className="text-red-500">*</span></label>
                            <select 
                              {...register("occupation")}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.occupation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[var(--primary)] focus:ring-[var(--primary)]'} focus:outline-none focus:ring-1 bg-white`}
                            >
                              <option value="">-- Pilih Pekerjaan --</option>
                              <option value="PNS">PNS / ASN</option>
                              <option value="TNI/Polri">TNI / Polri</option>
                              <option value="Pegawai Swasta">Pegawai Swasta</option>
                              <option value="Wiraswasta">Wiraswasta</option>
                              <option value="Pelajar/Mahasiswa">Pelajar / Mahasiswa</option>
                              <option value="Lainnya">Lainnya</option>
                            </select>
                            {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation.message}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Layanan yang Dicari <span className="text-red-500">*</span></label>
                          <select 
                            {...register("serviceType")}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.serviceType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[var(--primary)] focus:ring-[var(--primary)]'} focus:outline-none focus:ring-1 bg-white`}
                          >
                            <option value="">-- Pilih Layanan --</option>
                            {servicesData.map(service => (
                              <option key={service.id} value={service.title}>{service.title}</option>
                            ))}
                          </select>
                          {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Keperluan Kunjungan <span className="text-red-500">*</span></label>
                          <textarea 
                            {...register("purpose")}
                            rows={4}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.purpose ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[var(--primary)] focus:ring-[var(--primary)]'} focus:outline-none focus:ring-1 resize-none`}
                            placeholder="Jelaskan secara singkat data atau informasi yang Anda butuhkan..."
                          ></textarea>
                          {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose.message}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Konfirmasi */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-heading font-bold text-slate-800 border-b pb-4 mb-6">Konfirmasi Data</h2>
                      
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Data Pribadi</h3>
                            <dl className="space-y-2">
                              <div>
                                <dt className="text-sm text-slate-500">Nama Lengkap</dt>
                                <dd className="font-medium text-slate-900">{getValues("fullName")}</dd>
                              </div>
                              <div>
                                <dt className="text-sm text-slate-500">Kontak</dt>
                                <dd className="font-medium text-slate-900">{getValues("phone")} / {getValues("email")}</dd>
                              </div>
                              <div>
                                <dt className="text-sm text-slate-500">Jenis Kelamin</dt>
                                <dd className="font-medium text-slate-900">{getValues("gender") === "L" ? "Laki-laki" : "Perempuan"}</dd>
                              </div>
                            </dl>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Data Kunjungan</h3>
                            <dl className="space-y-2">
                              <div>
                                <dt className="text-sm text-slate-500">Instansi / Asal</dt>
                                <dd className="font-medium text-slate-900">{getValues("institution")}</dd>
                              </div>
                              <div>
                                <dt className="text-sm text-slate-500">Pekerjaan</dt>
                                <dd className="font-medium text-slate-900">{getValues("occupation")}</dd>
                              </div>
                              <div>
                                <dt className="text-sm text-slate-500">Layanan</dt>
                                <dd className="font-medium text-[var(--primary)]">{getValues("serviceType")}</dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-200">
                          <dt className="text-sm text-slate-500 mb-1">Keperluan Kunjungan</dt>
                          <dd className="font-medium text-slate-900 italic">"{getValues("purpose")}"</dd>
                        </div>
                      </div>

                      <div className="bg-[var(--primary)]/5 p-4 rounded-lg border border-[var(--primary)]/20 flex items-start gap-3 mt-6">
                        <input type="checkbox" id="agreement" className="mt-1 w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)]" required />
                        <label htmlFor="agreement" className="text-sm text-slate-700 leading-relaxed">
                          Dengan ini saya menyatakan bahwa data yang saya isikan adalah benar. Saya setuju data ini digunakan untuk keperluan internal BPS sesuai dengan kebijakan privasi yang berlaku.
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Form Navigation */}
              <div className="bg-gray-50 p-6 md:px-10 border-t flex items-center justify-between">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={handlePrev} className="px-6">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Kembali
                  </Button>
                ) : (
                  <div></div> // Placeholder to keep the next button on the right
                )}
                
                {currentStep < 3 ? (
                  <Button type="button" variant="default" onClick={handleNext} className="px-8 bg-[var(--primary)]">
                    Lanjut <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button type="submit" variant="accent" className="px-10 font-bold shadow-lg shadow-[var(--accent)]/30">
                    Kirim Data
                  </Button>
                )}
              </div>
            </CardContent>
          </form>
        </Card>

      </div>
    </div>
  );
}
