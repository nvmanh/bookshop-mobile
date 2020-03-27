// disable warning dialog
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



// config debug mode to handle all errors
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
