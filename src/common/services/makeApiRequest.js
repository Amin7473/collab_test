import axios from "axios";
import { signOut } from "next-auth/react";
import store from "../store/store";
import apiEndPoints from "./apiEndPoints";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}`,
});
console.log(2)
instance.interceptors.request.use(async(config) => {
  const session = await getSession();
  const reduxStore = store.getState();
  console.log(reduxStore)
  // const token = reduxStore.auth.accessToken;
  const token = session.accessToken;
  console.log("This is token")
  console.log(session)
  console.log(token)

  console.log(100)

  const jwt = `Bearer ${token}`;

  if (token) {
    config.headers.Authorization = jwt;
  } else {
    config.headers.Authorization = null;
  }

  document.body.style.cursor = "wait";
  console.log(config)
  return config;
});
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Reset cursor to default here
    document.body.style.cursor = "default";
  console.log(4, response)

    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Reset cursor to default here as well
    document.body.style.cursor = "default";
    const session = await getSession();
    const reduxStore = store.getState();
    if ([401, 403, 405].includes(error?.request?.status)) {
    console.log(3)

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${apiEndPoints.USER_LOGOUT}`;
        const config = {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        };
        const res = await axios.post(apiUrl, {}, config);
        const data = res?.data;
        if (data?.status === "SUCCESS") {
          localStorage.clear();
        }
      } catch (error) {
        // ErrorToast({ text: 'Something went wrong.' });
      }
      localStorage.clear();
      signOut({
        redirect: true,
        callbackUrl: "/auth/login",
      });
    }

    return Promise.reject(error);
  }
);
export default instance;
