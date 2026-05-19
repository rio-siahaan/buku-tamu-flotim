import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { guestBookSchema } from "@/lib/validations";

// POST — Insert visitor & return queue number
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const parsed = guestBookSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validasi gagal", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Kita WAJIB menggunakan admin client (service role) agar bisa menghitung antrian & bypass RLS
    // Pastikan SUPABASE_SERVICE_ROLE_KEY ada di .env.local Anda.
    // Jika tidak ada, fungsi ini akan melempar error.
    const { createAdminClient } = await import("@/lib/supabase/server");
    const supabase = createAdminClient();

    // Generate sequential queue number for today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const { count } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true })
      .gte("visited_at", todayStart.toISOString())
      .lte("visited_at", todayEnd.toISOString());

    const queueNum = (count ?? 0) + 1;
    const queueNumber = `A-${queueNum.toString().padStart(3, "0")}`;

    // Insert visitor
    const { data, error } = await supabase
      .from("visitors")
      .insert({
        queue_number: queueNumber,
        full_name: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email,
        gender: parsed.data.gender,
        birth_date: parsed.data.birthDate,
        institution: parsed.data.institution,
        education: parsed.data.education,
        occupation: parsed.data.occupation,
        // service_type: "Umum", // Default fallback
        purpose: parsed.data.purpose,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Gagal menyimpan data. Silakan coba lagi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      queueNumber,
      visitor: data,
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

// GET — List visitors with pagination, search, and date filters (admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search") || "";
    const dateFrom = searchParams.get("dateFrom") || "";
    const dateTo = searchParams.get("dateTo") || "";
    const serviceType = searchParams.get("serviceType") || "";

    let query = supabase
      .from("visitors")
      .select("*", { count: "exact" })
      .order("visited_at", { ascending: false });

    // Apply filters
    if (search) {
      query = query.ilike("full_name", `%${search}%`);
    }
    if (dateFrom) {
      query = query.gte("visited_at", `${dateFrom}T00:00:00`);
    }
    if (dateTo) {
      query = query.lte("visited_at", `${dateTo}T23:59:59`);
    }
    if (serviceType) {
      query = query.eq("service_type", serviceType);
    }

    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: "Gagal mengambil data." }, { status: 500 });
    }

    return NextResponse.json({
      data: data || [],
      count: count || 0,
      page,
      pageSize,
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// DELETE — Delete a visitor by ID (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });
    }

    const { error } = await supabase.from("visitors").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json({ error: "Gagal menghapus data." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}
