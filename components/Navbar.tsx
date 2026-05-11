"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/Button";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/tentang" },
  { name: "Servis", href: "/servis" },
  { name: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              {/* TODO: ganti dengan <Image> logo BPS */}
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--primary)] text-white font-bold group-hover:bg-[var(--secondary)] transition-colors">
                BPS
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-heading font-bold text-[var(--primary)] text-lg">PST BPS</span>
                <span className="text-xs text-gray-500">Kabupaten Flores Timur</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${
                    pathname === link.href ? "text-[var(--primary)] font-bold" : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="ml-4">
              <Link href="/form" className={`${buttonVariants({ variant: "accent" })} font-semibold`}>
                Isi Buku Tamu
              </Link>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4 shadow-lg absolute w-full">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--primary)] block px-2 py-1 rounded-md ${
                  pathname === link.href ? "bg-[var(--surface)] text-[var(--primary)]" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Link href="/form" className={`block mt-4 ${buttonVariants({ variant: "accent" })} w-full font-semibold`}>
            Isi Buku Tamu
          </Link>
        </div>
      )}
    </nav>
  );
}
