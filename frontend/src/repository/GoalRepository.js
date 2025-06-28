// src/repositories/GoalRepository.js
import axiosInstance from "../axios/axios";

const GoalRepository = {
  findAllPublic: async () => {
    // Default GET /goals/ → public goals only
    return await axiosInstance.get("/goals/");
  },

  findUserGoals: async () => {
    // Custom GET /goals/my/ → authenticated user's goals
    return await axiosInstance.get("/goals/my/");
  },

  findById: async (id) => {
    return await axiosInstance.get(`/goals/${id}/`);
  },

  create: async (data) => {
    return await axiosInstance.post("/goals/", data);
  },

  update: async (id, data) => {
    return await axiosInstance.put(`/goals/${id}/`, data);
  },

  partialUpdate: async (id, data) => {
    return await axiosInstance.patch(`/goals/${id}/`, data);
  },

  delete: async (id) => {
    return await axiosInstance.delete(`/goals/${id}/`);
  },
};

export default GoalRepository;
