import axios from "./auth-header";

export const fetchCategories = async () => {
    const response = await axios.get('/fetch-categories');
    return response.data;
};

export const fetchSubCategories = async () => {
    const response = await axios.get('/fetch-sub-categories');
    return response.data;
};