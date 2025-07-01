import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('auth_user');

    if (user && config.headers) {
      config.headers['X-Auth-User'] = user;
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        console.warn('Authentication error detected');
        localStorage.removeItem('auth_user');
        window.location.href = '/login';
      }

      console.error(
        'API Error:',
        error.response.data?.message || error.response.statusText
      );
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
