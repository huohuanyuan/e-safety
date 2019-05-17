import axios from 'axios';

// axios.defaults.baseURL = 'http://192.168.1.57:8080/safety'; // wang
// axios.defaults.baseURL = 'http://192.168.1.57:8080/safety'; // wang
// axios.defaults.baseURL = 'http://192.168.1.42:8080/safety'; // libo
axios.defaults.baseURL = 'http://192.168.1.200:8092/safety'; // wang
// axios.defaults.baseURL = 'http://192.168.1.48:8080/safety'; // nanyuan
// axios.defaults.baseURL = '/safety'; // dev

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage['token']) {
      config.headers.common['Authorization'] = `Bearer ${localStorage['token']}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // localStorage['token'] = "";
          // location.replace("/login");
      }
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  });


export default axios
