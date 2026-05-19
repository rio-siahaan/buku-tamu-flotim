import { BarChart3, BookOpen, Map, MessageSquare, Users, FileText } from "lucide-react";

export const statsData = [
  { id: 1, label: "24 JAM", value: "Tersedia dalam", icon: Users },
  { id: 2, label: "Layanan Tersedia", value: "6", icon: BookOpen },
  { id: 3, label: "Tahun Beroperasi", value: "15+", icon: BarChart3 },
];

export const servicesData = [
  {
    id: "konsultasi-statistik",
    title: "Pelayanan Konsultasi Statistik",
    description: "Layanan konsultasi terkait data, metadata, klasifikasi, dan produk statistik lainnya.",
    icon: MessageSquare,
  },
  {
    id: "pelayanan-perpustakaan",
    title: "Pelayanan Perpustakaan",
    description: "Menyediakan akses ke berbagai publikasi resmi, data statistik terpadu, dan referensi terpercaya yang mencakup koleksi tercetak, pustaka digital, katalog publik.",
    icon: FileText,
  },
  {
    id: "rekomendasi-kegiatan",
    title: "Pelayanan Rekomendasi Kegiatan Statistik",
    description: "Fasilitas yang diberikan kepada Kementerian, Lembaga, atau Instansi Pemerintah untuk mengevaluasi rancangan survei sektoral agar sesuai dengan prinsip dan standar nasional.",
    icon: BookOpen,
  },
  {
    id: "peta-digital",
    title: "Peta Digital / GIS",
    description: "Penyediaan layanan peta wilayah administrasi dan blok sensus dalam format digital.",
    icon: Map,
  },
  {
    id: "publikasi",
    title: "Publikasi BPS",
    description: "Akses dan layanan pengunduhan berbagai buku publikasi dan indikator strategis BPS.",
    icon: BarChart3,
  },
  {
    id: "tamu-umum",
    title: "Layanan Tamu Umum",
    description: "Layanan untuk tamu kedinasan, kunjungan studi, atau koordinasi antar instansi.",
    icon: Users,
  },
];

export const mockDashboardStats = {
  total: 1204,
  today: 15,
  thisMonth: 342,
  avgPerDay: 12
};

export const mockEducationData = [
  { name: 'SD/SMP', value: 50 },
  { name: 'SMA/K', value: 300 },
  { name: 'D3/D4', value: 150 },
  { name: 'S1', value: 500 },
  { name: 'S2/S3', value: 204 },
];

export const mockServiceDistributionData = [
  { name: 'Konsultasi', value: 400 },
  { name: 'Data Mikro', value: 300 },
  { name: 'Publikasi', value: 250 },
  { name: 'Lainnya', value: 254 },
];

export const mockRecentVisitors = [
  { id: 1, name: "Budi Santoso", service: "Konsultasi Data", time: "10:30 WITA", data: "Ekonomi digital" },
  { id: 2, name: "Siti Aminah", service: "Permintaan Data", time: "11:15 WITA", data: "Sosial dan Kependudukan" },
  { id: 3, name: "Anton Wijaya", service: "Permintaan Data", time: "13:00 WITA", data: "Kependudukan dan Mitgrasi" },
  { id: 4, name: "Maria Goretti", service: "Publikasi", time: "14:20 WITA", data: "Publikasi PDRB 2021-2025" },
  { id: 5, name: "Fransiskus X.", service: "Konsultasi Data", time: "15:45 WITA", data: "Data statistik pertanian" },
];
