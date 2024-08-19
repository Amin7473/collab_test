import axios from "axios";
import { signOut } from "next-auth/react";
import apiEndPoints from "./apiEndPoints";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}`,
});

instance.interceptors.request.use((config) => {
  document.body.style.cursor = "wait";
  return config;
});
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Reset cursor to default here
    document.body.style.cursor = "default";
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Reset cursor to default here as well
    document.body.style.cursor = "default";
    return Promise.reject(error);
  }
);
export default instance;
