import React from "react";
import { Shipping } from "../interface/interfaceShipping";
import { BsCarFrontFill } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import TagsInTravel from "./TagsInTravel";

type Prop = {
  item: Shipping;
  onPress: (item: Shipping) => void;
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
            <BsCarFrontFill size={13} className="text-slate-800/60" />
            <span className="font-bold text-[13px] text-slate-800/60">
              {item.patente}
            </span>
          </div>
          <AiOutlineCalendar className="text-slate-800/60" size={13} />
        </div>
        <div>
          <p className="p-2 font-bold tracking-[0.5px] text-slate-800 truncate capitalize">
            Buenos Aires - {item.destino}
          </p>
        </div>
        <TagsInTravel title="En viaje" />
      </div>
    </div>
  );
}
