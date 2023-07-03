import React from "react";
import { ShippingResponse } from "../interface/interfaceShipping";
import { BsCarFrontFill } from "react-icons/bs";
import { FaTruck, FaMotorcycle } from "react-icons/fa";
import TagsInTravel from "./TagsInTravel";

type Prop = {
  item: ShippingResponse;
  onPress: (item: ShippingResponse) => void;
};

export default function CardDashboard({ onPress, item }: Prop) {
  return (
    <div
      className="bg-secondary rounded-lg p-3 cursor-pointer border-b-green-600 border-b-4 shadow-lg"
      onClick={() => onPress(item)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center px-2 py-[2px] justify-between">
          <div className="flex items-center gap-2">
            {item.vehicle.type.name === "Automovil" ? (
              <BsCarFrontFill size={13} className="text-slate-800/60" />
            ) : item.vehicle.type.name === "Camion" ? (
              <FaTruck size={13} className="text-slate-800/60" />
            ) : (
              <FaMotorcycle size={13} className="text-slate-800/60" />
            )}
            <span className="font-bold text-[13px] text-slate-800/60">
              {item.vehicle.type.name}
            </span>
          </div>
          <span className="font-bold text-[13px] text-slate-800/60">
            {item.vehicle.patent}
          </span>
        </div>
        <div>
          <p className="p-2 font-bold tracking-[0.5px] text-slate-800 truncate capitalize">
            Buenos Aires - Moreno
          </p>
        </div>
        <TagsInTravel title="En viaje" />
      </div>
    </div>
  );
}
