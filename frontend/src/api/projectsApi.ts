import axiosClient from "./axiosClient";

export interface ProjectResponseDTO {
  projectId: string;
  englishTitle: string;
  frenchTitle: string;
  englishDescription: string;
  frenchDescription: string;
  techStack: string[];
  deployed: boolean;
  demoUrl: string;
  repoUrl: string;
  projectImage: string; // The URL string
  displayOrder: number;
}

export interface ProjectRequestDTO {
  englishTitle: string;
  frenchTitle: string;
  englishDescription: string;
  frenchDescription: string;
  techStack: string[];
  deployed: boolean;
  demoUrl: string;
  repoUrl: string;
  projectImage: string;
  displayOrder: number;
}

export const projectsApi = {
  getAll: async () => {
    const response = await axiosClient.get<ProjectResponseDTO[]>("/api/projects");
    return response.data;
  },

  // Admin: Create (JSON)
  create: async (data: ProjectRequestDTO) => {
    return axiosClient.post<ProjectResponseDTO>("/api/projects", data);
  },

  // Admin: Update (JSON)
  update: async (id: string, data: ProjectRequestDTO) => {
    return axiosClient.put<ProjectResponseDTO>(`/api/projects/${id}`, data);
  },

  delete: async (id: string) => {
    return axiosClient.delete(`/api/projects/${id}`);
  },

  // Generic Image Upload Helper
  // Image upload
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosClient.post<string>("/api/images", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data; // Returns the MinIO URL string
  }
};