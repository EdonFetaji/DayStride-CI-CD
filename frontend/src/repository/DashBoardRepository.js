// src/repositories/DashboardRepository.js
import axiosInstance from "../axios/axios";

const DashboardRepository = {
  fetchUserDashboard: async () => {
    return await axiosInstance.get("/dashboard/");
  },
};

export default DashboardRepository;
