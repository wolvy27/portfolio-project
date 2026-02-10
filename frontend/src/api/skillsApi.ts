import axiosClient from "./axiosClient";

export enum SkillCategory {
    BACKEND = "BACKEND",
    FRONTEND = "FRONTEND",
    DEVOPS = "DEVOPS",
    TOOLS = "TOOLS"
}

export interface SkillRequestDTO {
    name: string;
    category: SkillCategory;
    displayOrder?: number;
}

export interface SkillResponseDTO {
    skillId: string;
    name: string;
    category: SkillCategory;
    displayOrder: number;
}

export const skillsApi = {
    getAll: async () => {
        const response = await axiosClient.get<SkillResponseDTO[]>("/api/skills");
        return response.data;
    },

    create: async (data: SkillRequestDTO) => {
        return axiosClient.post<SkillResponseDTO>("/api/skills", data);
    },

    delete: async (id: string) => {
        return axiosClient.delete(`/api/skills/${id}`);
    }
};
