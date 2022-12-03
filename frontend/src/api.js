import axiosInstance from "axios";

const instance = axiosInstance.create({
  baseURL: "http://54.186.91.154:5000",
});

export default instance;
