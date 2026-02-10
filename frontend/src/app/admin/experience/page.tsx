"use client";

import { useState, useEffect } from "react";
import { experiencesApi, ExperienceResponseDTO, ExperienceRequestDTO, ExperienceType } from "../../../api/experiencesApi";

export default function AdminExperience() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [experiences, setExperiences] = useState<ExperienceResponseDTO[]>([]);

    // Form State
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [formData, setFormData] = useState<ExperienceRequestDTO>({
        type: "WORK", // Default
        institution: "",
        englishRole: "",
        frenchRole: "",
        englishDescription: "",
        frenchDescription: "",
        startDate: "",
        endDate: ""
    });
    const [isCurrent, setIsCurrent] = useState(false);

    const fetchExperiences = async () => {
        try {
            const data = await experiencesApi.getAll();
            // Sort by startDate descending (newest first)
            setExperiences(data.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()));
        } catch (error) {
            console.error("Failed to load experiences", error);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Handle empty strings for backend compatibility
            const payload: ExperienceRequestDTO = {
                ...formData,
                endDate: isCurrent ? "" : formData.endDate
            };

            if (currentId) {
                await experiencesApi.update(currentId, payload);
            } else {
                await experiencesApi.create(payload);
            }

            await fetchExperiences();
            setIsEditing(false);
            resetForm();
        } catch (error) {
            console.error("Save failed", error);
            alert("Failed to save experience.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await experiencesApi.delete(id);
            setExperiences(experiences.filter(e => e.experienceId !== id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const resetForm = () => {
        setCurrentId(null);
        setFormData({
            type: "WORK",
            institution: "",
            englishRole: "",
            frenchRole: "",
            englishDescription: "",
            frenchDescription: "",
            startDate: "",
            endDate: ""
        });
        setIsCurrent(false);
    };

    const handleEditClick = (exp: ExperienceResponseDTO) => {
        setCurrentId(exp.experienceId);
        setFormData({
            type: exp.type,
            institution: exp.institution,
            englishRole: exp.englishRole,
            frenchRole: exp.frenchRole,
            englishDescription: exp.englishDescription,
            frenchDescription: exp.frenchDescription,
            startDate: exp.startDate,
            endDate: exp.endDate || ""
        });
        setIsCurrent(!exp.endDate); // If no end date, it's current
        setIsEditing(true);
    };

    // Helper to format date for display (simple year or Month Year)
    const formatDate = (dateString: string) => {
        if (!dateString) return "Present";
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
    };

    return (
        <div className="max-w-5xl mx-auto w-full">
            <div className="flex justify-between items-center mb-8 border-b border-stone-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white font-mono">Experience & Education</h1>
                    <p className="text-stone-500 mt-2 text-sm">Manage your professional timeline.</p>
                </div>
                <button
                    onClick={() => { resetForm(); setIsEditing(true); }}
                    className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-stone-200 transition font-mono"
                >
                    + Add Entry
                </button>
            </div>

            {/* LIST VIEW */}
            {!isEditing ? (
                <div className="space-y-4">
                    {experiences.map((item) => (
                        <div key={item.experienceId} className="group bg-[#0f0f0f] border border-stone-800 rounded-lg p-6 flex items-center justify-between hover:border-stone-600 transition">
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded flex items-center justify-center border font-bold text-xs ${item.type === 'WORK' ? 'bg-stone-900 border-stone-700 text-stone-300' : 'bg-stone-900 border-stone-800 text-stone-500'
                                    }`}>
                                    {item.type === 'WORK' ? 'JOB' : 'EDU'}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">{item.englishRole}</h3>
                                    <p className="text-stone-500 text-sm font-mono">{item.institution} • {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : "Present"}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditClick(item)} className="text-stone-400 hover:text-white text-sm font-bold font-mono">Edit</button>
                                <button onClick={() => handleDelete(item.experienceId)} className="text-red-900 hover:text-red-500 text-sm font-bold font-mono">Delete</button>
                            </div>
                        </div>
                    ))}
                    {experiences.length === 0 && (
                        <p className="text-stone-500 font-mono text-center py-8">No entries found.</p>
                    )}
                </div>
            ) : (
                /* EDIT FORM */
                <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-8">
                    <h2 className="text-lg font-bold text-white mb-6 font-mono border-b border-stone-800 pb-4">
                        {currentId ? "Edit Entry" : "New Entry"}
                    </h2>

                    <form className="grid gap-6 max-w-2xl" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-500 uppercase font-mono">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ExperienceType })}
                                    className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                                >
                                    <option value="WORK">Work Experience</option>
                                    <option value="EDUCATION">Education</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-500 uppercase font-mono">Start Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-500 uppercase font-mono">End Date</label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => {
                                        setFormData({ ...formData, endDate: e.target.value });
                                        setIsCurrent(false);
                                    }}
                                    disabled={isCurrent}
                                    className={`w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none ${isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="isCurrent"
                                        checked={isCurrent}
                                        onChange={(e) => {
                                            setIsCurrent(e.target.checked);
                                            if (e.target.checked) setFormData({ ...formData, endDate: "" });
                                        }}
                                        className="w-4 h-4 rounded border-stone-800 bg-[#0a0a0a] text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <label htmlFor="isCurrent" className="text-xs text-stone-400 font-mono cursor-pointer">Current Position</label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-500 uppercase font-mono">Role / Degree (EN)</label>
                            <input
                                type="text"
                                required
                                value={formData.englishRole}
                                onChange={(e) => setFormData({ ...formData, englishRole: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-500 uppercase font-mono">Role / Degree (FR)</label>
                            <input
                                type="text"
                                value={formData.frenchRole}
                                onChange={(e) => setFormData({ ...formData, frenchRole: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-500 uppercase font-mono">Company / Institution</label>
                            <input
                                type="text"
                                required
                                value={formData.institution}
                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-500 uppercase font-mono">Description (EN)</label>
                            <textarea
                                rows={3}
                                value={formData.englishDescription}
                                onChange={(e) => setFormData({ ...formData, englishDescription: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                            ></textarea>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-500 uppercase font-mono">Description (FR)</label>
                            <textarea
                                rows={3}
                                value={formData.frenchDescription}
                                onChange={(e) => setFormData({ ...formData, frenchDescription: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                            ></textarea>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-stone-800 mt-4">
                            <button type="submit" disabled={isLoading} className="bg-white text-black px-6 py-3 rounded text-sm font-bold hover:bg-stone-200 transition font-mono">
                                {isLoading ? "Saving..." : "Save Entry"}
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="border border-stone-700 text-stone-400 px-6 py-3 rounded text-sm font-bold hover:text-white transition font-mono">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}