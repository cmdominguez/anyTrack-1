"use client";
import { useClientUsersStore } from "@/store/clientUsersStore";
import { createContext, useContext, useState } from "react";
import { Client } from "../interface/interfaceClients";

interface AppContext {
  idClient: (id: string) => void;
  clientId: string | null;
  objectToEdit: Client | null;
  closeModal: () => void;
  openModal: () => void;
  showModalClient: boolean;
}

const GlobalContext = createContext({} as AppContext);

export const ContextGlobal = ({ children }: { children: React.ReactNode }) => {
  const [showModalClient, setShowModalClient] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const [objectToEdit, setObjectToEdit] = useState<Client | null>(null);
  const { clients } = useClientUsersStore();

  const closeModal = () => {
    setShowModalClient(false);
    setClientId(null);
    setObjectToEdit(null);
  };

  const openModal = () => {
    setShowModalClient(true);
  };

  //recibo el id y busco el objeto en clients
  const idClient = (id: string) => {
    const clientToEdit = clients.find((item) => item.id === id);
    setClientId(id);
    setObjectToEdit(clientToEdit!);
    openModal();
  };

  return (
    <GlobalContext.Provider
      value={{
        idClient,
        clientId,
        objectToEdit,
        closeModal,
        openModal,
        showModalClient,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useContextGlobal = () => {
  const context = useContext(GlobalContext);

  return context;
};
