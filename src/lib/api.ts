import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export type ApiError = {
  status: number;
  message: string;
};

function toApiError(error: unknown): ApiError {
  const err = error as AxiosError<{ message?: string }>;
  return {
    status: err.response?.status ?? 0,
    message: err.response?.data?.message ?? err.message,
  };
}

export async function getJSON<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const { data } = await api.get<T>(url, config);
    return data;
  } catch (e) {
    throw toApiError(e);
  }
}

export async function postJSON<T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
) {
  try {
    const { data } = await api.post<T>(url, body, config);
    return data;
  } catch (e) {
    throw toApiError(e);
  }
}
