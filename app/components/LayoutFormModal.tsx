import React from "react";
import { FiTruck } from "react-icons/fi";

type Prop = {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  closeModal: () => void;
};

export default function LayoutFormModal({
  children,
  handleSubmit,
  closeModal,
}: Prop) {
  return (
    <div className="py-12 overflow-auto min-h-screen bg-slate-500/80 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="relative py-8 px-5 md:px-10 bg-secondary shadow-md rounded-[20px] border border-gray-400"
        >
          <FiTruck className="text-blue-500 text-4xl mb-3" />

          {children}

          <div className="flex items-center justify-start w-full">
            <button
              type="submit"
              className="focus:outline-none transition duration-150 ease-in-out hover:bg-blue-700 bg-blue-500 rounded text-white px-8 py-2 text-sm mt-5"
            >
              Enviar
            </button>
            <button
              onClick={closeModal}
              className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm mt-5"
            >
              Cancelar
            </button>
          </div>
          <div
            onClick={closeModal}
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
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
  );
}
