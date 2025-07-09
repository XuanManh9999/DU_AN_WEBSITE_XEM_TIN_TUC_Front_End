import axiosInstance from "../config/ConfigAxios";

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/user/current");
        return response?.data;
    } catch (error) {
        return error?.response?.data;
    }
};