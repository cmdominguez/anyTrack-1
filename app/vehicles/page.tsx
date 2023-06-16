"use client";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoAddCircleSharp } from "react-icons/io5";
import TableVehicles from "../components/TableVehicles";
import { useContextVehicles } from "../context/ContextVehicles";
import ModalFormVehicles from "../components/ModalFormVehicles";
import { useVehiclesStore } from "@/store/vehiclesStore";
import Loading from "../components/Loading";
import ErrorModal from "../components/ErrorModal";

export default function Vehicles() {
  const [searchValue, setSearchValue] = useState("");
  const { openModal } = useContextVehicles();
  const { getVehicles, isLoading, error, toggleError } = useVehiclesStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      getVehicles(searchValue);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  const handleSearchVehicle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className="w-full overflow-hidden">
      <ModalFormVehicles />
      {error && (
        <ErrorModal toggleError={toggleError} title="La patente ya existe" />
      )}
      <div className="mt-3 mb-6 relative px-8 lg:px-2">
        <input
          placeholder="Buscar por patente"
          className="text-gray-600 bg-secondary focus:outline-none focus:border focus:border-blue-500 font-normal lg:w-[35%] w-full h-10 flex items-center pl-[40px] text-sm border-gray-300 rounded border"
          type="text"
          value={searchValue}
          onChange={handleSearchVehicle}
        />
        <CiSearch
          className="absolute text-gray-600 top-[11px] lg:left-5 left-11"
          size={18}
        />
      </div>
      <div className="mx-8 lg:mx-2">
        <div className="border-t-[1px] border-gray-600/10 mb-3" />
      </div>
      <div className="px-8 lg:px-2 pt-5">
        <div
          onClick={() => openModal()}
          className="bg-secondary rounded-lg border-b-4 border-blue-500 flex items-center justify-center cursor-pointer shadow-lg h-36 lg:w-[20%] md:w-[35%] w-full mb-5"
        >
          <IoAddCircleSharp size={80} className="text-blue-500" />
        </div>
        <p className="font-bold lg:text-2xl text-lg tracking-[0.4px] text-slate-800">
          Lista de Vehículos
        </p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pt-6 pb-20 px-8 lg:px-2 rounded-lg">
          <div className="lg:w-[60%] w-full overflow-x-scroll md:overflow-x-hidden rounded-lg shadow-lg">
            <TableVehicles />
          </div>
        </div>
      )}
    </div>
  );
}
