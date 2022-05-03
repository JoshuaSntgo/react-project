import axios from "axios";
import { cloneDeep } from "lodash";
import {fetchFromStorage} from "../utilities/Storage"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  axiosInstance.interceptors.request.use(async (config) => {
    const clonedConfig = cloneDeep(config);
  
    return clonedConfig;
  });
  
  export default axiosInstance;
  