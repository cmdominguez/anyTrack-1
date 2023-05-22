"use client";
import React, { useState } from "react";
import CardDashboard from "./components/CardDashboard";
import Drawer from "./components/Drawer";
import { Shipping } from "./interface/interfaceShipping";
import { IoAddCircleSharp } from "react-icons/all";
import ModalForm from "./components/ModalForm";
import { useShippingStore } from "./store/shippingStore";
import InputCustom from "./components/InputCustom";

export default function Home() {
  const { shippings } = useShippingStore();
  const [showModal, setShowModal] = useState(false);
  const [shippingSelected, setShippingSelected] = useState<Shipping | null>(
    null
  );

  const onPress = (item: Shipping) => {
    setShippingSelected(item);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="flex-1 mx-5 px-2">
      <InputCustom />
      <div className="border-t-[1px] border-gray-600/10 mb-3" />
      <h1 className="mb-5 mt-3 font-bold tracking-[0.5px] text-lg text-slate-800">
        Shipping <span className="text-gray-500">({shippings.length})</span>
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 pb-2">
        {showModal ? (
          <ModalForm closeModal={closeModal} />
        ) : (
          <div
            onClick={() => setShowModal(true)}
            className="bg-slate-50 rounded-lg border-b-4 border-blue-500 flex items-center justify-center cursor-pointer shadow-lg h-36"
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
