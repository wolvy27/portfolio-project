"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../globals.css";

import { JetBrains_Mono } from "next/font/google";
import "../globals.css";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
    { name: "Messages", href: "/admin/messages" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <html lang="en">
      <body className={`${jetbrains.className} bg-[#0a0a0a] text-stone-200 antialiased`}>
        <div className="flex min-h-screen bg-[#0a0a0a] text-stone-200 font-sans">
          {/* Sidebar */}
          <aside className="w-64 border-r border-stone-800 p-6 flex flex-col hidden md:flex shrink-0">
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

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto w-full">
            <div className="w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}