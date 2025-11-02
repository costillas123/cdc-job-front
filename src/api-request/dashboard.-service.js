import axios from "./auth-header";

export const fetchAllNotif = async () => {
  const response = await axios.get("/notifications/fetch-all");
  return response.data;
};

export const fetchUnreadNotif = async () => {
  const response = await axios.get("/notifications/fetch-unread");
  return response;
};

export const markAllAsRead = async () => {
  const response = await axios.post("/notifications/mark-read");
  return response;
};

// ==================================================
export const getAnalytic1 = async () => {
  const response = await axios.get("/analytics/statics-one");
  return response.data;
};

export const getAnalytic2 = async (year) => {
  const params = year ? { year } : {};
  const response = await axios.get("/analytics/statics-two", { params });
  return response.data;
};

export const getAnalytic3 = async (year = null) => {
  const params = year ? { year } : {};
  const response = await axios.get("/analytics/statics-three", { params });
  return response.data;
};

export const getAnalytic4 = async (year = null) => {
  const params = year ? { year } : {};
  const response = await axios.get("/analytics/statics-four", { params });
  return response.data;
};

export const getAvailableYears = async () => {
  const response = await axios.get("/analytics/available-years");
  return response;
};

export const getJobWidgets = async () => {
  const response = await axios.get("/analytics/job-widgets");
  return response;
};

 // report =========================================================
export const processReportSelected = async (filters) => {
  const response = await axios.post("/generate/reports", filters, {
    responseType: "blob", 
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

