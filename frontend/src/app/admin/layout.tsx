"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "../globals.css";

import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);

    // Auth Check
    const token = localStorage.getItem("jwt_token");
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // Login Page is special (fullscreen, no sidebar)
  if (pathname === "/admin/login") {
    return (
      <html lang="en">
        <body className={`${jetbrains.className} bg-[#0a0a0a] text-stone-200 antialiased`}>
          {children}
        </body>
      </html>
    );
  }

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Projects", href: "/admin/projects" },
    { name: "Experience", href: "/admin/experience" },
    { name: "Skills", href: "/admin/skills" },
    { name: "Testimonials", href: "/admin/testimonials" },
    { name: "Settings", href: "/admin/settings" },

  ];

  return (
    <html lang="en">
      <body className={`${jetbrains.className} bg-[#0a0a0a] text-stone-200 antialiased`}>
        <div className="flex h-screen bg-[#0a0a0a] text-stone-200 font-sans overflow-hidden">

          {/* Desktop Sidebar */}
          <aside className="w-64 border-r border-stone-800 p-6 hidden md:flex flex-col shrink-0">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-white tracking-tight">Admin Panel</h1>
              <p className="text-xs text-stone-500 mt-1">CMS Management</p>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
              {adminLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                      ? "bg-stone-800 text-white"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-900"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <button className="mt-auto flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition px-3 py-2">
              <span>Log Out</span>
            </button>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">

            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 border-b border-stone-800 bg-[#0a0a0a]/95 backdrop-blur z-20">
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-white tracking-tight">Admin Panel</h1>
                <p className="text-[10px] text-stone-500">CMS Management</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-stone-400 hover:text-white"
              >
                {/* Burger Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div className="md:hidden fixed inset-0 z-30 bg-[#0a0a0a] flex flex-col p-6 animate-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-stone-400 hover:text-white"
                  >
                    {/* Close Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {adminLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${isActive
                          ? "bg-stone-800 text-white"
                          : "text-stone-400 hover:text-stone-200 hover:bg-stone-900"
                          }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto">
                  <button className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 transition px-4 py-3 rounded-md border border-stone-800 hover:bg-stone-900">
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}