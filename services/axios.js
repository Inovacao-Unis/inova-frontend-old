/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { parseCookies } from 'nookies';

// eslint-disable-next-line no-unused-vars
export function getAPI(ctx) {
  const { itkan: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true,
    crossDomain: true,
  });

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return api;
}
