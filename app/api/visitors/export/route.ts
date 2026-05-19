import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dateFrom = searchParams.get("dateFrom") || "";
    const dateTo = searchParams.get("dateTo") || "";

    let query = supabase
      .from("visitors")
      .select("*")
      .order("visited_at", { ascending: true });

    if (dateFrom) {
      query = query.gte("visited_at", `${dateFrom}T00:00:00`);
    }
    if (dateTo) {
      query = query.lte("visited_at", `${dateTo}T23:59:59`);
    }

    const { data: visitors, error } = await query;

    if (error) {
      return NextResponse.json({ error: "Gagal mengambil data." }, { status: 500 });
    }

    const rows = visitors || [];
    const wb = XLSX.utils.book_new();

    // ===== SHEET 1: Data Lengkap =====
    const rawData = rows.map((v, i) => ({
      No: i + 1,
      "No. Antrian": v.queue_number,
      "Nama Lengkap": v.full_name,
      "No. HP": v.phone,
      Email: v.email,
      "Jenis Kelamin": v.gender === "L" ? "Laki-laki" : "Perempuan",
      "Tanggal Lahir": v.birth_date,
      Instansi: v.institution,
      Pendidikan: v.education,
      Pekerjaan: v.occupation,
      "Jenis Layanan": v.service_type,
      Keperluan: v.purpose,
      "Waktu Kunjungan": format(new Date(v.visited_at), "dd MMM yyyy HH:mm", { locale: localeID }),
    }));

    const ws1 = XLSX.utils.json_to_sheet(rawData);
    // Set column widths
    ws1["!cols"] = [
      { wch: 5 }, { wch: 12 }, { wch: 25 }, { wch: 15 }, { wch: 25 },
      { wch: 14 }, { wch: 14 }, { wch: 25 }, { wch: 12 }, { wch: 18 },
      { wch: 25 }, { wch: 40 }, { wch: 20 },
    ];
    XLSX.utils.book_append_sheet(wb, ws1, "Data Pengunjung");

    // ===== SHEET 2: Rekapitulasi =====
    const countBy = (key: string) => {
      const map: Record<string, number> = {};
      rows.forEach((v) => {
        const val = v[key as keyof typeof v] as string;
        map[val] = (map[val] || 0) + 1;
      });
      return Object.entries(map).map(([name, count]) => ({ Kategori: name, Jumlah: count }));
    };

    // Add empty row + header for each section
    const summaryData: Record<string, unknown>[] = [];

    summaryData.push({ Kategori: "=== DISTRIBUSI PENDIDIKAN ===" });
    summaryData.push(...countBy("education"));
    summaryData.push({});

    summaryData.push({ Kategori: "=== DISTRIBUSI PEKERJAAN ===" });
    summaryData.push(...countBy("occupation"));
    summaryData.push({});

    summaryData.push({ Kategori: "=== DISTRIBUSI JENIS LAYANAN ===" });
    summaryData.push(...countBy("service_type"));
    summaryData.push({});

    summaryData.push({ Kategori: "=== DISTRIBUSI JENIS KELAMIN ===" });
    const genderRows = countBy("gender").map(row => ({
      Kategori: row.Kategori === "L" ? "Laki-laki" : row.Kategori === "P" ? "Perempuan" : row.Kategori,
      Jumlah: row.Jumlah,
    }));
    summaryData.push(...genderRows);

    const ws2 = XLSX.utils.json_to_sheet(summaryData);
    ws2["!cols"] = [{ wch: 35 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, ws2, "Rekapitulasi");

    // ===== SHEET 3: Rekap Harian =====
    const dailyMap: Record<string, number> = {};
    rows.forEach((v) => {
      const day = format(new Date(v.visited_at), "yyyy-MM-dd");
      dailyMap[day] = (dailyMap[day] || 0) + 1;
    });

    const dailyData = Object.entries(dailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count], i) => ({
        No: i + 1,
        Tanggal: format(new Date(date), "dd MMMM yyyy", { locale: localeID }),
        "Jumlah Pengunjung": count,
      }));

    // Add total row
    const totalVisitors = dailyData.reduce((sum, d) => sum + d["Jumlah Pengunjung"], 0);
    dailyData.push({ No: 0, Tanggal: "TOTAL", "Jumlah Pengunjung": totalVisitors });

    const ws3 = XLSX.utils.json_to_sheet(dailyData);
    ws3["!cols"] = [{ wch: 5 }, { wch: 25 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, ws3, "Rekap Harian");

    // Generate buffer
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    const periodLabel = dateFrom && dateTo
      ? `${dateFrom}_sd_${dateTo}`
      : format(new Date(), "yyyy-MM-dd");

    return new NextResponse(buf, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Buku_Tamu_PST_BPS_Flotim_${periodLabel}.xlsx"`,
      },
    });
  } catch (err) {
    console.error("Export API error:", err);
    return NextResponse.json({ error: "Gagal mengexport data." }, { status: 500 });
  }
}
