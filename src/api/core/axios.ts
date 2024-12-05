import { Constants } from "@/constants";
import Axios from "axios";

export const axios = Axios.create({
  baseURL: Constants.BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});
