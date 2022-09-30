import axios from "axios";

// TODO: setup api base url from .env file
    
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export default api;
