import { create } from "zustand";
import { Shipping } from "../interface/interfaceShipping";

type State = {
  shippings: Shipping[];
};

type Actions = {
  addShipping: (value: Shipping) => void;
};

export const useShippingStore = create<State & Actions>((set) => ({
  shippings: [],

  addShipping: (value: Shipping) =>
    set((state) => ({ ...state, shippings: [...state.shippings, value] })),
}));
