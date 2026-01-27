"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    // Outer wrapper: Full width
    <div className="w-full pt-6 mb-8">
        {/* Inner wrapper: Centered & Constrained */}
        <nav className="max-w-4xl mx-auto px-6 flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
                L. Kairns
            </Link>

            <div className="flex gap-6 text-sm font-medium text-stone-400">
                {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link 
                    key={link.name} 
                    href={link.href}
                    className={`transition-colors ${
                        isActive ? "text-white font-bold" : "hover:text-white"
                    }`}
                    >
                    {link.name}
                    </Link>
                );
                })}
                <button className="ml-4 text-xs uppercase border border-stone-700 px-2 py-1 rounded text-stone-400 hover:border-stone-500 hover:text-white transition">
                EN / FR
                </button>
            </div>
        </nav>
    </div>
  );
}