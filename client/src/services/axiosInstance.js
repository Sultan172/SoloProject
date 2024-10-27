import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000/api',
  baseUrl: '/api',
  withCredentials: true,
});

let accessToken = '';

export function setAccessToken(newToken) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    console.log("🚀 ~ prevRequest:", prevRequest)
    
    if (error.response.status === 403 && !prevRequest.sent) {
      const response = await axios('http://localhost:3000/api/tokens/refresh');
      console.log("🚀 ~ response:", response.data)
      accessToken = response.data.accessToken;
      console.log("🚀 ~ accessToken:", accessToken)
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
