import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
export const api = axios.create({
  baseURL,
});
