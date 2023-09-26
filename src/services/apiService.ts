// src/apiService.ts
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3100'; // Replace with your API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const updateData = async (data: unknown) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Replace '/api/update' with your actual API endpoint
    const response = await api.put('/api/update', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchData = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Replace '/api/data' with your actual API endpoint
    const response = await api.get('/api/data');
    return response.data;
  } catch (error) {
    throw error;
  }
};
