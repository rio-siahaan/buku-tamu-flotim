import { createAdminClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  // Kita gunakan Admin Client untuk mem-bypass RLS (sehingga pengunjung publik bisa melihat grafik/dashboard)
  // tanpa harus login terlebih dahulu.
  const supabase = createAdminClient();


  // 1. Total pengunjung
  const { count: totalCount } = await supabase
    .from("visitors")
    .select("*", { count: "exact", head: true });

  // 2. Pengunjung hari ini
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: todayCount } = await supabase
    .from("visitors")
    .select("*", { count: "exact", head: true })
    .gte("visited_at", today.toISOString());

  // 3. Pengunjung bulan ini
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const { count: thisMonthCount } = await supabase
    .from("visitors")
    .select("*", { count: "exact", head: true })
    .gte("visited_at", firstDayOfMonth.toISOString());

  // 4. Pengunjung minggu ini (7 hari terakhir)
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const { count: thisWeekCount } = await supabase
    .from("visitors")
    .select("*", { count: "exact", head: true })
    .gte("visited_at", sevenDaysAgo.toISOString());

  // 5 & 6. Fetch data chart
  // Untuk data agregasi (group by) tanpa custom RPC, kita ambil data education & occupation
  // Untuk optimalisasi, kita bisa fetch semua jika masih sedikit, tapi lebih baik gunakan limit
  const { data: chartData } = await supabase
    .from("visitors")
    .select("education, occupation");

  const educationMap = new Map<string, number>();
  const occupationMap = new Map<string, number>();

  chartData?.forEach((v) => {
    educationMap.set(v.education, (educationMap.get(v.education) || 0) + 1);
    occupationMap.set(v.occupation, (occupationMap.get(v.occupation) || 0) + 1);
  });

  const educationData = Array.from(educationMap, ([name, value]) => ({ name, value }));
  const occupationData = Array.from(occupationMap, ([name, value]) => ({ name, value }));

  // 7. Tabel pengunjung terbaru hari ini
  const { data: recentVisitorsData } = await supabase
    .from("visitors")
    .select("id, full_name, institution, visited_at, purpose")
    .gte("visited_at", today.toISOString())
    .order("visited_at", { ascending: false })
    .limit(10);

  const recentVisitors = (recentVisitorsData || []).map((v) => {
    // Format timestamp menjadi lokal jam & tanggal
    const date = new Date(v.visited_at);
    const dateStr = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    const timeStr = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    });

    return {
      id: v.id,
      name: v.full_name,
      institution: v.institution,
      time: `${dateStr}, ${timeStr} WITA`,
      purpose: v.purpose
    };
  });

  const stats = {
    total: totalCount || 0,
    today: todayCount || 0,
    thisMonth: thisMonthCount || 0,
    thisWeek: thisWeekCount || 0,
  };

  return (
    <DashboardClient
      stats={stats}
      educationData={educationData}
      occupationData={occupationData}
      recentVisitors={recentVisitors}
    />
  );
}
