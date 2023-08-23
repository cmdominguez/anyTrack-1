"use client";
import React, { useEffect, useState } from "react";
import { ShippingResponse } from "./interface/interfaceShipping";
import { useShippingStore } from "../store/shippingStore";
import useAnimationStore from "@/store/formAnimation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import CardDashboard from "./components/CardDashboard";
import Drawer from "./components/Drawer";
import Loading from "./components/Loading";
import ErrorModal from "./components/ErrorModal";
import { PlusIcon } from "./components/ui/PlusIcon";
import { SearchIcon } from "./components/ui/SearchIcon";
import DrawerFormShipping from "./components/shipping/DrawerFormShipping";
import DropdownAvatar from "./components/DropdownAvatar";
import EmptyData from "./components/EmptyData";
import MenuOpen from "./components/MenuOpen";
import DarkMode from "./components/DarkMode";

export default function Home() {
  const {
    shippings,
    getShippings,
    isLoading,
    shippingResponse,
    error,
    toggleError,
  } = useShippingStore();
  const { toggleAnimationForm } = useAnimationStore();
  const [showDrawerForm, setShowDrawerForm] = useState(false);
  const [shippingSelected, setShippingSelected] =
    useState<ShippingResponse | null>(null);

  useEffect(() => {
    getShippings();
  }, [getShippings, shippings]);

  const onPress = (item: ShippingResponse) => {
    setShippingSelected(item);
  };

  const closeDrawerForm = () => {
    setShowDrawerForm(false);
  };

  return (
    <section className="flex-1 mx-5">
      {error && (
        <ErrorModal toggleError={toggleError} title="Error al crear el envío" />
      )}
      {showDrawerForm && (
        <DrawerFormShipping closeDrawerForm={closeDrawerForm} />
      )}
      <div className="flex pt-14 md:pt-0 lg:pt-0 md:flex-row flex-col-reverse gap-y-4 justify-between relative mt-4 mb-5">
        <div className="flex-1">
          <MenuOpen />
          <Input
            isClearable
            className="md:w-3/5 lg:w-2/5 w-full sm:max-w-[100%] md:ml-7 lg:ml-0"
            placeholder="Buscar un envío..."
            startContent={<SearchIcon />}
            // value={filterValue}
            // onClear={() => onClear()}
            // onValueChange={onSearchChange}
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <DarkMode />
          <Button
            onPress={() => {
              setShowDrawerForm(true), toggleAnimationForm();
            }}
            className="bg-third text-primary flex-1"
            endContent={<PlusIcon />}
          >
            Crear un Envío
          </Button>
          <DropdownAvatar />
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <span className="text-sm text-textPrimary dark:text-darktextPrimary font-semibold">
            Total de envíos ({shippingResponse.length})
          </span>
          {shippingResponse.length > 0 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 pb-2 mt-5">
              {shippingResponse.map((item, index) => {
                return (
                  <CardDashboard key={index} item={item} onPress={onPress} />
                );
              })}
            </div>
          ) : (
            <EmptyData title="¡No hay ningun envío creado!" />
          )}
        </>
      )}

      <Drawer
        showDrawer={!!shippingSelected}
        toggleDrawer={() => setShippingSelected(null)}
        item={shippingSelected!}
      />
    </section>
  );
}
