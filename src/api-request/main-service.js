import axios from "./auth-header";

// job classfication
export const fetchAttributes = async () => {
  const response = await axios.get("/fetch-attributes");
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get("/fetch-categories");
  return response.data;
};

// Manage Users ===============================================================
export const getUsers = async (params = {}) => {
  const response = await axios.get("/manage-users", { params });
  return response.data;
};

export const createUser = async (data) => {
  const response = await axios.post("/manage-users", data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await axios.put(`/manage-users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/manage-users/${id}`);
  return response.data;
};

export const showUser = async (id) => {
  const response = await axios.get(`/manage-users/${id}`);
  return response.data;
};

// Job Vacancies List =======================================================
export const getJobVacancies = async (params = {}) => {
  const response = await axios.get("/job-employeers", { params });
  return response.data;
};

export const createJobVacancy = async (data) => {
  const response = await axios.post("/job-employeers", data);
  return response.data;
};

export const updateJobVacancy = async (id, data) => {
  const response = await axios.put(`/job-employeers/${id}`, data);
  return response.data;
};

export const getJobVacancy = async (id) => {
  const response = await axios.get(`/job-employeers/${id}`);
  return response.data;
};

export const deleteJobVacancy = async (id) => {
  const response = await axios.delete(`/job-employeers/${id}`);
  return response.data;
};

// Job Applications List =======================================================
export const getApplicationJobLists = async (params = {}) => {
  const response = await axios.get("/job-applications", { params });
  return response.data;
};

export const storeApplicationJobList = async (data) => {
  const response = await axios.post("/job-applications", data);
  return response.data;
};

export const deleteApplicationJobList = async (id) => {
  const response = await axios.delete(`/job-applications/${id}`);
  return response.data;
};

// Job Seeker List =============================================================
export const getSeekerJobLists = async (params = {}) => {
  const response = await axios.get("/job-seekers", { params });
  return response.data;
};

export const showSeekerJobList = async (code) => {
  const response = await axios.get(`/job-seekers/${code}`);
  return response.data;
};

export const updateSeekerJobList = async (id, data) => {
  const response = await axios.put(`/job-seekers/${id}`, data);
  return response.data;
};

export const storeSeekerJob = async (data) => {
  const response = await axios.post("/job-seekers", data);
  return response.data;
};


// Peso School Bulk Uploads =============================================================
export const gePesoBulkUploadLists = async (params = {}) => {
  const response = await axios.get("/bulk-uploads", { params });
  return response.data;
};

export const updatePesoBulkUpload = async (id, data) => {
  const response = await axios.put(`/bulk-uploads/${id}`, data);
  return response.data;
};

export const storePesoBulkUpload = async (formData) => {
  const response = await axios.post("/bulk-uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deletePesoBulkUpload = async (id) => {
  const response = await axios.delete(`/bulk-uploads/${id}`);
  return response.data;
};

