import axios from "axios";

export const SERVER_URL = "https://api.vadercash.com/api/";

export const client = axios.create({
  baseURL: SERVER_URL,
});
