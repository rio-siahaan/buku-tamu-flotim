import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Ambil seluruh data pengunjung
    const { data: visitors, error } = await supabase
      .from("visitors")
      .select("*")
      .order("visited_at", { ascending: false });

    if (error) {
      console.error("Gagal export data:", error);
      return new NextResponse("Gagal mengambil data", { status: 500 });
    }

    // Buat Header CSV
    const headers = [
      "No",
      "Nomor Antrean",
      "Waktu Kunjungan",
      "Nama Lengkap",
      "No HP",
      "Email",
      "Jenis Kelamin",
      "Tanggal Lahir",
      "Instansi/Asal",
      "Pendidikan",
      "Pekerjaan",
      "Keperluan Kunjungan"
    ];

    // Format data ke baris CSV
    const rows = visitors.map((v, index) => {
      const date = new Date(v.visited_at);
      const formattedDate = date.toLocaleDateString("id-ID") + " " + date.toLocaleTimeString("id-ID");

      return [
        index + 1,
        v.queue_number,
        formattedDate,
        `"${v.full_name}"`,
        `'${v.phone}'`, // petik satu agar excel tidak mengira itu rumus
        v.email,
        v.gender === "L" ? "Laki-laki" : "Perempuan",
        v.birth_date,
        `"${v.institution}"`,
        `"${v.education}"`,
        `"${v.occupation}"`,
        `"${v.purpose.replace(/"/g, '""')}"` // Handle quotes in purpose
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="Data_Pengunjung_PST.csv"',
      },
    });
  } catch (err) {
    console.error("Export error:", err);
    return new NextResponse("Terjadi kesalahan server", { status: 500 });
  }
}
