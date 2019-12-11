import axios from 'axios';

import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'http://192.168.30.113:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With':'XMLHttpRequest'
   }
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  } catch (err) {
    alert(err);
  }

});
export default api;