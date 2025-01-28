import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PORT = import.meta.env.VITE_API_PORT;

const API_URL = API_PORT ? `${API_BASE}:${API_PORT}` : API_BASE;

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

export const registerApi = async (formData) => {
  try {
    const response = await apiClient.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.response.data.errors) {
      return {
        success: false,
        error: error.response.data.errors || "Error Logging You ",
      };
    } else {
      return {
        success: false,
        error: "An unknown error occurred.",
      };
    }
  }
};

export const loginApi = async (formData) => {
  try {
    const response = await apiClient.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.response.data.errors) {
      return {
        success: false,
        error: error.response.data.errors || "Error Logging You ",
      };
    } else if (error.response.data.message) {
      return {
        success: false,
        error: error.response.data.message,
      };
    } else {
      return {
        success: false,
        error: "An unknown error occurred.",
      };
    }
  }
};

export const verifyUserApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.post(
      "/auth/verify",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during verification:", error);
    return {
      success: false,
      error: error.response.data.message || "An unknown error occured",
    };
  }
};
