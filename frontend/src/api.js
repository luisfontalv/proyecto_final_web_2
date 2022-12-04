import axiosInstance from "axios";

const instance = axiosInstance.create({
  baseURL: "http://proyectofinalwebdos.ml:4000",
});

export default instance;
