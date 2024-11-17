import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../pages/Home";

type pizzaType = ProductType[];

const pizzaList = (): pizzaType => {
  return [];
};

const initialState: pizzaType = pizzaList();

const pizzaFunction = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    addPizza(state, action: PayloadAction<ProductType>) {
      const existingPizza = state.find(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.options) ===
            JSON.stringify(action.payload.options)
      );

      if (existingPizza) {
        existingPizza.count += 1;
      } else {
        const newPizza = {
          ...action.payload,
          count: 1,
          orderId: state.length + 1,
        };
        state.push(newPizza);
      }
    },
    removePizzaCount(state, action: PayloadAction<ProductType>) {
      const existingPizza = state.find(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.options) ===
            JSON.stringify(action.payload.options)
      );
      if (existingPizza) {
        if (existingPizza.count > 1) {
          existingPizza.count -= 1;
        } else {
          return state.filter(
            (item) =>
              !(
                item.id === action.payload.id &&
                JSON.stringify(item.options) ===
                  JSON.stringify(action.payload.options)
              )
          );
        }
      }
    },
    removePizza(state, action: PayloadAction<number>) {
      return state.filter((item) => item.orderId !== action.payload);
    },
    clearBusket: () => initialState,
  },
});

export const { addPizza, removePizza, clearBusket, removePizzaCount } =
  pizzaFunction.actions;

export default pizzaFunction.reducer;
