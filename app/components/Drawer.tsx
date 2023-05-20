import React from "react";
import MapDrawer from "./MapDrawer";

interface Shipping {
  name: string;
  modelCart: string;
  destino: string;
}

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
          className="text-gray-500 hover:text-gray-600 focus:outline-none"
          onClick={toggleDrawer}
        >
          X
        </button>
      </div>
      <div className="p-4 flex items-center gap-3">
        <img
          src="https://randomuser.me/api/portraits/men/10.jpg"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p>{item.name}</p>
          <p>{item.modelCart}</p>
        </div>
      </div>
      <div>
        <MapDrawer />
      </div>
    </div>
  );
}
