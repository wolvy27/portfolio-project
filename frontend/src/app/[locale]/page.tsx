"use client";

import Navbar from "../../components/Navbar";
import { Link } from "../../i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();

  const resumeFilename = locale === "fr" ? "resume_fr.pdf" : "resume_en.pdf";

  return (
    <>
      <Navbar />

      <main className="flex flex-col justify-center min-h-[60vh] max-w-4xl mx-auto px-6 w-full">

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">

          {/* Profile Image */}
          <img
            src="/api/images/logan_kairns.png"
            alt="Logan Kairns Face"
            className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full object-cover border-2 border-stone-800 bg-stone-900"
          />

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white max-w-2xl text-center md:text-left">
            {t("Title")}
          </h1>
        </div>

        <p className="text-xl text-stone-400 max-w-2xl leading-relaxed mb-10 text-center md:text-left">
          {t("Description")}
        </p>

        <div className="flex gap-4 justify-center md:justify-start">
          <Link href="/projects" className="bg-white text-black px-8 py-4 rounded-md text-sm font-bold hover:bg-stone-200 transition">
            {t("ViewWork")}
          </Link>
          {/* Resume Download */}
          <a
            href={`/api/images/${resumeFilename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-md text-sm font-bold border border-stone-800 hover:bg-stone-900 text-stone-300 transition block text-center"
          >
            {t("DownloadResume")}
          </a>
        </div>
      </main>
    </>
  );
}