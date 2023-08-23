import React from "react";
import { ShippingResponse } from "../interface/interfaceShipping";
import { BsCarFrontFill, BsPerson } from "react-icons/bs";
import { FaTruck, FaMotorcycle } from "react-icons/fa";
import TagsInTravel from "./TagsInTravel";
import useAnimationStore from "@/store/formAnimation";

type Prop = {
  item: ShippingResponse;
  onPress: (item: ShippingResponse) => void;
};

export default function CardDashboard({ onPress, item }: Prop) {
  const { toggleAnimationForm } = useAnimationStore();

  return (
    <div
      className="bg-secondary hover:bg-navBar 
      dark:bg-darksecondary dark:hover:bg-[#213358] 
      rounded-lg p-3 z-10 cursor-pointer border-b-success border-b-4 shadow-md"
      onClick={() => {
        onPress(item), toggleAnimationForm();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center px-2 gap-3 py-[2px] justify-between">
          <div className="flex items-center gap-2">
            {item.vehicle.type.name === "Automovil" ? (
              <BsCarFrontFill size={13} className="text-slate-400" />
            ) : item.vehicle.type.name === "Camion" ? (
              <FaTruck size={13} className="text-slate-400" />
            ) : (
              <FaMotorcycle size={13} className="text-slate-400" />
            )}
            <span className="font-bold text-[13px] text-slate-400 truncate">
              {item.vehicle.type.name}
            </span>
          </div>
          <span className="font-bold text-[13px] text-slate-400 truncate">
            {item.vehicle.patent}
          </span>
        </div>
        <div className="flex flex-row gap-2 px-2">
          <div>
            <BsPerson className="text-slate-400" size={15} />
          </div>
          <span className="text-slate-400 text-[13px] font-bold truncate capitalize">
            {item.driver.name}
          </span>
        </div>
        <div>
          <p className="p-2 font-bold text-lg tracking-[0.5px] text-textPrimary dark:text-darktextPrimary truncate capitalize">
            Buenos Aires - Moreno
          </p>
        </div>
        <div className="px-2">
          <TagsInTravel title="En viaje" />
        </div>
      </div>
    </div>
  );
}
