import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
  baseURL: configFile.apiEndPoint
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpared = refreshToken && expiresDate < Date.now();

    if (isExpared) {
      const { data } = await authService.refresh();
      localStorageService.setTokens(data);
    }
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500;

    if (!expectedErrors) {
      toast.error("An error occurred please try again later");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  put: http.put,
  post: http.post,
  get: http.get,
  delete: http.delete,
  patch: http.patch
};

export default httpService;
