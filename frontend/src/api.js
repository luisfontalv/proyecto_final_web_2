import axiosInstance from "axios";

const instance = axiosInstance.create({
  baseURL: "http://localhost:4000",
});

export default instance;
