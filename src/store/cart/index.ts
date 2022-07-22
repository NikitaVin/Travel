import { RootState } from './../index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TicketsProps {
   id: string, title?: string, price?: number, imageUrl?: string, day?: number, type?: string, count?: number
}

interface CartSliceState {
   totalPrice: number;
  tickets: TicketsProps[]
}

const initialState: CartSliceState = {
  totalPrice: 0,
  tickets: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addTicket: (state, action) => {
    //   state.tickets.push(action.payload);
    //   state.totalPrice = state.tickets.reduce((sum, obj) => {
    //     return sum + obj.price;
    //   }, 0);
    // },
    addTicket: (state, action: PayloadAction<TicketsProps>) => {
      const findTicket = state.tickets.find(
        (obj) => obj.id === action.payload.id
      );
      if (findTicket?.count) {
        findTicket.count++;
      } else {
        state.tickets.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.tickets.reduce((sum, obj) => {
        return sum + (obj.price || 0) * (obj.count || 0);
      }, 0);
    },
    minusPriceTickets: (state, action: PayloadAction<string>) => {
      const findTicket = state.tickets.find((obj) => obj.id === action.payload);

      if ( findTicket?.count) {
        findTicket.count--;
      }
    },
    minusTicket: (state, action:PayloadAction<number>) => {
      state.totalPrice = state.totalPrice - action.payload;
    },
    removeTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter((obj) => obj.id !== action.payload);
    },
    clearCart: (state) => {
      state.tickets = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelectorFind =
  (id: string) =>
  ({ cart }: RootState) =>
    cart.tickets.find(({ id: townId }) => id === townId);
export const selectorCart = (state: RootState) => state.cart;
export const {
  addTicket,
  removeTicket,
  clearCart,
  minusTicket,
  minusPriceTickets,
} = cartSlice.actions;
export default cartSlice.reducer;
