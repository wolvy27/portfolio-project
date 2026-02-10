import axiosClient from "./axiosClient";

export type ExperienceType = "WORK" | "EDUCATION";

export interface ExperienceRequestDTO {
    type: ExperienceType;
    institution: string;
    englishRole: string;
    frenchRole: string;
    englishDescription: string;
    frenchDescription: string;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
}

export interface ExperienceResponseDTO {
    experienceId: string;
    type: ExperienceType;
    institution: string;
    englishRole: string;
    frenchRole: string;
    englishDescription: string;
    frenchDescription: string;
    startDate: string;
    endDate: string;
}

export const experiencesApi = {
    getAll: async () => {
        const response = await axiosClient.get<ExperienceResponseDTO[]>("/api/experiences");
        return response.data;
    },

    getById: async (id: string) => {
        const response = await axiosClient.get<ExperienceResponseDTO>(`/api/experiences/${id}`);
        return response.data;
    },

    create: async (data: ExperienceRequestDTO) => {
        return axiosClient.post<ExperienceResponseDTO>("/api/experiences", data);
    },

    update: async (id: string, data: ExperienceRequestDTO) => {
        return axiosClient.put<ExperienceResponseDTO>(`/api/experiences/${id}`, data);
    },

    delete: async (id: string) => {
        return axiosClient.delete(`/api/experiences/${id}`);
    }
};
