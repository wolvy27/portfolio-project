import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex flex-col justify-center min-h-[60vh] max-w-4xl mx-auto px-6 w-full">
        
        {/* Hero Section: Image (Left) + Text (Right) */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            
            {/* Profile Image - Now First */}
            <img 
              src="https://s3.logankairns.com/me.jpg" // Placeholder for Pi S3 MinIO URL
              alt="Logan Kairns Face" 
              className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full object-cover border-2 border-stone-800 bg-stone-900"
            />

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white max-w-2xl text-center md:text-left">
              Building reliable software with a focus on simplicity.
            </h1>
        </div>
        
        <p className="text-xl text-stone-400 max-w-2xl leading-relaxed mb-10 text-center md:text-left">
          I'm Logan, a final-year Computer Science Technology student based in Quebec 
          with a deep interest in backend systems and NixOS.
        </p>
        
        <div className="flex gap-4 justify-center md:justify-start">
           <Link href="/projects" className="bg-white text-black px-8 py-4 rounded-md text-sm font-bold hover:bg-stone-200 transition">
             View Work
           </Link>
           {/* Resume Download */}
           <button className="px-8 py-4 rounded-md text-sm font-bold border border-stone-800 hover:bg-stone-900 text-stone-300 transition">
             Download Resume
           </button>
        </div>
      </main>
    </>
  );
}