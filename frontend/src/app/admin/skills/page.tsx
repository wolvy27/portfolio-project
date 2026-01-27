"use client";

import { useState } from "react";

export default function AdminSkills() {
  const [isAdding, setIsAdding] = useState(false);

  // Mock Data
  const [skills, setSkills] = useState([
    { id: 1, name: "Java", category: "Backend" },
    { id: 2, name: "Spring Boot", category: "Backend" },
    { id: 3, name: "Next.js", category: "Frontend" },
    { id: 4, name: "NixOS", category: "DevOps" },
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-stone-800 pb-6">
        <div>
           <h1 className="text-3xl font-bold text-white font-mono">Skills Manager</h1>
           <p className="text-stone-500 mt-2 text-sm">Manage technical competencies displayed on the About page.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-stone-200 transition font-mono flex items-center gap-2"
        >
          {isAdding ? "Close Form" : "+ Add Skill"}
        </button>
      </div>

      {/* ADD FORM (Toggles) */}
      {isAdding && (
        <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-6 mb-8 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono mb-4">New Skill Entry</h3>
            <div className="flex gap-4">
                <input type="text" placeholder="Skill Name (e.g. Rust)" className="flex-1 bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                <select className="bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none w-48">
                    <option>Backend</option>
                    <option>Frontend</option>
                    <option>DevOps</option>
                    <option>Tools</option>
                </select>
                <button className="bg-emerald-600 text-white px-6 rounded text-sm font-bold hover:bg-emerald-500 transition font-mono">
                    Save
                </button>
            </div>
        </div>
      )}

      {/* SKILL CATEGORIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["Backend", "Frontend", "DevOps", "Tools"].map((category) => (
            <div key={category} className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-6">
                <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest font-mono mb-4 border-b border-stone-800 pb-2">
                    {category}
                </h2>
                <div className="flex flex-wrap gap-2">
                    {skills.filter(s => s.category === category).map(skill => (
                        <div key={skill.id} className="group flex items-center gap-2 bg-[#0a0a0a] border border-stone-800 px-3 py-1.5 rounded hover:border-stone-600 transition cursor-default">
                            <span className="text-stone-300 text-sm font-mono">{skill.name}</span>
                            <button className="text-stone-600 hover:text-red-400 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                    {skills.filter(s => s.category === category).length === 0 && (
                        <span className="text-stone-700 text-xs italic">No skills added yet.</span>
                    )}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}