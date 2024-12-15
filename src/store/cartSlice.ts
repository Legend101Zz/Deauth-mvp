import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct {
  id: string;
  name: string; 
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CartState {
  items: CartProduct[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const existingItem = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity, 
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<{id: string, size: string, color: string}>) => {
      state.items = state.items.filter(
        item => 
          item.id !== action.payload.id || 
          item.size !== action.payload.size ||
          item.color !== action.payload.color
      );

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;