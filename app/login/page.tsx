"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login gagal.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--primary)] via-[#002255] to-[#001133] relative overflow-hidden p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--secondary)] rounded-full mix-blend-multiply filter blur-[120px] opacity-15 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-none shadow-2xl shadow-black/30 bg-white/95 backdrop-blur-xl overflow-hidden">
          {/* Header gradient */}
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-8 py-10 text-center relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-white mb-1">Admin Dashboard</h1>
              <p className="text-white/70 text-sm">PST BPS Kabupaten Flores Timur</p>
            </motion.div>
          </div>

          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Admin</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                    placeholder="admin@bps.go.id"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-300 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl text-base font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-90 transition-opacity shadow-lg shadow-[var(--primary)]/25"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi...</span>
                  </div>
                ) : (
                  "Masuk ke Dashboard"
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-6">
              Akses terbatas untuk petugas PST BPS Flores Timur
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
