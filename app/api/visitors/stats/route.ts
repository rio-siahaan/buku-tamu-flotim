import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Total all time
    const { count: total } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true });

    // Today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count: today } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true })
      .gte("visited_at", todayStart.toISOString());

    // This week (Monday start)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() + mondayOffset);
    weekStart.setHours(0, 0, 0, 0);
    const { count: thisWeek } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true })
      .gte("visited_at", weekStart.toISOString());

    // This month
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const { count: thisMonth } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true })
      .gte("visited_at", monthStart.toISOString());

    // Education distribution
    const { data: allVisitors } = await supabase
      .from("visitors")
      .select("education, occupation, service_type, gender, visited_at");

    const educationMap: Record<string, number> = {};
    const serviceMap: Record<string, number> = {};
    const occupationMap: Record<string, number> = {};
    const genderMap: Record<string, number> = { L: 0, P: 0 };

    (allVisitors || []).forEach((v) => {
      educationMap[v.education] = (educationMap[v.education] || 0) + 1;
      serviceMap[v.service_type] = (serviceMap[v.service_type] || 0) + 1;
      occupationMap[v.occupation] = (occupationMap[v.occupation] || 0) + 1;
      if (v.gender === "L" || v.gender === "P") {
        genderMap[v.gender]++;
      }
    });

    const toChartArray = (map: Record<string, number>) =>
      Object.entries(map)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    // Recent visitors (today)
    const { data: recentVisitors } = await supabase
      .from("visitors")
      .select("*")
      .gte("visited_at", todayStart.toISOString())
      .order("visited_at", { ascending: false })
      .limit(10);

    return NextResponse.json({
      stats: {
        total: total || 0,
        today: today || 0,
        thisWeek: thisWeek || 0,
        thisMonth: thisMonth || 0,
      },
      charts: {
        education: toChartArray(educationMap),
        service: toChartArray(serviceMap),
        occupation: toChartArray(occupationMap),
        gender: toChartArray(genderMap),
      },
      recentVisitors: recentVisitors || [],
    });
  } catch (err) {
    console.error("Stats API error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}
