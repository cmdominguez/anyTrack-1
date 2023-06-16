import { Driver, ValueInput } from "@/app/interface/interfaceDrivers";
import axios from "axios";
import { create } from "zustand";

type State = {
  drivers: Driver[];
  isLoading: boolean;
  error: boolean;
};

type Action = {
  getDrivers: (value: string) => void;
  addDriver: (values: ValueInput) => void;
  deleteDriver: (id: string) => void;
  editDriver: (id: string, values: ValueInput) => void;
  toggleError: () => void;
};

export const useDriversStore = create<State & Action>((set) => ({
  drivers: [],
  isLoading: false,
  error: false,

  getDrivers: async (value: string) => {
    try {
      set({ isLoading: true });
      const { data } = await axios.get(`/api/drivers?search=${value}`);
      set({ drivers: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addDriver: async (values: ValueInput) => {
    try {
      set({ isLoading: true });
      set({ error: false });

      const { data } = await axios.post("/api/drivers", values);
      set((state) => ({ drivers: [...state.drivers, data] }));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteDriver: async (id: string) => {
    try {
      set({ isLoading: true });
      await axios.delete(`/api/drivers/${id}`);
      set((state) => ({
        drivers: state.drivers.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  editDriver: async (id: string, values: ValueInput) => {
    try {
      set({ isLoading: true });
      set({ error: false });

      const { data } = await axios.put(`/api/drivers/${id}`, values);
      set((state) => ({
        drivers: state.drivers.map((item) => (item.id === id ? data : item)),
      }));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleError: () => set((state) => ({ error: !state.error })),
}));
