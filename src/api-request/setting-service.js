import axios from "./auth-header";

// User Logs ===============================================================
export const getUserLogs = async (params = {}) => {
  const response = await axios.get("/user-logs", { params });
  return response.data;
};

export const showUserLogs = async (id) => {
  const response = await axios.get(`/user-logs/${id}`);
  return response.data;
};

// Email ===============================================================
export const getSettingEmails = async (params = {}) => {
  const response = await axios.get("/setting-email-smtp", { params });
  return response.data;
};

export const createSettingEmail = async (data) => {
  const response = await axios.post("/setting-email-smtp", data);
  return response.data;
};

export const showSettingEmail = async (email) => {
  const response = await axios.get(`/setting-email-smtp/${email}`);
  return response.data;
};

export const updateSettingEmail = async (id, data) => {
  const response = await axios.put(`/setting-email-smtp/${id}`, data);
  return response.data;
};

export const deleteSettingEmail = async (id) => {
  const response = await axios.delete(`/setting-email-smtp/${id}`);
  return response.data;
};

// Announcement ==============================================================
export const getSystemAnnounces = async (params = {}) => {
  const response = await axios.get("/setting-announcements", { params });
  return response.data;
};

export const createSystemAnnounce = async (data) => {
  const response = await axios.post("/setting-announcements", data);
  return response.data;
};

export const updateSystemAnnounce = async (id, data) => {
  const response = await axios.put(`/setting-announcements/${id}`, data);
  return response.data;
};

export const deleteSystemAnnounce = async (id) => {
  const response = await axios.delete(`/setting-announcements/${id}`);
  return response.data;
};

// Sub Attributes ===============================================================
export const getSettingSubAttributes = async (params = {}) => {
  const response = await axios.get("/setting-sub-attributes", { params });
  return response.data;
};

export const createSettingSubAttribute = async (data) => {
  const response = await axios.post("/setting-sub-attributes", data);
  return response.data;
};

export const updateSettingSubAttribute = async (id, data) => {
  const response = await axios.put(`/setting-sub-attributes/${id}`, data);
  return response.data;
};

export const deleteSettingSubAttribute = async (id) => {
  const response = await axios.delete(`/setting-sub-attributes/${id}`);
  return response.data;
};

// Attributes ===============================================================
export const getSettingAttributes = async (params = {}) => {
  const response = await axios.get("/setting-attributes", { params });
  return response.data;
};

export const createSettingAttribute = async (data) => {
  const response = await axios.post("/setting-attributes", data);
  return response.data;
};

export const updateSettingAttribute = async (id, data) => {
  const response = await axios.put(`/setting-attributes/${id}`, data);
  return response.data;
};

export const deleteSettingAttribute = async (id) => {
  const response = await axios.delete(`/setting-attributes/${id}`);
  return response.data;
};

// Categories ===============================================================
export const getSettingCategories = async (params = {}) => {
  const response = await axios.get("/setting-categories", { params });
  return response.data;
};

export const createSettingCategory = async (data) => {
  const response = await axios.post("/setting-categories", data);
  return response.data;
};

export const updateSettingCategory = async (id, data) => {
  const response = await axios.put(`/setting-categories/${id}`, data);
  return response.data;
};

export const deleteSettingCategory = async (id) => {
  const response = await axios.delete(`/setting-categories/${id}`);
  return response.data;
};

// Sub Categories ===============================================================
export const getSettingSubCategories = async (params = {}) => {
  const response = await axios.get("/setting-sub-categories", { params });
  return response.data;
};

export const createSettingSubCategory = async (data) => {
  const response = await axios.post("/setting-sub-categories", data);
  return response.data;
};

export const updateSettingSubCategory = async (id, data) => {
  const response = await axios.put(`/setting-sub-categories/${id}`, data);
  return response.data;
};

export const deleteSettingSubCategory = async (id) => {
  const response = await axios.delete(`/setting-sub-categories/${id}`);
  return response.data;
};
