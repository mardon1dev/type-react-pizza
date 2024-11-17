import { configureStore } from "@reduxjs/toolkit";
import pizzaStore from "./pizzaStore";

export const store = configureStore({
  reducer: {
    pizzaStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
