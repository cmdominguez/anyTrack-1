"use client";
import { useEffect, useState } from "react";
import { useContextVehicles } from "../context/ContextVehicles";
import { useVehiclesStore } from "@/store/vehiclesStore";
import useAnimationStore from "@/store/formAnimation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import TableVehicles from "../components/TableVehicles";
import Loading from "../components/Loading";
import ErrorModal from "../components/ErrorModal";
import { SearchIcon } from "../components/ui/SearchIcon";
import { PlusIcon } from "../components/ui/PlusIcon";
import DropdownAvatar from "../components/DropdownAvatar";
import DrawerFormVehicles from "../components/vehicles/DrawerFormVehicles";
import EmptyData from "../components/EmptyData";
import MenuOpen from "../components/MenuOpen";
import DarkMode from "../components/DarkMode";

export default function Vehicles() {
  const [searchValue, setSearchValue] = useState("");
  const { openFormVehicle } = useContextVehicles();
  const { getVehicles, isLoading, error, toggleError, vehicles } =
    useVehiclesStore();
  const { toggleAnimationForm } = useAnimationStore();

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
    <section className="w-full overflow-hidden px-5">
      <DrawerFormVehicles />
      {error && (
        <ErrorModal toggleError={toggleError} title="La patente ya existe" />
      )}
      <div className="flex pt-14 md:pt-0 lg:pt-0 md:flex-row flex-col-reverse gap-y-4 justify-between relative mt-4 mb-5">
        <div className="flex-1">
          <MenuOpen />
          <Input
            isClearable
            className="md:w-3/5 lg:w-2/5 w-full sm:max-w-[100%] md:ml-7 lg:ml-0"
            placeholder="Buscar un vehículo por patente..."
            startContent={<SearchIcon />}
            type="text"
            value={searchValue}
            onChange={handleSearchVehicle}
            onClear={() => setSearchValue("")}
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <DarkMode />
          <Button
            onPress={() => {
              openFormVehicle(), toggleAnimationForm();
            }}
            className="bg-third text-primary flex-1"
            endContent={<PlusIcon />}
          >
            Agregar un Vehículo
          </Button>
          <DropdownAvatar />
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <span className="text-sm text-textPrimary dark:text-darktextPrimary font-semibold">
            Total de Vehículos ({vehicles.length})
          </span>
          {vehicles.length > 0 ? (
            <TableVehicles />
          ) : (
            <EmptyData title="¡No hay ningun vehículo!" />
          )}
        </>
      )}
    </section>
  );
}
