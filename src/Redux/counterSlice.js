import { createSlice } from "@reduxjs/toolkit";

let initialState = { counter: 0 };
let counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase: (state) => {
      state.counter += 1;
    },
    decrease: (state) => {
      state.counter -= 1;
    },
    increaseByAmount: (state, action) => {
      console.log(state);
      state.counter += action.payload;
    },
  },
});

export let counterReducer = counterSlice.reducer;
console.log("Counter Reducer from slice: " + counterReducer);
export let { increase, decrease, increaseByAmount } = counterSlice.actions;
