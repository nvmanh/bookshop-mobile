import BaseConfig from './index';

let API_ROOT_DOMAIN = 'http://www.xxx.com'; 

// if (process.env.NODE_ENV === 'development') {
if (BaseConfig.debug) {
  API_ROOT_DOMAIN = 'http://192.99.80.226:8080/api/v1';
  // API_ROOT_DOMAIN = 'http://192.168.2.10:8080';
}

const AUTH_URL = `${API_ROOT_DOMAIN}/v1/system`;

class Network {
  public static readonly API_ROOT_DOMAIN = API_ROOT_DOMAIN;
  public static readonly API_AUTH_URL = AUTH_URL;
}

export default Network;
