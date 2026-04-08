'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowUp } from 'lucide-react';
import { FloatingMedicalIcons } from '../ui/medical-background';

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://www.sevalinkcare.com";

const footerLinks = {
  "Home Care Services": [
    { name: "Nurse at Home", href: "/nurse-at-home" },
    { name: "Elder Care", href: "/elder-care" },
    { name: "Doctor Home Visit", href: "/doctor-visit" },
    { name: "Post-Surgery Care", href: "/post-surgery-care" },
  ],
  "Company": [
    { name: "About SevaLink", href: `${MAIN_SITE_URL}/about`, external: true },
    { name: "Contact Us", href: `${MAIN_SITE_URL}/contact`, external: true },
    { name: "Help Center", href: `${MAIN_SITE_URL}/help`, external: true },
    { name: "Emergency Services", href: MAIN_SITE_URL, external: true },
  ],
};

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-emerald-50/65 via-white to-emerald-50/40 text-black">
      <FloatingMedicalIcons />
      <div className="absolute inset-0 z-0 bg-white/45" />
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10">
        <div className="pt-4 md:pt-6 pb-8 border-b border-black/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mb-4">

              {/* Column 1: Brand + About */}
              <div>
                <Link href="/" className="inline-flex items-center gap-2 mb-4">
                  <Image src="/assets/brand/SevaLink-logo-r.png" alt="SevaLink" width={520} height={140} className="h-20 sm:h-24 md:h-32 w-auto object-contain" />
                </Link>
                <p className="text-sm text-black mb-5 leading-relaxed line-clamp-4 transition-colors duration-300 hover:text-emerald-600">
                  Professional home care services — nursing, elder care, doctor visits & post-surgery support by verified professionals.
                </p>
                <div className="flex items-center gap-2 text-sm text-black transition-colors duration-300 hover:text-emerald-600">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Rajkot, Gujarat, India</span>
                </div>
              </div>

              {/* Column 2: Home Care Services */}
              <div>
                <h4 className="text-sm font-bold text-emerald-600 mb-4 uppercase tracking-wider">Home Care Services</h4>
                <ul className="space-y-3">
                  {footerLinks["Home Care Services"].map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-black inline-block cursor-pointer transition-colors duration-300 hover:text-emerald-600 hover:translate-x-1 transition-all">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Company */}
              <div>
                <h4 className="text-sm font-bold text-emerald-600 mb-4 uppercase tracking-wider">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.Company.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a href={link.href} className="text-sm text-black hover:translate-x-1 transition-all duration-300 inline-block underline-offset-2 hover:text-emerald-600">
                          {link.name}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-black hover:translate-x-1 transition-all duration-300 inline-block underline-offset-2 hover:text-emerald-600">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 border-t border-black/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
              <motion.div className="text-center md:text-left" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <p className="text-xs text-black font-medium hover:text-emerald-600 transition-colors">
                  {`© ${new Date().getFullYear()} SevaLink. All rights reserved.`}
                </p>
                <p className="text-xs text-black/80 mt-1 hover:text-emerald-600 transition-colors">
                  Professional home care services in Rajkot, Gujarat
                </p>
              </motion.div>
              <div className="mt-2 md:mt-0 w-full md:w-auto flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs text-black text-center">
                <a href={`${MAIN_SITE_URL}/privacy-policy`} className="whitespace-nowrap hover:translate-x-0.5 hover:text-emerald-600 transition-all">Privacy Policy</a>
                <span className="hidden sm:block w-1 h-1 bg-black/30 rounded-full" />
                <a href={`${MAIN_SITE_URL}/terms-and-conditions`} className="whitespace-nowrap hover:translate-x-0.5 hover:text-emerald-600 transition-all">Terms & Conditions</a>
                <span className="hidden sm:block w-1 h-1 bg-black/30 rounded-full" />
                <a href={`${MAIN_SITE_URL}/refund-policy`} className="whitespace-nowrap hover:translate-x-0.5 hover:text-emerald-600 transition-all">Refund Policy</a>
                <span className="hidden sm:block w-1 h-1 bg-black/30 rounded-full" />
                <motion.button onClick={scrollToTop} className="text-black flex items-center gap-2 group font-semibold hover:gap-3 hover:text-emerald-600 transition-all" whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  Back to top
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                    <ArrowUp className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
