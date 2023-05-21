"use client";
import React, { useState } from "react";
import { FiTruck } from "react-icons/fi";
import { useShippingStore } from "../store/shippingStore";

type Prop = {
  closeModal: () => void;
};

export default function ModalForm({ closeModal }: Prop) {
  const { addShipping } = useShippingStore();
  const [valueInput, setValueInput] = useState({
    nombrechofer: "",
    patente: "",
    vahiculo: "",
    destino: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
    addShipping(valueInput);
  };

  return (
    <div>
      <div
        className="py-12 overflow-auto bg-slate-500/80 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="modal"
      >
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
          >
            <FiTruck className="text-blue-500 text-4xl mb-3" />
            <h1 className="text-slate-800 font-lg font-bold tracking-[0.4px] leading-tight mb-4">
              Completar Información
            </h1>
            <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
              Nombre del chofer
            </label>
            <input
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="James Doe"
              name="nombrechofer"
              value={valueInput.nombrechofer}
              onChange={handleChange}
            />
            <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
              Patente del vehículo
            </label>
            <input
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="875FDR"
              name="patente"
              value={valueInput.patente}
              onChange={handleChange}
            />
            <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
              Modelo del vehículo
            </label>
            <input
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Toyota Corolla"
              name="vahiculo"
              value={valueInput.vahiculo}
              onChange={handleChange}
            />
            <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
              Destino
            </label>
            <input
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Moreno"
              name="destino"
              value={valueInput.destino}
              onChange={handleChange}
            />
            <div className="flex items-center justify-start w-full">
              <button
                type="submit"
                className="focus:outline-none transition duration-150 ease-in-out hover:bg-blue-600 bg-blue-500 rounded text-white px-8 py-2 text-sm"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
            <div
              onClick={closeModal}
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Close"
                className="icon icon-tabler icon-tabler-x"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
