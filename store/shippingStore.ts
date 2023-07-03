import { create } from "zustand";
import { Shipping, ShippingResponse } from "../app/interface/interfaceShipping";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

type State = {
  shippings: Shipping[];
  shippingResponse: ShippingResponse[];
  isLoading: boolean;
  error: boolean;
};

type Actions = {
  addShipping: (value: Shipping) => void;
  getShippings: () => void;
  toggleError: () => void;
};

export const useShippingStore = create(
  immer<State & Actions>((set) => ({
    shippings: [],
    shippingResponse: [],
    isLoading: false,
    error: false,

    getShippings: async () => {
      try {
        set({ isLoading: true });

        const { data, status } = await axios.get("/api/shippings");

        if (status === 200) {
          set((state) => {
            state.shippingResponse = data;
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },

    addShipping: async (value: Shipping) => {
      try {
        set({ isLoading: true });
        set({ error: false });

        await axios.post("/api/shippings", value);
        set((state) => {
          state.shippings.push(value);
        });
      } catch (error) {
        console.log(error);
        set({ error: true });
      } finally {
        set({ isLoading: false });
      }
    },

    toggleError: () => set((state) => ({ error: !state.error })),
  }))
);
