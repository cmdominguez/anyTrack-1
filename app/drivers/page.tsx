"use client";
import React, { useEffect, useState } from "react";
import { useContextDrivers } from "../context/ContextDrivers";
import { useDriversStore } from "@/store/driversStore";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import TableDriver from "../components/TableDriver";
import Loading from "../components/Loading";
import ErrorModal from "../components/ErrorModal";
import { SearchIcon } from "../components/ui/SearchIcon";
import { PlusIcon } from "../components/ui/PlusIcon";
import DropdownAvatar from "../components/DropdownAvatar";
import DrawerFormDrivers from "../components/drivers/DrawerFormDrivers";
import EmptyData from "../components/EmptyData";
import DarkMode from "../components/DarkMode";
import MenuOpen from "../components/MenuOpen";

export default function Drivers() {
  const [searchValue, setSearchValue] = useState("");
  const { openFormDrivers } = useContextDrivers();
  const { getDrivers, isLoading, error, toggleError, drivers } =
    useDriversStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      getDrivers(searchValue);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  const handleSearchDriver = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="w-full overflow-hidden px-5">
      <DrawerFormDrivers />
      {error && (
        <ErrorModal
          toggleError={toggleError}
          title=" El email o DNI ingresados ya existen."
        />
      )}
      <div className="flex pt-14 md:pt-0 lg:pt-0 md:flex-row flex-col-reverse gap-y-4 justify-between relative mt-4 mb-5">
        <div className="flex-1">
          <MenuOpen />
          <Input
            isClearable
            className="md:w-3/5 lg:w-2/5 w-full sm:max-w-[100%] md:ml-7 lg:ml-0"
            placeholder="Buscar un chofer..."
            startContent={<SearchIcon />}
            type="text"
            value={searchValue}
            onChange={handleSearchDriver}
            onClear={() => setSearchValue("")}
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <DarkMode />
          <Button
            onPress={() => openFormDrivers()}
            className="bg-third text-primary flex-1"
            endContent={<PlusIcon />}
          >
            Agregar un Chofer
          </Button>
          <DropdownAvatar />
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <span className="text-sm text-textPrimary dark:text-darktextPrimary font-semibold">
            Total de Choferes ({drivers.length})
          </span>
          {drivers.length > 0 ? (
            <TableDriver />
          ) : (
            <EmptyData title="¡No hay ningun chofer!" />
          )}
        </>
      )}
    </section>
  );
}
