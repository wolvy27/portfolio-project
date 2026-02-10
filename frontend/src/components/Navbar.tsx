"use client";

import { Link, usePathname } from "../i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();

  const navLinks = [
    { name: t("Projects"), href: "/projects" },
    { name: t("Experience"), href: "/experience" },
    { name: t("About"), href: "/about" },
    { name: t("Testimonials"), href: "/testimonials" },
    { name: t("Contact"), href: "/contact" },
  ];

  const switchLocale = locale === "en" ? "fr" : "en";

  return (
    <div className="w-full pt-6 mb-8">
      <nav className="max-w-4xl mx-auto px-6 flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
          L. Kairns
        </Link>

        <div className="flex gap-6 text-sm font-medium text-stone-400">
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
      </nav>
    </div>
  );
}