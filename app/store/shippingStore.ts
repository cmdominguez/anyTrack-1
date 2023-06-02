import { create } from "zustand";
import { Shipping } from "../interface/interfaceShipping";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

type State = {
  shippings: Shipping[];
};

type Actions = {
  addShipping: (value: Shipping) => void;
  getShippings: () => void;
};

export const useShippingStore = create(
  immer<State & Actions>((set) => ({
    shippings: [],

    getShippings: async () => {
      const { data, status } = await axios.get("/api/shippings");

      if (status === 200) {
        set((state) => {
          state.shippings = data;
        });
      }
    },

    addShipping: async (value: Shipping) => {
      await axios.post("/api/shippings", value);
      set((state) => {
        state.shippings.push(value);
      });
    },
  }))
);
