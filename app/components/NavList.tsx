"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { BiCar } from "react-icons/bi";
import { FiTruck } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import { usePathname } from "next/navigation";
import useNavbarStore from "@/store/navbarStore";

const links = [
  { label: "Tablero", route: "/", icon: <RxDashboard size={22} /> },
  { label: "Clientes", route: "/clients", icon: <BsPerson size={22} /> },
  { label: "Vehículos", route: "/vehicles", icon: <BiCar size={22} /> },
  { label: "Choferes", route: "/drivers", icon: <BsPerson size={22} /> },
];

export default function NavList() {
  const [routeSelected, setRouteSelected] = useState("");
  const { isOpenMenu, toggleMenu } = useNavbarStore();

  const pathname = usePathname();

  useEffect(() => {
    const url = pathname;
    setRouteSelected(url ? url : "/");
    useNavbarStore.setState({ isOpenMenu: false });
  }, [pathname]);

  return (
    <>
      {/* full screen */}
      <nav className="min-w-[250px] hidden lg:flex shadow-md">
        <div className="h-screen sticky top-0 bg-navBar dark:bg-darknavBar w-full flex flex-col justify-between">
          <div>
            <div className="flex gap-4 pl-3 my-5">
              <span className="uppercase font-bold text-third mt-2">
                anytrack
              </span>
              <FiTruck size={22} className="text-third mt-2" />
            </div>
            {links.map((item) => {
              return (
                <Link
                  href={item.route}
                  key={item.route}
                  onClick={() => setRouteSelected(item.route)}
                  className={`flex mb-3 pl-2 py-2 mx-3 mt-1 rounded-md transition-all duration-300 ease-linear ${
                    item.route === routeSelected
                      ? "bg-third"
                      : "bg-navBar dark:bg-darknavBar dark:hover:bg-darksecondary hover:bg-primary"
                  }`}
                >
                  <span
                    className={`${
                      item.route === routeSelected
                        ? "text-primary"
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
          {/* <div className="bg-blue-500/30 mb-5 mx-4 rounded-[20px] flex flex-col justify-center items-center py-4">
            <BsBoxFill className="text-[70px] mt-2 text-blue-700" />
            <p className="max-w-[170px] text-center text-[12px] mt-4 text-slate-800">
              Envío gratis por nuestra cuenta para usuarios de suscripción de 1
              año
            </p>
            <p className="text-[13px] mt-4 font-bold text-blue-800">Ver más</p>
          </div> */}
        </div>
      </nav>
      {/* responsive */}
      <nav className="lg:hidden z-20">
        {isOpenMenu && (
          <div className="bg-navBar dark:bg-darknavBar fixed h-full left-0 right-0">
            <div className="absolute bg-navBar dark:bg-darknavBar left-0 right-0 container mx-auto">
              <RxCross1
                size={22}
                onClick={toggleMenu}
                className="text-third absolute left-5 top-6 cursor-pointer"
              />
              <div className="px-2 flex flex-col h-full pt-16">
                {links.map((item) => {
                  return (
                    <Link
                      href={item.route}
                      key={item.route}
                      onClick={() => setRouteSelected(item.route)}
                      className={`flex mb-6 pl-2 py-2 mx-3 mt-1 rounded-md transition-all duration-300 ease-linear ${
                        item.route === routeSelected
                          ? "bg-third"
                          : "bg-navBar dark:bg-darknavBar dark:hover:bg-darksecondary hover:bg-primary"
                      }`}
                    >
                      <span
                        className={`${
                          item.route === routeSelected
                            ? "text-primary"
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
          </div>
        )}
      </nav>
    </>
  );
}
