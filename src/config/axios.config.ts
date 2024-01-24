import axios from 'axios';
import { configure } from 'axios-hooks';
// import * as LRU from 'lru-cache';
import { AppConfig } from './app.config';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});
export default instance;
