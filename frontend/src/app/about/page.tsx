import Navbar from "../../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="py-12 max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-3xl font-bold text-white mb-8">About Me</h1>
        
        {/* Hobbies Section */}
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-6">Hobbies & Interests</h2>
          <div className="text-stone-400 leading-relaxed space-y-4 max-w-2xl">
            <p>
              I am driven by a constant curiosity for new technologies. 
              Whether it is refining my home lab setup or diving into a new programming ecosystem, 
              I am always looking to expand my technical horizons.
            </p>
            <p>
              When I step away from the keyboard, 
              I am an avid reader of speculative fiction and a dedicated supporter of the Montreal Canadiens 
              (on YouTube Game Highlights). 
              I am also an advocate of green tea and honey over coffee.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-6">Technical Skills</h2>
          <div className="flex flex-wrap gap-2 max-w-xl">
             {["Java", "Spring Boot", "NixOS", "PostgreSQL", "Next.js", "Docker", "Git", "Linux"].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-[#0f0f0f] border border-stone-800 rounded text-sm text-stone-300">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}