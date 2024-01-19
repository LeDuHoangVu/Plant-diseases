import axios from "axios";

const api = "https://305d-113-160-225-29.ngrok-free.app";
const callApi = axios.create({
  baseURL: api
});

callApi.defaults.withCredentials = true;

export default callApi;