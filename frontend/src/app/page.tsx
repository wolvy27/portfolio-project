import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex flex-col justify-center min-h-[60vh] max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl mb-8">
          Building reliable software with a focus on simplicity.
        </h1>
        
        <p className="text-xl text-stone-400 max-w-2xl leading-relaxed mb-10">
          I'm Logan, a final-year Computer Science Technology student based in Quebec 
          with a deep interest in backend systems and NixOS.
        </p>
        
        <div className="flex gap-4">
           <Link href="/projects" className="bg-white text-black px-8 py-4 rounded-md text-sm font-bold hover:bg-stone-200 transition">
             View Work
           </Link>
           {/* Resume Download is a requirement */}
           <button className="px-8 py-4 rounded-md text-sm font-bold border border-stone-800 hover:bg-stone-900 text-stone-300 transition">
             Download Resume
           </button>
        </div>
      </main>
    </>
  );
}