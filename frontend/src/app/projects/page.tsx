import Navbar from "../../components/Navbar";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="py-12 max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
        <p className="text-stone-400 mb-12">A selection of things I've built.</p>

        {/* Hardcoded Dummy Data */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Portfolio CMS */}
            <div className="group border border-stone-800 bg-[#0f0f0f] p-6 rounded-lg hover:border-stone-600 transition">
              <div className="h-48 bg-stone-900 rounded mb-6 flex items-center justify-center text-stone-600 border border-stone-800 font-mono text-sm">
                ~/portfolio-cms/screenshot.png
              </div>
              <h3 className="font-bold text-xl text-stone-100 mb-2">Portfolio CMS</h3>
              <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                A bilingual content management system built with Spring Boot and Next.js. 
                Features a custom admin dashboard and JWT authentication.
              </p>
              <div className="flex gap-2 text-xs text-stone-500 font-mono">
                <span className="bg-stone-900 px-2 py-1 rounded">Spring Boot</span>
                <span className="bg-stone-900 px-2 py-1 rounded">Next.js</span>
              </div>
            </div>

            {/* Card 2: Home Lab Storage */}
            <div className="group border border-stone-800 bg-[#0f0f0f] p-6 rounded-lg hover:border-stone-600 transition">
              <div className="h-48 bg-stone-900 rounded mb-6 flex items-center justify-center text-stone-600 border border-stone-800 font-mono text-sm">
                 ~/homelab/minio.png
              </div>
              <h3 className="font-bold text-xl text-stone-100 mb-2">Home Lab Storage</h3>
              <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                Self-hosted S3-compatible object storage using MinIO and NixOS on a Raspberry Pi. 
                Access secured via Tailscale funnel.
              </p>
              <div className="flex gap-2 text-xs text-stone-500 font-mono">
                <span className="bg-stone-900 px-2 py-1 rounded">NixOS</span>
                <span className="bg-stone-900 px-2 py-1 rounded">MinIO</span>
                <span className="bg-stone-900 px-2 py-1 rounded">Tailscale</span>
              </div>
            </div>
        </div>
      </main>
    </>
  );
}