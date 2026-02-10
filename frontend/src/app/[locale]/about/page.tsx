"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { skillsApi, SkillResponseDTO, SkillCategory } from "../../../api/skillsApi";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");
  const [skills, setSkills] = useState<SkillResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await skillsApi.getAll();
        setSkills(data);
      } catch (error) {
        console.error("Failed to load skills", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSkills();
  }, []);

  const categories = Object.values(SkillCategory);

  return (
    <>
      <Navbar />
      <main className="py-12 max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-3xl font-bold text-white mb-8">{t("Title")}</h1>

        {/* Hobbies */}
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-6">{t("HobbiesTitle")}</h2>
          <div className="text-stone-400 leading-relaxed space-y-4 max-w-2xl">
            <p>
              {t("P1")}
            </p>
            <p>
              {t("P2")}
            </p>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-6">{t("SkillsTitle")}</h2>

          {isLoading ? (
            <div className="text-stone-500 font-mono text-sm animate-pulse">{t("Loading")}</div>
          ) : (
            <div className="space-y-8">
              {categories.map((category) => {
                const categorySkills = skills.filter(s => s.category === category);
                if (categorySkills.length === 0) return null;

                return (
                  <div key={category}>
                    <h3 className="text-xs font-bold text-stone-600 uppercase mb-3 font-mono">{category}</h3>
                    <div className="flex flex-wrap gap-2 max-w-2xl">
                      {categorySkills.map((skill) => (
                        <span key={skill.skillId} className="px-3 py-1 bg-[#0f0f0f] border border-stone-800 rounded text-sm text-stone-300 font-mono">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
              {skills.length === 0 && (
                <p className="text-stone-500 text-sm italic">{t("NoSkills")}</p>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}