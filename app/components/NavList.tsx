"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { BiHomeAlt } from "react-icons/bi";
import { BsCreditCard } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";

const links = [
  { label: "Dashboard", route: "/", icon: <RxDashboard size={22} /> },
  { label: "Delivery info", route: "/delivery", icon: <BiHomeAlt size={22} /> },
  { label: "Payment", route: "/payment", icon: <BsCreditCard size={22} /> },
];

export default function NavList() {
  const [routeSelected, setRouteSelected] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* full screen */}
      <nav className="bg-slate-50 min-w-[250px] hidden lg:flex">
        <div className="min-h-screen sticky top-0">
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
                onClick={() => setRouteSelected(index)}
                className={`flex mb-3 pl-2 py-2 mx-3 mt-1 rounded-md ${
                  index === routeSelected ? "bg-slate-200" : "bg-slate-50"
                }`}
              >
                <span
                  className={`${
                    index === routeSelected
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
      </nav>
      {/* responsive */}
      <nav className="lg:hidden">
        <div className="ml-3">
          <AiOutlineMenu
            size={22}
            className="text-blue-500 mt-5 fixed"
            onClick={() => setShowMenu(true)}
          />
        </div>
        <div
          className={`bg-slate-50 fixed left-0 top-0 z-10 ${
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
                  onClick={() => setRouteSelected(index)}
                  className={`flex mb-6 pl-2 py-2 mx-3 mt-1 rounded-md ${
                    index === routeSelected ? "bg-slate-200" : "bg-slate-50"
                  }`}
                >
                  <span
                    className={`${
                      index === routeSelected
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
