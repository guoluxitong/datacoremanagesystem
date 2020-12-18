import axios from 'axios'
import { Message } from 'element-ui'


//const baseURL = 'https://apis.sdcsoft.com.cn'
//axios.defaults.baseURL = 'https://apis.sdcsoft.com.cn'
const baseURL = '/api'
const request = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true//携带身份认证文件（cookie）
});
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
);
request.interceptors.response.use(
  response => response,
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  },
);
export default request