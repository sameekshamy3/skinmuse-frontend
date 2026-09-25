import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL || "https://skin-muse-backend-1.vercel.app/api";

interface FetchOptions extends RequestInit {
  data?: any;
}

const getHeaders = async (optionsHeaders?: HeadersInit, isFormData?: boolean) => {
  const headers: Record<string, string> = {
    ...(optionsHeaders as Record<string, string>),
  };
  
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  get: async (endpoint: string, options: FetchOptions = {}) => {
    const headers = await getHeaders(options.headers);
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    if (!res.ok) {
      let errorMessage = `API Error: ${res.statusText}`;
      try {
        const errorData = await res.clone().json();
        if (errorData.message) errorMessage = errorData.message;
      } catch (e) {}
      throw new Error(errorMessage);
    }
    return res.json();
  },
  post: async (endpoint: string, data: any, options: FetchOptions = {}) => {
    const isFormData = data instanceof FormData;
    const headers = await getHeaders(options.headers, isFormData);
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });
    if (!res.ok) {
      let errorMessage = `API Error: ${res.statusText}`;
      try {
        const errorData = await res.clone().json();
        if (errorData.message) errorMessage = errorData.message;
      } catch (e) {}
      throw new Error(errorMessage);
    }
    return res.json();
  },
};
