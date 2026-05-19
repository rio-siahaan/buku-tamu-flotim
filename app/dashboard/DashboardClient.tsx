"use client";

import { motion } from "framer-motion";
import { Download, Users, UserCheck, Calendar, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BarChart } from "@/components/charts/BarChart";
import { PieChart } from "@/components/charts/PieChart";

type DashboardClientProps = {
  stats: {
    total: number;
    today: number;
    thisMonth: number;
    thisWeek: number;
  };
  educationData: { name: string; value: number }[];
  occupationData: { name: string; value: number }[];
  recentVisitors: {
    id: string;
    name: string;
    institution: string;
    time: string;
    purpose: string;
  }[];
};

export default function DashboardClient({ stats, educationData, occupationData, recentVisitors }: DashboardClientProps) {
  const statCards = [
    { title: "Total Pengunjung", value: stats.total, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Pengunjung Hari Ini", value: stats.today, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Pengunjung Minggu Ini", value: stats.thisWeek, icon: Activity, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Pengunjung Bulan Ini", value: stats.thisMonth, icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)]/50 pb-12">
      {/* Header Dashboard */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-slate-800">Dashboard Pengunjung PST</h1>
            <p className="text-sm text-slate-500">Ringkasan statistik pelayanan terpadu BPS Flores Timur</p>
          </div>
          <a href="/api/export" download>
            <Button variant="outline" className="gap-2" type="button">
              <Download className="w-4 h-4" /> Export Data
            </Button>
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 space-y-8 max-w-7xl">
        
        {/* ROW 1: Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-heading font-bold text-slate-800">{stat.value.toLocaleString('id-ID')}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ROW 2: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Distribusi Pendidikan Pengunjung</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] min-h-0">
                {educationData.length > 0 ? (
                  <BarChart data={educationData} />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">Belum ada data</div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Distribusi Jenis Pekerjaan</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] min-h-0">
                {occupationData.length > 0 ? (
                  <PieChart data={occupationData} />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">Belum ada data</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ROW 3: Table Recent Visitors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-white">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Pengunjung Terbaru Hari Ini</CardTitle>
                <Button variant="ghost" size="sm" className="text-[var(--primary)]">Lihat Semua</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 bg-slate-50 uppercase">
                    <tr>
                      <th className="px-6 py-4 font-medium">No</th>
                      <th className="px-6 py-4 font-medium">Nama Lengkap</th>
                      <th className="px-6 py-4 font-medium">Instansi / Asal</th>
                      <th className="px-6 py-4 font-medium">Tanggal</th>
                      <th className="px-6 py-4 font-medium">Keperluan Kunjungan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentVisitors.length > 0 ? recentVisitors.map((visitor, index) => (
                      <tr key={visitor.id} className="bg-white hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{index + 1}</td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{visitor.name}</td>
                        <td className="px-6 py-4 text-slate-600">{visitor.institution}</td>
                        <td className="px-6 py-4 text-slate-500">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {visitor.time}
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate text-slate-600">
                          {visitor.purpose}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                          Belum ada pengunjung hari ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
