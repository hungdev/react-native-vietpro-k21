import { create } from 'apisauce';

const api = create({
  baseURL: 'https://slack.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: 'no-cache',
  },
  withCredentials: true,
  timeout: 60000,
});

export function postMessage(params) { return api.get(`/chat.postMessage`, params); }
export function getChanel(params) { return api.get(`/channels.list`, params); }