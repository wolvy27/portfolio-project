"use client";

import { useState } from "react";

export default function AdminProjects() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock Data (matches your Database Schema)
  const [projects, setProjects] = useState([
    { id: 1, title_en: "Portfolio CMS", status: "Published" },
    { id: 2, title_en: "Home Lab Storage", status: "Published" },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white font-mono">Projects</h1>
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
        /* EDIT FORM (Bilingual Support) */
        <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-6 max-w-2xl">
          <h2 className="text-lg font-bold text-white mb-6 font-mono">Edit Project</h2>
          
          <form className="flex flex-col gap-6">
            {/* ENGLISH SECTION */}
            <div className="space-y-4 border-l-2 border-stone-700 pl-4">
               <h3 className="text-xs font-bold text-stone-500 uppercase font-mono">English Content</h3>
               <div className="grid gap-2">
                 <label className="text-xs text-stone-400 font-mono">Title (EN)</label>
                 <input type="text" className="bg-[#0a0a0a] border border-stone-800 rounded p-2 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
               </div>
               <div className="grid gap-2">
                 <label className="text-xs text-stone-400 font-mono">Description (EN)</label>
                 <textarea rows={3} className="bg-[#0a0a0a] border border-stone-800 rounded p-2 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"></textarea>
               </div>
            </div>

            {/* FRENCH SECTION */}
            <div className="space-y-4 border-l-2 border-stone-700 pl-4">
               <h3 className="text-xs font-bold text-stone-500 uppercase font-mono">French Content</h3>
               <div className="grid gap-2">
                 <label className="text-xs text-stone-400 font-mono">Title (FR)</label>
                 <input type="text" className="bg-[#0a0a0a] border border-stone-800 rounded p-2 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
               </div>
               <div className="grid gap-2">
                 <label className="text-xs text-stone-400 font-mono">Description (FR)</label>
                 <textarea rows={3} className="bg-[#0a0a0a] border border-stone-800 rounded p-2 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"></textarea>
               </div>
            </div>

             {/* META DATA */}
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <label className="text-xs text-stone-400 font-mono">Tech Stack (Comma sep)</label>
                    <input type="text" placeholder="Java, React" className="bg-[#0a0a0a] border border-stone-800 rounded p-2 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                </div>
                <div className="grid gap-2">
                    <label className="text-xs text-stone-400 font-mono">Image URL (S3)</label>
                    <input type="text" className="bg-[#0a0a0a] border border-stone-800 rounded p-2 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                </div>
             </div>

            <div className="flex gap-3 mt-4">
              <button className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-stone-200 transition font-mono">Save Changes</button>
              <button onClick={() => setIsEditing(false)} className="border border-stone-700 text-stone-400 px-4 py-2 rounded text-sm font-bold hover:text-white transition font-mono">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}