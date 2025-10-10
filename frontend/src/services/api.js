import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pricingAPI = {
  // Health check
  getHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Single recommendation
  getRecommendation: async (record) => {
    const response = await api.post('/recommend', { record });
    return response.data;
  },

  // Batch recommendations
  getBatchRecommendations: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/recommend_batch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // KPI comparison
  calculateKPIs: async (fileBase, fileScn) => {
    const formData = new FormData();
    formData.append('file_base', fileBase);
    formData.append('file_scn', fileScn);
    
    const response = await api.post('/kpis', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;