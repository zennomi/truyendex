import { Constants } from "@/constants";
import { Utils } from "@/utils";
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
    config.baseURL = Utils.Url.getBackendUrl();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { axios };
