import axios from "axios";

export const getAllCategories = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/category/all");
        return response?.data;
    } catch (error) {
        return error?.response?.data;
    }
};