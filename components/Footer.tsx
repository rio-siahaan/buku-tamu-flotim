import Link from "next/link";
import { Mail, MapPin, Phone, ScanFace, Globe, Camera, Video } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-slate-300 pt-16 pb-8 border-t-4 border-[var(--accent)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Kolom 1: Info Instansi */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              {/* TODO: ganti dengan <Image> logo BPS putih */}
              <Image 
              src="/logo_bps.png"
              alt="Logo BPS"
              width={70}
              height={70}
              className="rounded-md"
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-white text-lg">Badan Pusat Statistik</span>
                <span className="text-sm text-slate-400">Kabupaten Flores Timur</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pelayanan Statistik Terpadu (PST) hadir untuk memberikan layanan prima, cepat, dan transparan kepada masyarakat dalam kebutuhan data dan statistik.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-[var(--accent)] after:rounded-full">
              Tautan Cepat
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-white hover:underline transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/tentang" className="text-sm hover:text-white hover:underline transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/servis" className="text-sm hover:text-white hover:underline transition-colors">Layanan PST</Link>
              </li>
              <li>
                <Link href="/kontak" className="text-sm hover:text-white hover:underline transition-colors">Hubungi Kami</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-[var(--accent)] after:rounded-full">
              Hubungi Kami
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="text-sm">
                  {/* TODO: Ganti alamat real */}
                  Jl. San Juan, Sarotari Tengah, Larantuka<br />
                  Kabupaten Flores Timur<br />
                  Nusa Tenggara Timur, 86219
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[var(--accent)] shrink-0" />
                <span className="text-sm">
                  {/* TODO: Ganti no HP real */}
                  (0383) 21164
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--accent)] shrink-0" />
                <span className="text-sm">bps5309@bps.go.id</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Sosial Media */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-[var(--accent)] after:rounded-full">
              Media Sosial
            </h3>
            <p className="text-sm mb-4">Ikuti kami untuk mendapatkan informasi statistik terbaru.</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=100063912365763" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[var(--secondary)] hover:text-white transition-all text-slate-300">
                <ScanFace className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://florestimurkab.bps.go.id" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[var(--secondary)] hover:text-white transition-all text-slate-300">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Web</span>
              </a>
              <a href="https://www.instagram.com/bpsflorestimur/" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all text-slate-300">
                <Camera className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.youtube.com/@badanpusatstatistikkabupat6369" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-slate-300">
                <Video className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Badan Pusat Statistik Kabupaten Flores Timur. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
