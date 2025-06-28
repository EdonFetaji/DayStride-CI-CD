// src/api/createRepository.js
import axiosInstance from "../axios/axios";

const IRepository = (prefix) => ({
  findAll: async () => {
    return await axiosInstance.get(`${prefix}/`);
  },

  findById: async (id) => {
    return await axiosInstance.get(`${prefix}/${id}/`);
  },

  create: async (data) => {
    return await axiosInstance.post(`${prefix}/`, data);
  },

  update: async (id, data) => {
    return await axiosInstance.put(`${prefix}/${id}/`, data);
  },

  partialUpdate: async (id, data) => {
    return await axiosInstance.patch(`${prefix}/${id}/`, data);
  },

  delete: async (id) => {
    return await axiosInstance.delete(`${prefix}/${id}/`);
  },
});

export default IRepository;
