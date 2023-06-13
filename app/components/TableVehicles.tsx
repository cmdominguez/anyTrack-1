"use client";
import { useVehiclesStore } from "@/store/vehiclesStore";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContextVehicles } from "../context/ContextVehicles";

export default function TableVehicles() {
  const { vehicles, deleteVehicle } = useVehiclesStore();
  const { idVehicle } = useContextVehicles();

  const handleDeleteVehicle = (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este vehículo?"
    );
    if (confirmDelete) {
      deleteVehicle(id);
    }
  };

  const handleEditVehicle = (id: string) => {
    //paso el id al context
    idVehicle(id);
  };

  return (
    <table className="min-w-full rounded-lg">
      <thead>
        <tr className="w-[80%] h-16 border-gray-300 border-b py-8">
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4 pl-4">
            Patente
          </th>
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4">
            Tipo de Vehículo
          </th>
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((item, index) => {
          return (
            <tr
              key={index}
              className={`h-24 border-gray-300  ${
                index !== vehicles.length - 1 ? "border-b" : "border-none"
              }`}
            >
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4 pl-4">
                {item.patent}
              </td>
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                {item.type?.name}
              </td>
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                <div className="flex gap-3">
                  <AiOutlineEdit
                    size={20}
                    onClick={() => handleEditVehicle(item.id)}
                    className="text-sky-500 cursor-pointer"
                  />
                  <RiDeleteBin6Line
                    size={20}
                    onClick={() => handleDeleteVehicle(item.id)}
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
