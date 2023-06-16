import { useDriversStore } from "@/store/driversStore";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContextDrivers } from "../context/ContextDrivers";

export default function TableDriver() {
  const { drivers, deleteDriver } = useDriversStore();
  const { idDriver } = useContextDrivers();

  const handleDeleteDriver = (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este chofer?"
    );

    if (confirmDelete) {
      deleteDriver(id);
    }
  };

  const handleEditDriver = (id: string) => {
    //paso el id al context
    idDriver(id);
  };

  return (
    <table className="min-w-full rounded-lg">
      <thead>
        <tr className="w-[80%] h-16 border-gray-300 border-b py-8">
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4 pl-4">
            Nombre
          </th>
          <th className="text-slate-900 font-bold text-left text-sm tracking-normal leading-4">
            Email
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
        {drivers.map((item, index) => {
          return (
            <tr
              key={index}
              className={`h-24 border-gray-300  ${
                index !== drivers.length - 1 ? "border-b" : "border-none"
              }`}
            >
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4 pl-4">
                {item.name}
              </td>
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                {item.email}
              </td>
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                {item.dni}
              </td>
              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                <div className="flex gap-3">
                  <AiOutlineEdit
                    size={20}
                    onClick={() => handleEditDriver(item.id)}
                    className="text-sky-500 cursor-pointer"
                  />
                  <RiDeleteBin6Line
                    size={20}
                    onClick={() => handleDeleteDriver(item.id)}
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
