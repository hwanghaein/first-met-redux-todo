import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    // redux toolkit의 기본 middleware를 가져오는 함수 호출
    const defaultMiddleware = getDefaultMiddleware();
    return [...defaultMiddleware, sagaMiddleware];
  },
});
sagaMiddleware.run(rootSaga);

export default store;
