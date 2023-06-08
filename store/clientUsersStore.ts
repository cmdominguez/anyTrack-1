import { Client } from "@/app/interface/interfaceClients";
import axios from "axios";
import { create } from "zustand";

type State = {
  clients: Client[];
  isLoading: boolean;
};

type Actions = {
  getClients: () => void;
  addClient: (values: Client) => void;
  deleteClient: (id: string) => void;
  editClient: (id: string, values: Client) => void;
};

export const useClientUsersStore = create<State & Actions>((set) => ({
  clients: [],
  isLoading: false,

  getClients: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axios.get("/api/clientusers");
      set({ clients: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addClient: async (values: Client) => {
    try {
      set({ isLoading: true });
      const { data } = await axios.post("/api/clientusers", values);
      set((state) => ({ clients: [...state.clients, data] }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteClient: async (id: string) => {
    try {
      set({ isLoading: true });
      await axios.delete(`/api/clientusers/${id}`);
      set((state) => ({
        clients: state.clients.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  editClient: async (id: string, values: Client) => {
    try {
      set({ isLoading: true });
      const { data } = await axios.put(`/api/clientusers/${id}`, values);
      set((state) => ({
        clients: state.clients.map((item) => (item.id === id ? data : item)),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
