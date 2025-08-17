import axios from 'axios';
import type { AuthResponse, Dog, DogRegistrationForm, DogSearchParams, LoginForm, RegisterForm, User } from '../types';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('paww_token');
  const userId = localStorage.getItem('paww_user_id');
  
  if (token && userId) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['X-userId'] = userId;
  }
  
  return config;
});

// Auth API
export const authAPI = {
  login: async (credentials: LoginForm): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterForm): Promise<string> => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },
};

// Dog API
export const dogAPI = {
  create: async (dogData: DogRegistrationForm): Promise<Dog> => {
    const formData = new FormData();
    
    // Create the data object without the image
    const { image, ...dataWithoutImage } = dogData;
    formData.append('data', new Blob([JSON.stringify(dataWithoutImage)], { type: 'application/json' }));
    
    if (image) {
      formData.append('image', image);
    }

    const response = await api.post('/dogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  search: async (params: DogSearchParams): Promise<Dog[]> => {
    const response = await api.get('/dogs', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Dog> => {
    const response = await api.get(`/dogs/${id}`);
    return response.data;
  },
};

// Location API
export const locationAPI = {
  getStates: async (): Promise<string[]> => {
    const response = await api.get('/locations/states');
    return response.data;
  },

  getCities: async (state: string): Promise<string[]> => {
    const response = await api.get('/locations/cities', { params: { state } });
    return response.data;
  },

  getLocalities: async (state: string, city: string): Promise<string[]> => {
    const response = await api.get('/locations/localities', { params: { state, city } });
    return response.data;
  },

  getStreets: async (state: string, city: string, locality: string): Promise<string[]> => {
    const response = await api.get('/locations/streets', { params: { state, city, locality } });
    return response.data;
  },
};

export default api;