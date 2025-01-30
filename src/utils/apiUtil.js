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

export const getDashboard = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.get("/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during dashboard data fetching:", error);
    return {
      success: false,
      error: error.response.data.message || "An unknown error occurred",
    };
  }
};

export const getAllLinks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.get("/links/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during links data fetching:", error);
    return {
      success: false,
      error: error.response.data.message || "An unknown error occurred",
    };
  }
};

export const deleteLink = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.delete(`/links/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during links data fetching:", error);
    return {
      success: false,
      error: error.response.data.message || "An unknown error occurred",
    };
  }
};

export const createLink = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.post("/links", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during links data fetching:", error);
    return {
      success: false,
      error: error.response.data.message || "An unknown error occurred",
    };
  }
};

export const updateLink = async (formData, id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.put(`/links/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during links data fetching:", error);
    return {
      success: false,
      error: error.response.data.message || "An unknown error occurred",
    };
  }
};

export const redirectToLink = async (linkId) => {
  try {
    const response = await apiClient.get(`/links/${linkId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during redirection:", error.response.data.message);
    return {
      success: false,
      error: error?.response?.data?.message,
    };
  }
};

export const getAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.get("/analytics", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during analytics fetching:", error);
    return {
      success: false,
      error: error.response.data.message || "An unknown error occurred",
    };
  }
};
