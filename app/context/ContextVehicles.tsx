"use client";
import { useVehiclesStore } from "@/store/vehiclesStore";
import { createContext, useContext, useState } from "react";
import { VehicleInterface } from "../interface/interfaceVehicles";

type Prop = {
  children: React.ReactNode;
};

interface AppContextVehicle {
  closeFormVehicle: () => void;
  openFormVehicle: () => void;
  showFormVehicles: boolean;
  idVehicle: (string: string) => void;
  vehicleId: string | null;
  objectToEdit: VehicleInterface | null;
}

const GlobalContextVehicles = createContext({} as AppContextVehicle);

export const ContextVehicles = ({ children }: Prop) => {
  const { vehicles } = useVehiclesStore();
  const [showFormVehicles, setShowFormVehicles] = useState(false);
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [objectToEdit, setObjectToEdit] = useState<VehicleInterface | null>(
    null
  );

  const closeFormVehicle = () => {
    setShowFormVehicles(false);
    setObjectToEdit(null);
    setVehicleId(null);
  };

  const openFormVehicle = () => {
    setShowFormVehicles(true);
  };

  //recibo el id y busco el objeto en vehicles
  const idVehicle = (id: string) => {
    const vehicleToEdit = vehicles.find((item) => item.id === id);
    setVehicleId(id);
    setObjectToEdit(vehicleToEdit!);
    openFormVehicle();
  };

  return (
    <GlobalContextVehicles.Provider
      value={{
        closeFormVehicle,
        openFormVehicle,
        showFormVehicles,
        idVehicle,
        vehicleId,
        objectToEdit,
      }}
    >
      {children}
    </GlobalContextVehicles.Provider>
  );
};

export const useContextVehicles = () => {
  const context = useContext(GlobalContextVehicles);

  return context;
};
