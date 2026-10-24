import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/dishes`,
});

export const getDishes = () => api.get('/');
export const getDish = (id) => api.get(`/${id}`);
export const createDish = (data) => api.post('/', data);
export const updateDish = (id, data) => api.put(`/${id}`, data);
export const toggleAvailability = (id, availability) =>
  api.patch(`/${id}/availability`, { availability });
export const deleteDish = (id) => api.delete(`/${id}`);