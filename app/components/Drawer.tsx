import React from "react";
import { Shipping } from "../interface/interfaceShipping";
import { BsCarFrontFill } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsTelephone, BsChatLeft } from "react-icons/bs";
import { TbPointFilled } from "react-icons/tb";
//componentes
import MapDrawer from "./MapDrawer";
import TagsInTravel from "./TagsInTravel";

type Prop = {
  showDrawer: boolean;
  toggleDrawer: () => void;
  item: Shipping;
};

export default function Drawer({ showDrawer, toggleDrawer, item }: Prop) {
  if (!showDrawer) return null;

  return (
    <div
      className={`bg-slate-50 fixed right-0 top-0 h-full w-96 transition-transform duration-1000 ease-in-out overflow-y-auto ${
        showDrawer ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end items-center p-4">
        <button
          className="text-blue-500 hover:text-blue-700 focus:outline-none text-xl"
          onClick={toggleDrawer}
        >
          X
        </button>
      </div>
      <div className="flex items-center px-4 justify-between mb-4">
        <div className="flex items-center gap-3">
          <BsCarFrontFill size={13} className="text-slate-800/60" />
          <span className="font-bold text-[13px] text-slate-800/60">
            {item.patente}
          </span>
        </div>
        <div className="bg-blue-500/40 w-6 h-6 flex items-center justify-center rounded-md">
          <AiOutlineCalendar className="text-blue-800" size={14} />
        </div>
      </div>
      <div className="pl-4 mb-4">
        <TagsInTravel title="En viaje" />
        <div className="mt-4">
          <p className="font-bold tracking-[0.4px] text-slate-800 capitalize">
            {item.vahiculo}
          </p>
        </div>
      </div>
      <div>
        <MapDrawer />
      </div>
      <div className="px-4 mt-4 flex justify-between py-1">
        <div className="flex gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            className="w-14 h-14 rounded-full"
          />
          <h2 className="font-bold tracking-[0.4px] text-slate-800 truncate capitalize">
            {item.nombrechofer}
          </h2>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-500/40 w-6 h-6 flex items-center justify-center rounded-md">
            <BsChatLeft className="text-blue-800" size={13} />
          </div>
          <div className="bg-blue-500/40 w-6 h-6 flex items-center justify-center rounded-md">
            <BsTelephone className="text-blue-800" size={13} />
          </div>
        </div>
      </div>
      <div className="flex items-center px-4 justify-between mt-6 py-1">
        <div className="flex items-center gap-2">
          <TbPointFilled className="text-orange-600" />
          <div>
            <span className="font-bold tracking-[0.4px] text-[14px] text-slate-800 truncate">
              Origen
            </span>
            <p className="tracking-[0.4px] text-gray-500 text-[12px] truncate">
              Palermo, Buenos Aires
            </p>
          </div>
        </div>
        <div>
          <span className="tracking-[0.4px] text-gray-500 text-[12px] truncate">
            11:40hs
          </span>
        </div>
      </div>
      <div className="flex items-center px-4 justify-between mt-2 py-1">
        <div className="flex items-center gap-2">
          <TbPointFilled className="text-orange-600" />
          <div>
            <span className="font-bold tracking-[0.4px] text-[14px] text-slate-800 truncate">
              Destino
            </span>
            <p className="tracking-[0.4px] text-gray-500 text-[12px] truncate">
              Moreno, Buenos Aires
            </p>
          </div>
        </div>
        <div>
          <span className="tracking-[0.4px] text-gray-500 text-[12px] truncate">
            14:40hs
          </span>
        </div>
      </div>
      <div className="px-4 flex items-end h-[150px]">
        <div className="flex-1 justify-between">
          <div className="flex flex-1 justify-between mb-4">
            <p className="tracking-[0.4px] text-gray-500 text-[12px]">
              Precio total del envio
            </p>
            <span className="tracking-[0.4px] text-gray-500 text-[12px]">
              $120.00
            </span>
          </div>
          <div className="flex flex-1 justify-between">
            <p className="font-bold tracking-[0.4px] text-slate-800">
              Precio Final
            </p>
            <span className="font-bold tracking-[0.4px] text-slate-800">
              $120.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
