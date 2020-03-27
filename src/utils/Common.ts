const sleep = (time: number) => new Promise(resolve => setTimeout(() => resolve(), time));

let isCalled = false;
let timer: any;
const callOnceInInterval = (functionTobeCalled: () => void, interval = 600) => {
  if (!isCalled) {
    isCalled = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      isCalled = false;
    }, interval);
    return functionTobeCalled();
  }
  return null;
};

export {
  sleep,
  callOnceInInterval
};
