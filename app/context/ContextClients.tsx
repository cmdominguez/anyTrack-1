"use client";
import { createContext, useContext, useState } from "react";
import { Client } from "../interface/interfaceClients";
import { useClientsStore } from "@/store/clientsStore";

interface AppContext {
  idClient: (id: string) => void;
  clientId: string | null;
  objectToEdit: Client | null;
  closeFormClient: () => void;
  openFormClient: () => void;
  showFormClient: boolean;
}

const GlobalContextClients = createContext({} as AppContext);

export const ContextClients = ({ children }: { children: React.ReactNode }) => {
  const [showFormClient, setShowFormClient] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const [objectToEdit, setObjectToEdit] = useState<Client | null>(null);
  const { clients } = useClientsStore();

  const closeFormClient = () => {
    setShowFormClient(false);
    setClientId(null);
    setObjectToEdit(null);
  };

  const openFormClient = () => {
    setShowFormClient(true);
  };

  //recibo el id y busco el objeto en clients
  const idClient = (id: string) => {
    const clientToEdit = clients.find((item) => item.id === id);
    setClientId(id);
    setObjectToEdit(clientToEdit!);
    openFormClient();
  };

  return (
    <GlobalContextClients.Provider
      value={{
        idClient,
        clientId,
        objectToEdit,
        closeFormClient,
        openFormClient,
        showFormClient,
      }}
    >
      {children}
    </GlobalContextClients.Provider>
  );
};

export const useContextClients = () => {
  const context = useContext(GlobalContextClients);

  return context;
};
