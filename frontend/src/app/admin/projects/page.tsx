"use client";

import { useState, useEffect } from "react";
import { projectsApi, ProjectResponseDTO, ProjectRequestDTO } from "../../../api/projectsApi";
import { imagesApi } from "../../../api/imagesApi";

export default function AdminProjects() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectResponseDTO[]>([]);

  // Form State
  const [currentId, setCurrentId] = useState<string | null>(null);

  // MATCHING JAVA DTO STRUCTURE
  const [formData, setFormData] = useState({
    englishTitle: "",
    frenchTitle: "",
    englishDescription: "",
    frenchDescription: "",
    techStack: "", // Kept as string for input, split before sending
    demoUrl: "",
    repoUrl: "",
    projectImage: "", // URL from MinIO or placeholder
    deployed: false, // Matches Java Boolean
    displayOrder: 0
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await projectsApi.getAll();
      // Optional: Sort by displayOrder
      setProjects(data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalImageUrl = formData.projectImage;

      // Upload image
      if (selectedFile) {
        const uploadResponse = await imagesApi.upload(selectedFile);
        finalImageUrl = uploadResponse.imageUrl;
      }

      // Prepare payload
      const projectData: ProjectRequestDTO = {
        englishTitle: formData.englishTitle,
        frenchTitle: formData.frenchTitle,
        englishDescription: formData.englishDescription,
        frenchDescription: formData.frenchDescription,
        techStack: formData.techStack.split(",").map(s => s.trim()).filter(s => s !== ""),
        demoUrl: formData.demoUrl,
        repoUrl: formData.repoUrl,
        projectImage: finalImageUrl,
        deployed: formData.deployed,
        displayOrder: formData.displayOrder
      };

      // Create project
      if (currentId) {
        await projectsApi.update(currentId, projectData);
      } else {
        await projectsApi.create(projectData);
      }

      await fetchProjects();
      setIsEditing(false);
      resetForm();
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save project.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await projectsApi.delete(id);
      setProjects(projects.filter(p => p.projectId !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const resetForm = () => {
    setCurrentId(null);
    setFormData({
      englishTitle: "", frenchTitle: "", englishDescription: "", frenchDescription: "",
      techStack: "", demoUrl: "", repoUrl: "", projectImage: "", deployed: false, displayOrder: 0
    });
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const handleEditClick = (project: ProjectResponseDTO) => {
    setCurrentId(project.projectId);
    setFormData({
      englishTitle: project.englishTitle,
      frenchTitle: project.frenchTitle,
      englishDescription: project.englishDescription,
      frenchDescription: project.frenchDescription,
      techStack: project.techStack ? project.techStack.join(", ") : "",
      demoUrl: project.demoUrl || "",
      repoUrl: project.repoUrl || "",
      projectImage: project.projectImage || "",
      deployed: project.deployed,
      displayOrder: project.displayOrder || 0
    });
    setPreviewImage(project.projectImage);
    setIsEditing(true);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-mono">Projects</h1>
        <button
          onClick={() => { resetForm(); setIsEditing(true); }}
          className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-stone-200 transition font-mono"
        >
          + Add New
        </button>
      </div>

      {!isEditing ? (
        <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm text-stone-400 font-mono">
            <thead className="bg-stone-900 text-stone-500 uppercase">
              <tr>
                <th className="px-6 py-3">Title (EN)</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {projects.map((project) => (
                <tr key={project.projectId} className="hover:bg-stone-900/50 transition">
                  <td className="px-6 py-4 text-white font-bold">{project.englishTitle}</td>
                  <td className="px-6 py-4">
                    {/* Visual Status Indicator based on boolean */}
                    <span className={`px-2 py-1 rounded text-xs ${project.deployed ? 'bg-emerald-900/30 text-emerald-500' : 'bg-stone-800 text-stone-500'}`}>
                      {project.deployed ? "DEPLOYED" : "DRAFT"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button onClick={() => handleEditClick(project)} className="text-stone-300 hover:text-white hover:underline">Edit</button>
                    <button onClick={() => handleDelete(project.projectId)} className="text-red-400 hover:text-red-300 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-8 max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-8 font-mono border-b border-stone-800 pb-4">
            {currentId ? "Editing Project" : "New Project"}
          </h2>

          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* --- LEFT COLUMN --- */}
              <div className="space-y-6">
                {/* ENGLISH */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">English Content</h3>
                  <div className="space-y-2">
                    <label className="text-xs text-stone-400 font-mono">Title (EN)</label>
                    <input
                      type="text"
                      required
                      value={formData.englishTitle}
                      onChange={e => setFormData({ ...formData, englishTitle: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-stone-400 font-mono">Description (EN)</label>
                    <textarea
                      rows={4}
                      value={formData.englishDescription}
                      onChange={e => setFormData({ ...formData, englishDescription: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* FRENCH */}
                <div className="space-y-4 pt-4 border-t border-stone-800/50">
                  <h3 className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">French Content</h3>
                  <div className="space-y-2">
                    <label className="text-xs text-stone-400 font-mono">Title (FR)</label>
                    <input
                      type="text"
                      value={formData.frenchTitle}
                      onChange={e => setFormData({ ...formData, frenchTitle: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-stone-400 font-mono">Description (FR)</label>
                    <textarea
                      rows={4}
                      value={formData.frenchDescription}
                      onChange={e => setFormData({ ...formData, frenchDescription: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* --- RIGHT COLUMN --- */}
              <div className="space-y-6">
                {/* IMAGE UPLOAD */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">Project Image</label>
                  <label className="block relative cursor-pointer group">
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    <div className={`border-2 border-dashed border-stone-800 rounded-lg p-6 flex flex-col items-center justify-center text-center transition min-h-[200px] ${previewImage ? 'bg-[#0a0a0a]' : 'hover:border-stone-600 hover:bg-[#0a0a0a]'}`}>
                      {previewImage ? (
                        <div className="relative w-full h-full flex flex-col items-center">
                          <img src={previewImage} alt="Preview" className="max-h-[160px] rounded mb-4 object-contain" />
                          <span className="text-xs text-stone-500 underline">Click to change</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-stone-300 text-sm font-bold">Upload Screenshot</span>
                          <span className="text-stone-600 text-xs mt-2">PNG, JPG</span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* TECH STACK */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">Tech Stack</label>
                  <input
                    type="text"
                    placeholder="Java, Spring Boot, React..."
                    value={formData.techStack}
                    onChange={e => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                  />
                </div>

                {/* LINKS & STATUS */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">Demo URL</label>
                    <input
                      type="text"
                      value={formData.demoUrl}
                      onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase font-mono tracking-widest">Repo URL</label>
                    <input
                      type="text"
                      value={formData.repoUrl}
                      onChange={e => setFormData({ ...formData, repoUrl: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm font-mono focus:border-stone-500 outline-none"
                    />
                  </div>

                  {/* DEPLOYED CHECKBOX */}
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="deployed"
                      checked={formData.deployed}
                      onChange={e => setFormData({ ...formData, deployed: e.target.checked })}
                      className="w-4 h-4 rounded border-stone-800 bg-[#0a0a0a] text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="deployed" className="text-sm text-stone-300 font-mono">
                      Mark as Deployed / Published
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-6 border-t border-stone-800">
              <button type="submit" disabled={isLoading} className="bg-white text-black px-6 py-3 rounded text-sm font-bold hover:bg-stone-200 transition font-mono">
                {isLoading ? "Saving..." : "Save Project"}
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