import Link from "next/link";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      {/* Background decoration (optional subtle glow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stone-900/20 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-sm z-10">
        <div className="mb-6 text-center">
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
                L. Kairns
            </Link>
            <p className="text-stone-500 text-xs mt-2 uppercase tracking-widest font-mono">System Access</p>
        </div>

        <div className="bg-[#0f0f0f] border border-stone-800 p-8 rounded-lg shadow-2xl">
          <form className="flex flex-col gap-5">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase font-mono">Username</label>
              <input 
                type="text" 
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors font-mono"
                placeholder="admin"
              />
            </div>
            
            <div className="space-y-1">
               <label className="text-xs font-bold text-stone-500 uppercase font-mono">Password</label>
              <input 
                type="password" 
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors font-mono"
                placeholder="••••••••"
              />
            </div>

            <button className="mt-2 bg-white text-black py-3 rounded text-sm font-bold hover:bg-stone-200 transition-colors">
              Authenticate
            </button>
          </form>
        </div>

        <p className="text-center text-stone-600 text-xs mt-6">
          Authorized personnel only. <br/> Access attempts are logged.
        </p>
      </div>
    </div>
  );
}