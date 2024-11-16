import axios from "axios";
import { API_URL } from "./useEnv";
export const useAxios = () =>
  axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
