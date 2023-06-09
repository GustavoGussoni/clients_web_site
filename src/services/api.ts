import axios from "axios";

const api = axios.create({
  baseURL: "https://clients-api-uz5w.onrender.com",
  timeout: 9000,
});

export default api;
