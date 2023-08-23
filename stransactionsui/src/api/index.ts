import axios from "axios";
const apiUrl = "http://localhost:5185/";
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-type": "application/json",
  },
});
export default api;
