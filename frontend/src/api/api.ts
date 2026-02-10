import axiosClient from "./axiosClient";

// --- Types (DTOs) ---

export interface AuthResponse {
  token: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}


export interface TestimonialResponseDTO {
  testimonialId: string;
  authorName: string;
  authorRole: string;
  content: string;
  receivedAt: string;
  approved: boolean; // Changed from isApproved to match backend DTO
}

export interface TestimonialRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  companyRole?: string;
  content: string;
  faxNumber?: string; // The Honeypot field
}

export interface MessageRequest {
  senderName: string;
  email: string;
  content: string;
  faxNumber?: string; // The Honeypot field
}

export interface MessageResponseDTO {
  messageId: string;
  senderName: string;
  senderEmail: string;
  messageBody: string;
  receivedAt: string;
  read: boolean;
}

// --- API Methods ---

export const api = {

  // Authentication
  auth: {
    login: async (data: AuthRequest) => {
      const response = await axiosClient.post<AuthResponse>("/api/auth/login", data);
      return response.data;
    },
    register: async (data: AuthRequest) => {
      const response = await axiosClient.post<AuthResponse>("/api/auth/register", data);
      return response.data;
    },
  },

  // Testimonials
  testimonials: {
    // Public: Get only approved testimonials
    getApproved: async () => {
      const response = await axiosClient.get<TestimonialResponseDTO[]>("/api/testimonials/approved");
      return response.data;
    },

    // Admin: Get ALL testimonials (Requires Token)
    getAll: async () => {
      const response = await axiosClient.get<TestimonialResponseDTO[]>("/api/testimonials");
      return response.data;
    },

    // Public: Submit a testimonial
    submit: async (firstName: string, lastName: string, email: string, content: string, companyRole?: string) => {
      const payload: TestimonialRequestDTO = {
        firstName,
        lastName,
        email,
        companyRole,
        content,
        faxNumber: "" // <--- TRAP SET
      };
      return axiosClient.post("/api/testimonials", payload);
    },

    // Admin: Approve or Reject
    updateStatus: async (id: string, isApproved: boolean) => {
      // Backend expects { "approved": boolean }
      return axiosClient.patch<TestimonialResponseDTO>(`/api/testimonials/${id}/status`, { approved: isApproved });
    },

    // Admin: Delete
    delete: async (id: string) => {
      return axiosClient.delete(`/api/testimonials/${id}`);
    }
  },

  // Contact Messages
  messages: {
    send: async (senderName: string, email: string, content: string) => {
      const payload: MessageRequest = {
        senderName,
        email,
        content,
        faxNumber: "" // <--- TRAP SET
      };
      return axiosClient.post("/api/messages", payload);
    },

    // Admin: Get All Messages
    getAll: async () => {
      const response = await axiosClient.get<MessageResponseDTO[]>("/api/messages");
      return response.data;
    },

    // Admin: Mark as Read
    markAsRead: async (id: string) => {
      // Mark message as read
      const response = await axiosClient.patch<MessageResponseDTO>(`/api/messages/${id}/read`);
      return response.data;
    },

    // Admin: Delete
    delete: async (id: string) => {
      return axiosClient.delete(`/api/messages/${id}`);
    }
  }
};