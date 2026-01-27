"use client";

import { useState } from "react";

export default function AdminExperience() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock Data
  const [history, setHistory] = useState([
    { id: 1, role: "Full Stack Intern", company: "Software Company", type: "WORK", date: "2026 - Present" },
    { id: 2, role: "DEC Computer Science", company: "Champlain College", type: "EDUCATION", date: "2023 - 2026" },
  ]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-stone-800 pb-6">
        <div>
           <h1 className="text-3xl font-bold text-white font-mono">Experience & Education</h1>
           <p className="text-stone-500 mt-2 text-sm">Manage your professional timeline.</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-stone-200 transition font-mono"
        >
          + Add Entry
        </button>
      </div>

      {/* LIST VIEW */}
      {!isEditing ? (
        <div className="space-y-4">
            {history.map((item) => (
                <div key={item.id} className="group bg-[#0f0f0f] border border-stone-800 rounded-lg p-6 flex items-center justify-between hover:border-stone-600 transition">
                    <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded flex items-center justify-center border font-bold text-xs ${
                            item.type === 'WORK' ? 'bg-stone-900 border-stone-700 text-stone-300' : 'bg-stone-900 border-stone-800 text-stone-500'
                        }`}>
                            {item.type === 'WORK' ? 'JOB' : 'EDU'}
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">{item.role}</h3>
                            <p className="text-stone-500 text-sm font-mono">{item.company} • {item.date}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-stone-400 hover:text-white text-sm font-bold font-mono">Edit</button>
                        <button className="text-red-900 hover:text-red-500 text-sm font-bold font-mono">Delete</button>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        /* EDIT FORM */
        <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-8">
            <h2 className="text-lg font-bold text-white mb-6 font-mono">Add New Entry</h2>
            
            <form className="grid gap-6 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-500 uppercase font-mono">Type</label>
                        <select className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none">
                            <option value="WORK">Work Experience</option>
                            <option value="EDUCATION">Education</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-500 uppercase font-mono">Date Range</label>
                        <input type="text" placeholder="e.g. 2023 - 2026" className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase font-mono">Role / Degree (EN)</label>
                    <input type="text" className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                </div>
                
                <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase font-mono">Role / Degree (FR)</label>
                    <input type="text" className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase font-mono">Company / Institution</label>
                    <input type="text" className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none" />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase font-mono">Description (EN)</label>
                    <textarea rows={3} className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                    <button className="bg-white text-black px-6 py-2 rounded text-sm font-bold hover:bg-stone-200 transition font-mono">Save Entry</button>
                    <button onClick={() => setIsEditing(false)} className="border border-stone-700 text-stone-400 px-6 py-2 rounded text-sm font-bold hover:text-white transition font-mono">Cancel</button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
}