import Navbar from "../../components/Navbar";

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <main className="py-12 max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-3xl font-bold text-white mb-2">Experience</h1>
        <p className="text-stone-400 mb-12">My academic and professional journey.</p>

        {/* WORK EXPERIENCE */}
        <section className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8 border-b border-stone-800 pb-2">
            Work History
          </h2>

          <div className="flex flex-col gap-8">
            {/* Placeholder Item */}
            <div className="relative border-l border-stone-800 pl-8 ml-2">
              <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-stone-700 border border-[#0a0a0a]"></span>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-stone-200">[Job Title]</h3>
                <span className="text-sm font-mono text-stone-500">[Date Range]</span>
              </div>
              <p className="text-stone-400 text-sm mb-4">[Company Name] • [Location]</p>
              <ul className="list-disc list-outside ml-4 text-stone-400 text-sm leading-relaxed space-y-2 marker:text-stone-600">
                <li>[Responsibility or achievement one]</li>
                <li>[Responsibility or achievement two]</li>
                <li>[Responsibility or achievement three]</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8 border-b border-stone-800 pb-2">
            Education
          </h2>

          <div className="relative border-l border-stone-800 pl-8 ml-2">
             <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-stone-700 border border-[#0a0a0a]"></span>
             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-stone-200">DEC in Computer Science Technology</h3>
                <span className="text-sm font-mono text-stone-500">2023 — 2026</span>
              </div>
              <p className="text-stone-400 text-sm">Champlain College Saint-Lambert</p>
              <p className="text-stone-500 text-sm mt-4">
                <strong>Relevant Coursework:</strong> Data Structures, Algorithms, Web Development, Linux Administration, Database Management.
              </p>
          </div>
        </section>
      </main>
    </>
  );
}