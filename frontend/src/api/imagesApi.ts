import axiosClient from "./axiosClient";

export interface ImageUploadResponse {
    imageUrl: string;
}

export const imagesApi = {
    upload: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        // Header should be multipart/form-data, axios handles this automatically with FormData
        const response = await axiosClient.post<ImageUploadResponse>("/api/images", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    }
};
