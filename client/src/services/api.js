import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-for-ragjs.onrender.com/api",
});

export default API;