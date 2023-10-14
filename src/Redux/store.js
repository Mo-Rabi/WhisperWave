import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";

let store = configureStore({
  reducer: {
    counterRed: counterReducer, //counterRed is the key and can be anything
  },
});
export default store;
