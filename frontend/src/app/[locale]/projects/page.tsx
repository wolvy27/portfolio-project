"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { projectsApi, ProjectResponseDTO } from "../../../api/projectsApi";
import { useTranslations, useLocale } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [projects, setProjects] = useState<ProjectResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectsApi.getAll();
        // Filter deployed projects and sort by displayOrder
        const published = data
          .filter((p) => p.deployed)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

        setProjects(published);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.projectId}
                className="group border border-stone-800 bg-[#0f0f0f] p-6 rounded-lg hover:border-stone-600 transition flex flex-col"
              >
                {/* Project Image */}
                <div className="h-48 bg-stone-900 rounded mb-6 flex items-center justify-center overflow-hidden border border-stone-800 relative">
                  {project.projectImage ? (
                    <img
                      src={project.projectImage}
                      alt={project.englishTitle}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
                    />
                  ) : (
                    <div className="text-stone-600 font-mono text-sm">
                      ~/no-image.png
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-xl text-stone-100 mb-2">
                  {locale === "fr" ? project.frenchTitle : project.englishTitle}
                </h3>

                <p className="text-stone-400 text-sm mb-6 leading-relaxed flex-grow">
                  {locale === "fr" ? project.frenchDescription : project.englishDescription}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6 text-xs text-stone-500 font-mono">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-stone-900 px-2 py-1 rounded border border-stone-800 group-hover:border-stone-700 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-stone-800/50 mt-auto">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-white hover:text-emerald-400 transition flex items-center gap-1"
                    >
                      {t("LiveDemo")}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-stone-400 hover:text-white transition flex items-center gap-1"
                    >
                      {t("SourceCode")}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <p className="text-stone-500 font-mono text-sm">{t("NoProjects")}</p>
        )}
      </main>
    </>
  );
}