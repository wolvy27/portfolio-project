"use client";

import { useState } from "react";

export default function AdminProjects() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock Data
  const [projects, setProjects] = useState([
    { id: 1, title_en: "Portfolio CMS", status: "Published" },
    { id: 2, title_en: "Home Lab Storage", status: "Published" },
  ]);

  // Mock handle file select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Create a fake local URL just for preview purposes
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-mono">Projects</h1>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-stone-200 transition font-mono"
        >
          + Add New
        </button>
      </div>

      {/* LIST VIEW */}
      {!isEditing ? (
        <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm text-stone-400 font-mono">
            <thead className="bg-stone-900 text-stone-500 uppercase">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Title (EN)</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-stone-900/50 transition">
                  <td className="px-6 py-4">#{project.id}</td>
                  <td className="px-6 py-4 text-white font-bold">{project.title_en}</td>
                  <td className="px-6 py-4 text-emerald-500">{project.status}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button className="text-stone-300 hover:text-white hover:underline">Edit</button>
                    <button className="text-red-400 hover:text-red-300 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* EDIT FORM */
        <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-8 max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-8 font-mono border-b border-stone-800 pb-4">
            {selectedImage ? "Editing Project" : "New Project"}
          </h2>
          
          <form className="flex flex-col gap-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT COLUMN: Content */}
                <div className="space-y-6">
                    {/* ENGLISH SECTION */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">English Content</h3>
                        <div className="space-y-2">
                            <label className="text-xs text-stone-400 font-mono">Title (EN)</label>
                            <input type="text" className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-stone-400 font-mono">Description (EN)</label>
                            <textarea rows={4} className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"></textarea>
                        </div>
                    </div>

                    {/* FRENCH SECTION */}
                    <div className="space-y-4 pt-4 border-t border-stone-800/50">
                        <h3 className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">French Content</h3>
                        <div className="space-y-2">
                            <label className="text-xs text-stone-400 font-mono">Title (FR)</label>
                            <input type="text" className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-stone-400 font-mono">Description (FR)</label>
                            <textarea rows={4} className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"></textarea>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Media & Meta */}
                <div className="space-y-6">
                     
                     {/* IMAGE UPLOAD ZONE */}
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">Project Image</label>
                        
                        <label className="block relative cursor-pointer group">
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            
                            <div className={`border-2 border-dashed border-stone-800 rounded-lg p-6 flex flex-col items-center justify-center text-center transition min-h-[200px] ${
                                selectedImage ? 'bg-[#0a0a0a]' : 'hover:border-stone-600 hover:bg-[#0a0a0a]'
                            }`}>
                                {selectedImage ? (
                                    <div className="relative w-full h-full flex flex-col items-center">
                                        <img src={selectedImage} alt="Preview" className="max-h-[160px] rounded mb-4 object-contain" />
                                        <span className="text-xs text-stone-500 underline">Click to change</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center mb-4 group-hover:bg-stone-800 transition">
                                            <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <span className="text-stone-300 text-sm font-bold">Upload Screenshot</span>
                                        <span className="text-stone-600 text-xs mt-2">PNG, JPG (Max 5MB)</span>
                                    </>
                                )}
                            </div>
                        </label>
                     </div>

                     {/* TECH STACK */}
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">Tech Stack</label>
                        <input type="text" placeholder="Java, Spring Boot, React..." className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                        <p className="text-[10px] text-stone-600 font-mono">Separate technologies with commas.</p>
                     </div>

                     {/* LINKS */}
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">Demo URL</label>
                            <input type="text" placeholder="https://..." className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">Repo URL</label>
                            <input type="text" placeholder="https://github.com/..." className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                        </div>
                     </div>

                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-6 border-t border-stone-800">
              <button className="bg-white text-black px-6 py-3 rounded text-sm font-bold hover:bg-stone-200 transition font-mono shadow-lg shadow-white/5">
                Save Project
              </button>
              <button onClick={() => setIsEditing(false)} className="border border-stone-700 text-stone-400 px-6 py-3 rounded text-sm font-bold hover:text-white transition font-mono">
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}