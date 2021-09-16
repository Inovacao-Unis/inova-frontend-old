import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('itka');

const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
  crossDomain: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
