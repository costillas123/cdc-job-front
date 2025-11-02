import axios from "./auth-header";

export const login = async (query) => {
  const response = await axios.post("/login", query);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post("/logout");
  return response.data;
};

export const register = async (formData) => {
  const response = await axios.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post("/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axios.post("/reset-password", data);
  return response.data;
};

export const viewJobs = async (params = {}) => {
  const response = await axios.get("/view-jobs", { params });
  return response.data;
};

export const viewJobDetails = async (code) => {
  const response = await axios.get(`/view-job-details/${code}`);
  return response.data;
};

export const viewCategories = async () => {
  const response = await axios.get("/view-categories");
  return response.data;
};

export const storeGetInTouch = async (data) => {
  const response = await axios.post("/get-in-touch", data);
  return response.data;
};
