import axios from "axios";
import { useNavigate } from "react-router-dom";

//Config url's to backend server
export const baseURL = "http://localhost:8000/api";
export const imageURL = "http://localhost:8000/storage/images/";

export const axiosBase = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const axiosWithBearer = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const axiosWithBearerFormData = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

axiosWithBearer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

axiosBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

axiosWithBearerFormData.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);
