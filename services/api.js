import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('itka');

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
  crossDomain: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
