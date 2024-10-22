import axios from "axios";

export const mangadexAxios = axios.create({
  baseURL: "https://api.mangadex.org/",
});
