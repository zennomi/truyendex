import { Constants } from "@/constants";
import Axios from "axios";

const axios = Axios.create({
  baseURL: Constants.BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

axios.interceptors.request.use(
  (config) => {
    // Dynamically set the baseURL before each request
    if (typeof window !== "undefined") {
      if (window.location.hostname !== "localhost") {
        const hostname = window.location.hostname;
        const domain = hostname.substring(
          hostname.lastIndexOf(".", hostname.lastIndexOf(".") - 1) + 1,
        );
        config.baseURL = `https://api.${domain}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { axios };
