import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => { // redux toolkit의 기본 middleware를 가져오는 함수 호출 
    const defaultMiddleware = getDefaultMiddleware();
    return [...defaultMiddleware];
  },
});

export default store;
