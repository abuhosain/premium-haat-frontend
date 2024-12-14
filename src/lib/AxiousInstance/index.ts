import envConfig from "@/src/config/env.confg";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: envConfig.baseApi,
  });

  export default axiosInstance