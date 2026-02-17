"use client";

import { Link, usePathname } from "../i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t("Projects"), href: "/projects" },
    { name: t("Experience"), href: "/experience" },
    { name: t("About"), href: "/about" },
    { name: t("Testimonials"), href: "/testimonials" },
    { name: t("Contact"), href: "/contact" },
  ];

  const switchLocale = locale === "en" ? "fr" : "en";

  return (
    <div className="w-full pt-6 mb-8 relative z-50">
      <nav className="max-w-4xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity z-50">
          L. Kairns
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-stone-400 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${isActive ? "text-white font-bold" : "hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href={pathname}
            locale={switchLocale}
            className="ml-4 text-xs uppercase border border-stone-700 px-2 py-1 rounded text-stone-400 hover:border-stone-500 hover:text-white transition"
          >
            {switchLocale}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-stone-400 hover:text-white z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center animate-in fade-in duration-200">
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-2xl font-medium transition-colors ${isActive ? "text-white font-bold" : "text-stone-400 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="w-16 h-px bg-stone-800 mx-auto my-4"></div>

              <Link
                href={pathname}
                locale={switchLocale}
                className="text-lg uppercase border border-stone-700 px-6 py-2 rounded text-stone-400 hover:border-stone-500 hover:text-white transition inline-block mx-auto"
              >
                Switch to {switchLocale.toUpperCase()}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}