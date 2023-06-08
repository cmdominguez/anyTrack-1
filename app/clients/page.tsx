"use client";
import React, { useEffect } from "react";
import TableClients from "../components/TableClients";
import { IoAddCircleSharp } from "react-icons/io5";
import ModalFormClient from "../components/ModalFormClient";
import { useContextGlobal } from "../context/ContextGlobal";
import { useClientUsersStore } from "@/store/clientUsersStore";
import Loading from "../components/Loading";

export default function Clients() {
  const { openModal, showModalClient } = useContextGlobal();
  const { isLoading, getClients } = useClientUsersStore();

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {showModalClient && <ModalFormClient />}
      <div className="px-6 pt-10">
        <div
          onClick={() => openModal()}
          className="bg-secondary rounded-lg border-b-4 border-blue-500 flex items-center justify-center cursor-pointer shadow-lg h-36 lg:w-[20%] md:w-[35%] w-full mb-10"
        >
          <IoAddCircleSharp size={80} className="text-blue-500" />
        </div>
        <p className="font-bold lg:text-2xl text-lg tracking-[0.4px] text-slate-800">
          Lista de Clientes
        </p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pt-6 pb-20 px-6 rounded-lg">
          <div className="w-full overflow-x-scroll md:overflow-x-hidden rounded-lg shadow-lg">
            <TableClients />
          </div>
        </div>
      )}
    </div>
  );
}
