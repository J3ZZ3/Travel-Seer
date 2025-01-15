import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'https://travel-seer-server.onrender.com/api';

const authHeader = () => {
  const user = getCurrentUser();
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const addFavorite = async (location, coordinates) => {
  const response = await axios.post(
    `${API_URL}/favorites`,
    { location, coordinates },
    { headers: authHeader() }
  );
  return response.data;
};

export const getFavorites = async () => {
  const response = await axios.get(`${API_URL}/favorites`, {
    headers: authHeader(),
  });
  return response.data;
};

export const removeFavorite = async (location) => {
  const response = await axios.delete(`${API_URL}/favorites/${location}`, {
    headers: authHeader(),
  });
  return response.data;
}; 