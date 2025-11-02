import axios from "./auth-header";

// Messages ===============================================================
export const getUserMessages = async (params = {}) => {
  const response = await axios.get("/messages", { params });
  return response.data;
};

export const chatUserMessage = async (otherUserId) => {
  const response = await axios.get(`/messages/${otherUserId}`);
  return response.data;
};

export const sendUserMessage = async (data) => {
  const response = await axios.post("/messages", data);
  return response.data;
};

export const deleteUserMessage = async (otherUserId) => {
  const response = await axios.delete(`/messages/${otherUserId}`);
  return response.data;
};

// User Profile Setting =====================================================
export const getInfoProfileSetting = async () => {
  const response = await axios.get("/profile-setting");
  return response.data;
};

export const updateImgProfileSetting = async (id, data) => {
  data.append('_method', 'PUT');

  return await axios.post(`/profile-setting/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateInfoProfileSetting = async (data) => {
  const response = await axios.post("/profile-setting", data);
  return response.data;
};

export const deleteInfoProfileSetting = async (password) => {
  const response = await axios.delete(`/profile-setting/${password}`);
  return response.data;
};

export const updatePassProfileSetting = async (data) => {
  const response = await axios.post("/change-password", data);
  return response.data;
};

export const storeJobExpriences = async (data) => {
  const response = await axios.post("/job-expriences", data);
  return response.data;
};

export const updateNotificationSettings = async (data) => {
  const response = await axios.post("/update-notifications", data);
  return response.data;
};




