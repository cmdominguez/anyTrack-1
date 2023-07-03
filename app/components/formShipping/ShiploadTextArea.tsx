import { ChangeEvent } from "react";
import { Shipping } from "@/app/interface/interfaceShipping";

type Prop = {
  shipping: Shipping;
  setShipping: React.Dispatch<React.SetStateAction<Shipping>>;
};

export default function ShiploadTextArea({ shipping, setShipping }: Prop) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setShipping({ ...shipping, shipload: e.target.value });
  };

  return (
    <div>
      <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
        Descripción del envío
      </label>
      <textarea
        className="mb-5 mt-2 text-gray-600 bg-primary focus:outline-none focus:border focus:border-blue-500 font-normal w-full flex items-center pl-3 py-2 text-sm border-gray-300 rounded border"
        placeholder="Algún comentario sobre el envío"
        rows={4}
        onChange={handleChange}
      />
    </div>
  );
}
