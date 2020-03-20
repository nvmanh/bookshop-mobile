/**
 * @author Leo
 * @email xinlichao2016@gmail.com
 * @create date 2019-09-03 10:28:23
 * @modify date 2019-09-03 10:28:23
 * @desc App 入口
 */

// 禁用黄屏
console.disableYellowBox = true;





import React from 'react';
import {ErrorUtils} from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as AntdProvider } from '@ant-design/react-native';
import store from './store';
import Router from './Router';

const myErrorHandler = (e : any, isFatal: any) => {
  // e: the error throwed
  // isFatal: if the error is fatal and will kill the app
  // define your code here...
  // after all, if you want to forward to default error handler
  // just call the variable we stored in the previous step
  // defaultErrorHandler(e, isFatal)
  console.log(e);
}



// 生产环境拦截全局异常，避免出现错误闪退。
if (!__DEV__) {
  // require('ErrorUtils').setGlobalHandler((err: any) => {
  //   console.log(err);
  // });
  ErrorUtils.setGlobalHandler(myErrorHandler);
}


const App = () => (
  <AntdProvider>
    <StoreProvider store={store}>
      <Router />
    </StoreProvider>
  </AntdProvider>
);

export default App;
