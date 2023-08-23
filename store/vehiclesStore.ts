import {
  ValueInput,
  VehicleInterface,
} from "@/app/interface/interfaceVehicles";
import axios from "axios";
import { create } from "zustand";

type State = {
  vehicles: VehicleInterface[];
  isLoading: boolean;
  error: boolean;
};

type Actions = {
  getVehicles: (value: string) => void;
  addVehicle: (values: ValueInput) => void;
  deleteVehicle: (id: string) => void;
  editVehicle: (id: string, values: ValueInput) => void;
  toggleError: () => void;
};

export const useVehiclesStore = create<State & Actions>((set) => ({
  vehicles: [],
  isLoading: true,
  error: false,

  getVehicles: async (value: string) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(`/api/vehicles?search=${value}`);
      set({ vehicles: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addVehicle: async (values: ValueInput) => {
    try {
      set({ isLoading: true });
      set({ error: false });

      const { data } = await axios.post("/api/vehicles", values);
      set((state) => ({ vehicles: [...state.vehicles, data] }));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteVehicle: async (id: string) => {
    try {
      set({ isLoading: true });
      await axios.delete(`/api/vehicles/${id}`);
      set((state) => ({
        vehicles: state.vehicles.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  editVehicle: async (id: string, values: ValueInput) => {
    try {
      set({ isLoading: true });
      set({ error: false });

      const { data } = await axios.put(`/api/vehicles/${id}`, values);
      set((state) => ({
        vehicles: state.vehicles.map((item) => (item.id === id ? data : item)),
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
