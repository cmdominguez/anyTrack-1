"use client";
import React, { useEffect, useState } from "react";
import CardDashboard from "./components/CardDashboard";
import Drawer from "./components/Drawer";
import { Shipping } from "./interface/interfaceShipping";
import { IoAddCircleSharp } from "react-icons/io5";
import ModalForm from "./components/ModalForm";
import { useShippingStore } from "../store/shippingStore";
import SearchCustom from "./components/SearchCustom";

export default function Home() {
  const { shippings, getShippings } = useShippingStore();
  const [showModal, setShowModal] = useState(false);
  const [shippingSelected, setShippingSelected] = useState<Shipping | null>(
    null
  );

  useEffect(() => {
    getShippings();
  }, [getShippings]);

  const onPress = (item: Shipping) => {
    setShippingSelected(item);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="flex-1 mx-5 px-2">
      <SearchCustom />
      <div className="border-t-[1px] border-gray-600/10 mb-3" />
      <h1 className="my-5 font-bold lg:text-2xl text-lg tracking-[0.4px] text-slate-800">
        Tracking dashboard
      </h1>
      <h2 className="mb-5 mt-3 font-bold tracking-[0.5px] lg:text-[20px] text-sm text-slate-800">
        Shipping{" "}
        <span className="text-gray-500 text-md">({shippings.length})</span>
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 pb-2">
        {showModal ? (
          <ModalForm closeModal={closeModal} />
        ) : (
          <div
            onClick={() => setShowModal(true)}
            className="bg-secondary rounded-lg border-b-4 border-blue-500 flex items-center justify-center cursor-pointer shadow-lg h-36"
          >
            <IoAddCircleSharp size={80} className="text-blue-500" />
          </div>
        )}

        {shippings.map((item, index) => {
          return <CardDashboard key={index} item={item} onPress={onPress} />;
        })}
      </div>
      <Drawer
        showDrawer={!!shippingSelected}
        toggleDrawer={() => setShippingSelected(null)}
        item={shippingSelected!}
      />
    </section>
  );
}
