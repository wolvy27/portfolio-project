"use client";

import { useEffect, useState } from "react";
import { settingsApi } from "../../../api/settingsApi";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [resumeUploading, setResumeUploading] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<{ [key: string]: string }>({});

  // Helper to get value safely
  const getSetting = (key: string) => settings[key] || "";

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsApi.getAll();
      const map: { [key: string]: string } = {};
      data.forEach(s => map[s.settingKey] = s.settingValue);
      setSettings(map);
    } catch (error) {
      console.error("Failed to load settings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Promise.all([
        settingsApi.update("contact_email", getSetting("contact_email")),
        settingsApi.update("contact_phone", getSetting("contact_phone")), // Optional
        settingsApi.update("social_linkedin", getSetting("social_linkedin")),
        settingsApi.update("social_github", getSetting("social_github")),
      ]);
      alert("Contact info saved!");
    } catch (error) {
      console.error("Failed to save settings", error);
      alert("Failed to save.");
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setResumeUploading(true);

    try {
      // Set filename based on language
      const langKey = getSetting("resume_lang_selection") === "French" ? "resume_fr.pdf" : "resume_en.pdf";

      // Upload file
      const fileUrl = await settingsApi.uploadFile(file, langKey);

      // Update state
      // Refresh current link
      alert(`Resume uploaded as ${langKey}!`);

      // Optional: Force reload or just let the static link be valid
    } catch (error) {
      console.error("Failed to upload resume", error);
      alert("Upload failed.");
    } finally {
      setResumeUploading(false);
    }
  };


  const currentLangSelection = getSetting("resume_lang_selection") || "English";
  const resumeFilename = currentLangSelection === "French" ? "resume_fr.pdf" : "resume_en.pdf";
  // Constructing URL
  const currentResumeUrl = `/api/images/${resumeFilename}`;

  if (loading) return <div className="text-stone-500 font-mono animate-pulse">Loading settings...</div>;

  return (
    <div className="w-full max-w-[1600px]">
      <div className="mb-10 border-b border-stone-800 pb-6">
        <h1 className="text-3xl font-bold text-white font-mono">Global Settings</h1>
        <p className="text-stone-500 mt-2 text-sm">Manage your contact details and resume file.</p>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">

        {/* CONTACT INFO CARD */}
        <div className="2xl:col-span-2 bg-[#0f0f0f] border border-stone-800 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-8 border-b border-stone-800 pb-4">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
            <h2 className="text-lg font-bold text-white font-mono tracking-tight">Contact Information</h2>
          </div>

          <form className="space-y-8" onSubmit={handleSaveContactInfo}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Public Email</label>
                <input
                  type="email"
                  value={getSetting("contact_email")}
                  onChange={e => handleChange("contact_email", e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Phone (Optional)</label>
                <input
                  type="text"
                  value={getSetting("contact_phone")}
                  onChange={e => handleChange("contact_phone", e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">LinkedIn URL</label>
              <input
                type="text"
                value={getSetting("social_linkedin")}
                onChange={e => handleChange("social_linkedin", e.target.value)}
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">GitHub URL</label>
              <input
                type="text"
                value={getSetting("social_github")}
                onChange={e => handleChange("social_github", e.target.value)}
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-white text-black px-8 py-3 rounded text-sm font-bold hover:bg-stone-200 transition font-mono shadow-lg shadow-white/5">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* RESUME UPLOAD CARD */}
        <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-8 flex flex-col h-full min-w-0">
          <div className="flex items-center gap-3 mb-8 border-b border-stone-800 pb-4">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]"></span>
            <h2 className="text-lg font-bold text-white font-mono tracking-tight">Resume File</h2>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            {/* Language Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Language Version</label>
              <select
                value={currentLangSelection}
                onChange={e => handleChange("resume_lang_selection", e.target.value)}
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-4 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none cursor-pointer"
              >
                <option value="English">English Version</option>
                <option value="French">French Version</option>
              </select>
            </div>

            {/* Current File Display */}
            <div className="bg-[#0a0a0a] border border-stone-800 rounded p-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest whitespace-nowrap">Current URL</p>
                {currentResumeUrl && (
                  <a href={currentResumeUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-stone-400 hover:text-white underline uppercase tracking-widest whitespace-nowrap">Download</a>
                )}
              </div>
              <div className="flex items-center gap-3 text-emerald-400 font-mono text-sm overflow-hidden">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <span className="truncate" title={currentResumeUrl || "No file uploaded"}>
                  {currentResumeUrl ? currentResumeUrl.split('/').pop() : "No file uploaded"}
                </span>
              </div>
            </div>

            {/* Drop Zone */}
            <label className="border-2 border-dashed border-stone-800 rounded-lg flex-1 min-h-[200px] flex flex-col items-center justify-center p-6 text-center hover:border-stone-600 hover:bg-[#0a0a0a] transition cursor-pointer group">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleResumeUpload}
                disabled={resumeUploading}
              />
              <div className="w-14 h-14 rounded-full bg-stone-900 flex items-center justify-center mb-4 group-hover:bg-stone-800 transition shadow-inner">
                {resumeUploading ? (
                  <span className="animate-spin text-stone-400">↻</span>
                ) : (
                  <svg className="w-6 h-6 text-stone-400 group-hover:text-stone-200 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                )}
              </div>
              <span className="text-stone-300 text-sm font-bold">
                {resumeUploading ? "Uploading..." : "Click to Upload PDF"}
              </span>
              <span className="text-stone-600 text-xs mt-2">Max 5MB</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}