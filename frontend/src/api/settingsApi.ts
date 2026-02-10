import axiosClient from "./axiosClient";
import { api } from "./api";

export interface SystemSettingResponseDTO {
    settingKey: string;
    settingValue: string;
    description: string;
}

export interface SystemSettingRequestDTO {
    settingValue: string;
    description?: string;
}

export const settingsApi = {
    // Get all settings
    getAll: async () => {
        const response = await axiosClient.get<SystemSettingResponseDTO[]>("/api/settings");
        return response.data;
    },

    // Get single setting
    get: async (key: string) => {
        const response = await axiosClient.get<SystemSettingResponseDTO>(`/api/settings/${key}`);
        return response.data;
    },

    // Create or Update setting
    update: async (key: string, value: string, description?: string) => {
        const payload: SystemSettingRequestDTO = {
            settingValue: value,
            description
        };
        // Use PUT for update/create idempotent
        const response = await axiosClient.put<SystemSettingResponseDTO>(`/api/settings/${key}`, payload);
        return response.data;
    },

    // Reuse the existing Image Upload API for PDFs (since it just uploads to MinIO and returns URL)
    uploadFile: async (file: File, customFilename?: string) => {
        const formData = new FormData();
        formData.append("file", file);
        if (customFilename) {
            formData.append("filename", customFilename);
        }

        const response = await axiosClient.post<{ imageUrl: string }>("/api/images", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data.imageUrl; // Returns the MinIO URL
    }
};
