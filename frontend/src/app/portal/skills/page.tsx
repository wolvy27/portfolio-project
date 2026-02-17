"use client";

import { useState, useEffect } from "react";
import { skillsApi, SkillResponseDTO, SkillCategory } from "../../../api/skillsApi";

export default function AdminSkills() {
  const [skills, setSkills] = useState<SkillResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Skill Form State
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>(SkillCategory.BACKEND);
  const [isAdding, setIsAdding] = useState(false);

  // Load Skills
  const fetchSkills = async () => {
    try {
      const data = await skillsApi.getAll();
      setSkills(data);
    } catch (error) {
      console.error("Failed to fetch skills", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Handle Create
  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return;

    try {
      await skillsApi.create({
        name: newSkillName,
        category: newSkillCategory,
        displayOrder: 0 // Default order
      });
      setNewSkillName("");
      setIsAdding(false);
      fetchSkills();
    } catch (error) {
      console.error("Failed to create skill", error);
      alert("Failed to add skill.");
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await skillsApi.delete(id);
      setSkills(skills.filter(s => s.skillId !== id));
    } catch (error) {
      console.error("Failed to delete skill", error);
    }
  };

  const categories = Object.values(SkillCategory);

  return (
    <div className="max-w-4xl mx-auto w-full">
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
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Skill Name (e.g. Rust)"
              className="flex-1 bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
            />
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
              className="bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none w-full md:w-48"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={handleAddSkill}
              disabled={!newSkillName.trim()}
              className="bg-emerald-600 text-white px-6 py-3 rounded text-sm font-bold hover:bg-emerald-500 transition font-mono disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* SKILL CATEGORIES GRID */}
      {isLoading ? (
        <div className="text-stone-500 font-mono text-sm animate-pulse">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category} className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-6">
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest font-mono mb-4 border-b border-stone-800 pb-2">
                {category}
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.filter(s => s.category === category).map(skill => (
                  <div key={skill.skillId} className="group flex items-center gap-2 bg-[#0a0a0a] border border-stone-800 px-3 py-1.5 rounded hover:border-stone-600 transition cursor-default">
                    <span className="text-stone-300 text-sm font-mono">{skill.name}</span>
                    <button
                      onClick={() => handleDelete(skill.skillId)}
                      className="text-stone-600 hover:text-red-400 transition ml-2"
                      title="Delete Skill"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {skills.filter(s => s.category === category).length === 0 && (
                  <span className="text-stone-700 text-xs italic font-mono">No skills added yet.</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}