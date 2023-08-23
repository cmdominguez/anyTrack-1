"use client";
import { useDriversStore } from "@/store/driversStore";
import { createContext, useContext, useState } from "react";
import { Driver } from "../interface/interfaceDrivers";

type Prop = {
  children: React.ReactNode;
};

interface AppContextDriver {
  closeFormDrivers: () => void;
  openFormDrivers: () => void;
  showFormDrivers: boolean;
  idDriver: (id: string) => void;
  driverId: string | null;
  objectToEdit: Driver | null;
}

const GlobalContextDrivers = createContext({} as AppContextDriver);

export const ContextDrivers = ({ children }: Prop) => {
  const { drivers } = useDriversStore();
  const [showFormDrivers, setShowFormDrivers] = useState(false);
  const [driverId, setDriverId] = useState<string | null>(null);
  const [objectToEdit, setObjectToEdit] = useState<Driver | null>(null);

  const closeFormDrivers = () => {
    setShowFormDrivers(false);
    setObjectToEdit(null);
    setDriverId(null);
  };

  const openFormDrivers = () => {
    setShowFormDrivers(true);
  };

  //recibo el id y busco el objeto en drivers
  const idDriver = (id: string) => {
    const driverToEdit = drivers.find((item) => item.id === id);
    setDriverId(id);
    setObjectToEdit(driverToEdit!);
    openFormDrivers();
  };

  return (
    <GlobalContextDrivers.Provider
      value={{
        closeFormDrivers,
        openFormDrivers,
        showFormDrivers,
        idDriver,
        driverId,
        objectToEdit,
      }}
    >
      {children}
    </GlobalContextDrivers.Provider>
  );
};

export const useContextDrivers = () => {
  const context = useContext(GlobalContextDrivers);

  return context;
};
