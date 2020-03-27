import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Network from '../config/Network';
import BaseConfig from '../config';
import { CUSTOMER_TOKEN } from '../config/Constants';

const getToken = async () => {
  const customerToken = await AsyncStorage.getItem(CUSTOMER_TOKEN);
  return customerToken;
};

// create an axios instance
const service = axios.create({
  baseURL: Network.API_ROOT_DOMAIN, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: BaseConfig.timeoutMS, // request timeout
  headers: {
    'Content-Type': 'application/json',
  }
  
});

// request interceptor
service.interceptors.request.use(
  async config => {
    console.log('request -->>> ', config);
    const token = await getToken();
    console.log('token -> ', token);
    // do something before request is sent
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // eslint-disable-next-line require-atomic-updates
      config.headers['X-Authorization'] = token;
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    console.log('response --->>> ', res);

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 1 && res.code !== 20000) {
      // TODO:
      // alert(res.msg || res.message || 'Error');

      // Message({
      //   message: res.msg || res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        
      }
      // Handle exception in middleware
      // return Promise.reject(new Error(res.msg || res.message || 'Error'));
    }
    return res;
  },
  (error: any) => {
    const err = error;
    console.log(`err${err}`); // for debug
    if (err.message === 'Network Error') {
      err.message = 'Network error, please check and try again';
    } else {
      err.message = 'Server error, please try again later';
      // alert(err.message);
    }
    return Promise.reject(err);
  }
);

export default service;
