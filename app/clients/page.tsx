"use client";
import React, { useEffect, useState } from "react";
import { useContextClients } from "../context/ContextClients";
import { useClientsStore } from "@/store/clientsStore";
import useAnimationStore from "@/store/formAnimation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Loading from "../components/Loading";
import TableClients from "../components/TableClients";
import DropdownAvatar from "../components/DropdownAvatar";
import { SearchIcon } from "../components/ui/SearchIcon";
import { PlusIcon } from "../components/ui/PlusIcon";
import DrawerFormClient from "../components/clients/DrawerFormClient";
import EmptyData from "../components/EmptyData";
import MenuOpen from "../components/MenuOpen";
import DarkMode from "../components/DarkMode";

export default function Clients() {
  const [searchValue, setSearchValue] = useState("");
  const { openFormClient } = useContextClients();
  const { isLoading, getClients, clients } = useClientsStore();
  const { toggleAnimationForm } = useAnimationStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      getClients(searchValue);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  const handleSearchClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="w-full overflow-hidden px-5">
      <DrawerFormClient />
      <div className="flex pt-14 md:pt-0 lg:pt-0 md:flex-row flex-col-reverse gap-y-4 justify-between relative mt-4 mb-5">
        <div className="flex-1">
          <MenuOpen />
          <Input
            isClearable
            className="md:w-3/5 lg:w-2/5 w-full sm:max-w-[100%] md:ml-7 lg:ml-0"
            placeholder="Buscar un cliente..."
            startContent={<SearchIcon />}
            type="text"
            value={searchValue}
            onChange={handleSearchClient}
            onClear={() => setSearchValue("")}
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <DarkMode />
          <Button
            onPress={() => {
              openFormClient(), toggleAnimationForm();
            }}
            className="bg-third text-primary flex-1"
            endContent={<PlusIcon />}
          >
            Agregar un Cliente
          </Button>
          <DropdownAvatar />
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <span className="text-sm text-textPrimary dark:text-darktextPrimary font-semibold">
            Total de Clientes ({clients.length})
          </span>
          {clients.length > 0 ? (
            <TableClients />
          ) : (
            <EmptyData title="¡No hay ningun cliente!" />
          )}
        </>
      )}
    </section>
  );
}
