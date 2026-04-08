'use client';

import { useState, useEffect } from "react";
import { HousePlus, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://www.sevalinkcare.com";

const navLinks = [
  { label: "Nurse at Home", href: "/nurse-at-home" },
  { label: "Elder Care", href: "/elder-care" },
  { label: "Doctor Visit", href: "/doctor-visit" },
  { label: "Post-Surgery", href: "/post-surgery-care" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActivePath = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-0 shadow-none [transform:translateZ(0)]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:h-16">
          <div className="flex items-center justify-between h-12 sm:h-16 md:h-auto md:shrink-0">
            {/* Logo — links to homecare home */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <Image
                src="/assets/brand/SevaLink-logo-r.png"
                alt="SevaLink Home Care"
                width={440}
                height={110}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-300"
                priority
              />
            </Link>

            {/* Mobile Toggle */}
            {mounted && (
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button
                    className="md:hidden p-2 text-gray-900 focus:outline-none"
                    aria-label="Toggle Menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[70%] p-0 border-none bg-white">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-100 flex items-center">
                      <Link href="/" className="flex items-center gap-2 group cursor-pointer" onClick={() => setMobileOpen(false)}>
                        <Image
                          src="/assets/brand/SevaLink-logo-r.png"
                          alt="SevaLink Home Care"
                          width={400}
                          height={100}
                          className="h-[5.5rem] sm:h-20 md:h-20 w-auto object-contain transition-all duration-300"
                        />
                      </Link>
                    </div>

                    <nav className="p-6 flex flex-col gap-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={`px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                            isActivePath(link.href)
                              ? "text-emerald-600 bg-emerald-50"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}

                      {/* Back to main site */}
                      <a
                        href={MAIN_SITE_URL}
                        className="px-4 py-3 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        ← Back to SevaLink
                      </a>

                      <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-3">
                        <Link
                          href="/book"
                          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 !text-white visited:!text-white hover:!text-white active:!text-white text-base font-semibold hover:bg-emerald-700 hover:shadow-lg transition-all text-center cursor-pointer border-none"
                          onClick={() => setMobileOpen(false)}
                        >
                          <HousePlus className="w-5 h-5" />
                          Book Home Care
                        </Link>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center flex-1 gap-1 px-2 mx-auto ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-semibold transition-colors relative group ${
                  isActivePath(link.href) ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Back to main site link */}
            <a
              href={MAIN_SITE_URL}
              className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-emerald-600 transition-colors"
            >
              ← SevaLink
            </a>
          </nav>

          {/* CTA - Desktop */}
          <div className="hidden md:flex items-center gap-2 md:shrink-0 pr-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 !text-white visited:!text-white hover:!text-white active:!text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl cursor-pointer border-none"
            >
              <HousePlus className="w-4 h-4" />
              Book Home Care
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
