"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { experiencesApi, ExperienceResponseDTO } from "../../../api/experiencesApi";
import { useTranslations, useLocale } from "next-intl";

export default function ExperiencePage() {
  const t = useTranslations("Experience");
  const locale = useLocale();
  const [experiences, setExperiences] = useState<ExperienceResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await experiencesApi.getAll();
        // Sort by startDate descending
        setExperiences(data.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()));
      } catch (error) {
        console.error("Failed to load experiences", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const workHistory = experiences.filter(e => e.type === "WORK");
  const educationHistory = experiences.filter(e => e.type === "EDUCATION");

  const formatDate = (dateString: string) => {
    if (!dateString) return t("Present");
    return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <>
      <Navbar />
      <main className="py-12 max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-3xl font-bold text-white mb-2">{t("Title")}</h1>
        <p className="text-stone-400 mb-12">{t("Subtitle")}</p>

        {isLoading ? (
          <div className="text-stone-500 font-mono text-sm animate-pulse">
            {t("Loading")}
          </div>
        ) : (
          <>
            {/* Work History */}
            <section className="mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8 border-b border-stone-800 pb-2">
                {t("WorkHistory")}
              </h2>

              <div className="flex flex-col gap-12">
                {workHistory.length > 0 ? workHistory.map((job) => (
                  <div key={job.experienceId} className="relative border-l border-stone-800 pl-8 ml-2">
                    <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-stone-700 border border-[#0a0a0a]"></span>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <h3 className="text-lg font-bold text-stone-200">{locale === "fr" ? job.frenchRole : job.englishRole}</h3>
                      <span className="text-sm font-mono text-stone-500">
                        {formatDate(job.startDate)} — {job.endDate ? formatDate(job.endDate) : t("Present")}
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm mb-4">{job.institution}</p>
                    <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-line">
                      {locale === "fr" ? job.frenchDescription : job.englishDescription}
                    </p>
                  </div>
                )) : (
                  <p className="text-stone-500 text-sm font-mono">{t("NoWork")}</p>
                )}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8 border-b border-stone-800 pb-2">
                {t("Education")}
              </h2>

              <div className="flex flex-col gap-12">
                {educationHistory.length > 0 ? educationHistory.map((edu) => (
                  <div key={edu.experienceId} className="relative border-l border-stone-800 pl-8 ml-2">
                    <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-stone-700 border border-[#0a0a0a]"></span>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <h3 className="text-lg font-bold text-stone-200">{locale === "fr" ? edu.frenchRole : edu.englishRole}</h3>
                      <span className="text-sm font-mono text-stone-500">
                        {formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : t("Present")}
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm mb-4">{edu.institution}</p>
                    <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-line">
                      {locale === "fr" ? edu.frenchDescription : edu.englishDescription}
                    </p>
                  </div>
                )) : (
                  <p className="text-stone-500 text-sm font-mono">{t("NoEducation")}</p>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}