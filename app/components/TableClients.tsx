"use client";
import { useClientUsersStore } from "@/store/clientUsersStore";
import React from "react";
import { useContextClients } from "../context/ContextClients";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";

export default function TableClients() {
  const { clients, deleteClient } = useClientUsersStore();
  const { idClient } = useContextClients();

  const handleDeleteClient = (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este cliente?"
    );
    if (confirmDelete) {
      deleteClient(id);
    }
  };

  const handleEditClient = (id: string) => {
    //paso el id al context
    idClient(id);
  };

  return (
    <table className="min-w-full bg-secondary rounded-lg">
      <thead>
        <tr className="w-full h-16 border-gray-300 border-b py-8">
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4 pl-4">
            Nombre
          </th>
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4">
            Teléfono
          </th>
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4">
            Dirección
          </th>
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4">
            DNI
          </th>
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        {clients.map((item, index) => {
          return (
            <tr
              key={index}
              className={`h-24 border-gray-300  ${
                index !== clients.length - 1 ? "border-b" : "border-none"
              }`}
            >
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4 pl-4">
                {item.name}
              </td>
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                {item.phone}
              </td>
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                {item.address}
              </td>
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                {item.dni}
              </td>
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                <div className="flex gap-3">
                  <AiOutlineEdit
                    size={20}
                    onClick={() => handleEditClient(item.id!)}
                    className="text-sky-500 cursor-pointer"
                  />
                  <RiDeleteBin6Line
                    size={20}
                    onClick={() => handleDeleteClient(item.id!)}
                    className="text-red-600 cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
