import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/services`;

export const addService = (data) =>
  axios.post(`${API}/add`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateService = (id, data) =>
  axios.put(`${API}/edit/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });


// DELETE
export const deleteService = (id) =>
  axios.delete(`${API}/delete/${id}`);

// GET ALL
export const getAllServices = () =>
  axios.get(`${API}/list`);

// GET BY SLUG
export const getServiceBySlug = (slug) =>
  axios.get(`${API}/slug/${slug}`);
