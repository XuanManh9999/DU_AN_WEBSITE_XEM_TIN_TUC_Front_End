import axios from "axios";

export const getAllArticles = async (limit = 10, offset = 0, sortBy = "id", order = "desc") => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/articles/all", {
            params: {
                limit,
                offset,
                sortBy,
                order
            }
        });
        return response?.data;
    } catch (error) {
        return error?.response?.data;
    }
};

export const searchArticles = async (query, limit = 10, offset = 0, sortBy = "createAt", order = "desc") => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/articles/all", {
            params: {
                title: query,
                limit,
                offset,
                sortBy,
                order
            }
        });
        return response?.data;
    } catch (error) {
        return error?.response?.data;
    }
};