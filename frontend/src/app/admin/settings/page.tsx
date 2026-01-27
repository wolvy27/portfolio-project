export default function AdminSettings() {
  return (
    <div className="w-full max-w-[1600px]"> {/* Optional cap for ultra-wide screens */}
      <div className="mb-10 border-b border-stone-800 pb-6">
        <h1 className="text-3xl font-bold text-white font-mono">Global Settings</h1>
        <p className="text-stone-500 mt-2 text-sm">Manage your contact details and resume file.</p>
      </div>

      {/* CHANGED: 2xl breakpoint instead of xl. Stacks vertically on laptops. */}
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
        
        {/* CONTACT INFO CARD */}
        <div className="2xl:col-span-2 bg-[#0f0f0f] border border-stone-800 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-8 border-b border-stone-800 pb-4">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
            <h2 className="text-lg font-bold text-white font-mono tracking-tight">Contact Information</h2>
          </div>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Public Email</label>
                    <input type="email" defaultValue="logan@example.com" className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 focus:ring-1 focus:ring-stone-500 outline-none transition-all" />
                </div>
                <div className="space-y-3">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Phone (Optional)</label>
                    <input type="text" placeholder="+1 (555) ..." className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 focus:ring-1 focus:ring-stone-500 outline-none transition-all" />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">LinkedIn URL</label>
                <input type="text" defaultValue="linkedin.com/in/..." className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 focus:ring-1 focus:ring-stone-500 outline-none transition-all" />
            </div>

            <div className="space-y-3">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">GitHub URL</label>
                <input type="text" defaultValue="github.com/logankairns" className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 focus:ring-1 focus:ring-stone-500 outline-none transition-all" />
            </div>

            <div className="pt-4 flex justify-end">
                <button className="bg-white text-black px-8 py-3 rounded text-sm font-bold hover:bg-stone-200 transition font-mono shadow-lg shadow-white/5">
                    Save Changes
                </button>
            </div>
          </form>
        </div>

        {/* RESUME UPLOAD CARD */}
        <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-8 flex flex-col h-full min-w-0"> {/* min-w-0 prevents flex blowout */}
          <div className="flex items-center gap-3 mb-8 border-b border-stone-800 pb-4">
             <span className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]"></span>
             <h2 className="text-lg font-bold text-white font-mono tracking-tight">Resume File</h2>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            {/* Current File Display - FIXED LAYOUT */}
            <div className="bg-[#0a0a0a] border border-stone-800 rounded p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest whitespace-nowrap">Current File</p>
                    <button className="text-[10px] text-stone-400 hover:text-white underline uppercase tracking-widest whitespace-nowrap">Download</button>
                </div>
                <div className="flex items-center gap-3 text-emerald-400 font-mono text-sm overflow-hidden">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span className="truncate">resume_v4_final.pdf</span>
                </div>
            </div>

            {/* Drop Zone */}
            <div className="border-2 border-dashed border-stone-800 rounded-lg flex-1 min-h-[200px] flex flex-col items-center justify-center p-6 text-center hover:border-stone-600 hover:bg-[#0a0a0a] transition cursor-pointer group">
                <div className="w-14 h-14 rounded-full bg-stone-900 flex items-center justify-center mb-4 group-hover:bg-stone-800 transition shadow-inner">
                    <svg className="w-6 h-6 text-stone-400 group-hover:text-stone-200 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                </div>
                <span className="text-stone-300 text-sm font-bold">Click to Upload</span>
                <span className="text-stone-600 text-xs mt-2">PDF only (Max 5MB)</span>
            </div>
            
            <div className="space-y-3">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Language Version</label>
                <div className="relative">
                    <select className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none appearance-none cursor-pointer hover:border-stone-600 transition">
                        <option>English Version</option>
                        <option>French Version</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                         <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <button className="w-full bg-stone-100 text-black border border-transparent px-6 py-3 rounded text-sm font-bold hover:bg-white transition font-mono mt-2 shadow-lg shadow-white/5">
                Update Resume
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}