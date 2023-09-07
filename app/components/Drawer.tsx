import "animate.css";
import React from "react";
import { ShippingResponse } from "../interface/interfaceShipping";
import { BsTelephone, BsChatLeft, BsCarFrontFill } from "react-icons/bs";
import { FaTruck, FaMotorcycle } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import useAnimationStore from "@/store/formAnimation";
//componentes
import TagsInTravel from "./TagsInTravel";
import dynamic from "next/dynamic";

type Prop = {
  showDrawer: boolean;
  toggleDrawer: () => void;
  item: ShippingResponse;
};

export default function Drawer({ showDrawer, toggleDrawer, item }: Prop) {
  const { isAnimation, toggleAnimationForm } = useAnimationStore();

  if (!showDrawer) return null;

  // const MapWithNoSSR = React.useMemo(
  //   () =>
  //     dynamic(() => import("./MapDrawer"), {
  //       loading: () => <p>A map is loading</p>,
  //       ssr: false,
  //     }),
  //   []
  // );

  const handleCloseAnimation = () => {
    setTimeout(() => {
      toggleDrawer();
    }, 300),
      toggleAnimationForm();
  };

  return (
    <>
      <div
        onClick={handleCloseAnimation}
        className={`backdrop-filter ${
          isAnimation ? "backdrop-blur-md" : "backdrop-blur-none"
        } fixed w-full right-0 left-0 bottom-0 top-0 z-20 cursor-pointer dark:bg-slate-800/40 bg-slate-400/40`}
      />
      <div
        className={`bg-primary dark:bg-darkprimary px-6 py-2 fixed z-20 right-0 top-0 h-full md:w-[420px] w-full 
          overflow-y-auto md:rounded-tl-[20px] md:rounded-bl-[20px] shadow-xl animate__animated animate__faster
          ${isAnimation ? "animate__fadeInRight" : "animate__fadeOutRight"}
          `}
      >
        <div
          onClick={handleCloseAnimation}
          className="bg-third cursor-pointer w-10 h-10 flex justify-center items-center mt-2 mb-6 rounded-full"
        >
          <RxCross1 size={22} className="text-primary" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {item.vehicle.type.name === "Automovil" ? (
              <BsCarFrontFill size={13} className="text-slate-400" />
            ) : item.vehicle.type.name === "Camion" ? (
              <FaTruck size={13} className="text-slate-400" />
            ) : (
              <FaMotorcycle size={13} className="text-slate-400" />
            )}
            <span className="font-bold text-[13px] text-slate-400">
              {item.vehicle.type.name}
            </span>
          </div>
          <span className="font-bold text-[13px] text-slate-400">
            {item.vehicle.patent}
          </span>
        </div>
        <div className="mb-4">
          <TagsInTravel title="En viaje" />
          <div className="mt-4">
            <p className="font-bold tracking-[0.4px] text-textPrimary dark:text-darktextPrimary text-lg capitalize truncate">
              Toyota
            </p>
          </div>
        </div>
        <div>{/* <MapWithNoSSR /> */}</div>
        <div className="mt-4 flex justify-between py-1">
          <div className="flex gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              className="w-14 h-14 rounded-full"
            />
            <h2 className="font-bold tracking-[0.4px] text-slate-800 truncate capitalize">
              {/* {item.driverName} */}
            </h2>
          </div>
          <div className="flex gap-3">
            <div className="bg-blue-500/40 w-6 h-6 flex items-center justify-center rounded-md">
              <BsChatLeft
                className="text-blue-800 dark:text-blue-200"
                size={13}
              />
            </div>
            <div className="bg-blue-500/40 w-6 h-6 flex items-center justify-center rounded-md">
              <BsTelephone
                className="text-blue-800 dark:text-blue-200"
                size={13}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 py-1">
          <div className="flex items-center gap-2">
            <TbPointFilled className="text-orange-600" />
            <div>
              <span className="font-bold tracking-[0.4px] text-[14px] text-textPrimary dark:text-darktextPrimary truncate">
                Origen
              </span>
              <p className="tracking-[0.4px] text-slate-400 text-[12px] truncate">
                Palermo, Buenos Aires
              </p>
            </div>
          </div>
          <div>
            <span className="tracking-[0.4px] text-slate-400 text-[12px] truncate">
              11:40hs
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 py-1">
          <div className="flex items-center gap-2">
            <TbPointFilled className="text-orange-600" />
            <div>
              <span className="font-bold tracking-[0.4px] text-[14px] text-textPrimary dark:text-darktextPrimary truncate">
                Destino
              </span>
              <p className="tracking-[0.4px] text-slate-400 text-[12px] truncate">
                Moreno, Buenos Aires
              </p>
            </div>
          </div>
          <div>
            <span className="tracking-[0.4px] text-slate-400 text-[12px] truncate">
              14:40hs
            </span>
          </div>
        </div>
        <div className="flex items-end lg:h-[150px] h-[190px]">
          <div className="flex-1 justify-between">
            <div className="flex flex-1 justify-between mb-4">
              <p className="tracking-[0.4px] text-slate-400 text-[12px]">
                Precio total del envio
              </p>
              <span className="tracking-[0.4px] text-slate-400 text-[12px]">
                $120.00
              </span>
            </div>
            <div className="flex flex-1 justify-between">
              <p className="font-bold tracking-[0.4px] text-textPrimary dark:text-darktextPrimary">
                Precio Final
              </p>
              <span className="font-bold tracking-[0.4px] text-textPrimary dark:text-darktextPrimary">
                $120.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
