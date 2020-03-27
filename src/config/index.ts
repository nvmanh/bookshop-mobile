/* eslint-disable */
const BaseConfig = {
  // PROD PROFILE
  /*
    debug: false,
    sagaLogger: false,
  // */

  // DEBUG PROFILE
  //*
  debug: true,
  sagaLogger: true,
  // */

  appVersion: '0.0.1',

  timeoutMS: 1 * 60 * 1000,
  serverMessage: 'Request server exception!',
  timeoutMessage: 'Request timed out, please check your network!',

  HttpCode: {
    unauthorized: 40100,
  },
};

//use console.log to log information
(() => {
  // console._log = console.log;
  // if (!__DEV__) { 
  // 	console.info = () => null;
  // }

  // if (!BaseConfig.debug) {
  //   global.console = {
  //     info: () => {},
  //     log: () => {},
  //     warn: () => {},
  //     debug: () => {},
  //     error: () => {},
  //   };
  // }
})();

export default Object.freeze(BaseConfig);
