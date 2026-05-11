import { z } from "zod";

export const guestBookSchema = z.object({
  fullName: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }),
  phone: z.string().min(10, { message: "Nomor handphone tidak valid" }).regex(/^[0-9]+$/, "Hanya boleh angka"),
  email: z.string().email({ message: "Format email tidak valid" }),
  gender: z.enum(["L", "P"], { message: "Pilih jenis kelamin" }),
  birthDate: z.string().min(1, { message: "Tanggal lahir wajib diisi" }),
  
  institution: z.string().min(2, { message: "Instansi/Asal wajib diisi" }),
  education: z.string().min(1, { message: "Pilih pendidikan terakhir" }),
  occupation: z.string().min(1, { message: "Pilih pekerjaan" }),
  serviceType: z.string().min(1, { message: "Pilih jenis layanan" }),
  purpose: z.string().min(10, { message: "Keperluan minimal 10 karakter" }),
});

export type GuestBookFormValues = z.infer<typeof guestBookSchema>;
