"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { BiHomeAlt, BiCar } from "react-icons/bi";
import { BsCreditCard } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { BsBoxFill, BsPerson } from "react-icons/bs";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", route: "/", icon: <RxDashboard size={22} /> },
  { label: "Delivery info", route: "/delivery", icon: <BiHomeAlt size={22} /> },
  { label: "Payment", route: "/payment", icon: <BsCreditCard size={22} /> },
  { label: "Clientes", route: "/clients", icon: <BsPerson size={22} /> },
  { label: "Vehículos", route: "/vehicles", icon: <BiCar size={22} /> },
];

export default function NavList() {
  const [routeSelected, setRouteSelected] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const url = pathname;
    setRouteSelected(url ? url : "/");
  }, [pathname]);

  return (
    <>
      {/* full screen */}
      <nav className="bg-secondary min-w-[220px] hidden lg:flex">
        <div className="h-screen sticky top-0 bg-secondary w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center py-2 mb-8 mx-3 gap-4 pl-2">
              <span className="uppercase font-bold text-blue-500 mt-2">
                anytrack
              </span>
              <FiTruck size={22} className="text-blue-500 mt-2" />
            </div>
            {links.map((item, index) => {
              return (
                <Link
                  href={item.route}
                  key={item.route}
                  onClick={() => setRouteSelected(item.route)}
                  className={`flex mb-3 pl-2 py-2 mx-3 mt-1 rounded-md ${
                    item.route === routeSelected
                      ? "bg-slate-200"
                      : "bg-slate-50"
                  }`}
                >
                  <span
                    className={`${
                      item.route === routeSelected
                        ? "text-slate-900"
                        : "text-slate-400"
                    } font-bold flex gap-4`}
                  >
                    {item.icon}
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="bg-blue-500/30 mb-5 mx-4 rounded-[20px] flex flex-col justify-center items-center py-4">
            <BsBoxFill className="text-[70px] mt-2 text-blue-700" />
            <p className="max-w-[170px] text-center text-[12px] mt-4 text-slate-800">
              Envío gratis por nuestra cuenta para usuarios de suscripción de 1
              año
            </p>
            <p className="text-[13px] mt-4 font-bold text-blue-800">Ver más</p>
          </div>
        </div>
      </nav>
      {/* responsive */}
      <nav className="lg:hidden">
        <div className="lg:ml-0">
          <AiOutlineMenu
            size={22}
            className="text-blue-500 mt-5 fixed left-[6px]"
            onClick={() => setShowMenu(true)}
          />
        </div>
        <div
          className={`bg-secondary fixed left-0 top-0 z-10 ${
            showMenu ? "w-full h-full" : "w-0 h-0 opacity-0"
          }`}
        >
          {showMenu && (
            <RxCross1
              size={22}
              onClick={() => setShowMenu(false)}
              className="text-blue-500 ml-3 mt-5"
            />
          )}
          <div className="px-2 flex flex-col h-full pt-16">
            {links.map((item, index) => {
              return (
                <Link
                  href={item.route}
                  key={item.route}
                  onClick={() => setRouteSelected(item.route)}
                  className={`flex mb-6 pl-2 py-2 mx-3 mt-1 rounded-md ${
                    item.route === routeSelected
                      ? "bg-slate-200"
                      : "bg-slate-50"
                  }`}
                >
                  <span
                    className={`${
                      item.route === routeSelected
                        ? "text-slate-900"
                        : "text-slate-400"
                    } font-bold flex gap-4`}
                  >
                    {item.icon}
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
