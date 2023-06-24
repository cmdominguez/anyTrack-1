import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useValidate } from "@/app/hook/useValidate";
import { Shipping } from "@/app/interface/interfaceShipping";
import { Client } from "@/app/interface/interfaceClients";

type Prop = {
  valueInput: Shipping;
  setValueInput: React.Dispatch<React.SetStateAction<Shipping>>;
  sent: boolean;
};

export default function SearchSentClientBar({
  valueInput,
  setValueInput,
  sent,
}: Prop) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const errors = useValidate(valueInput);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const { data } = await axios.get(
          `/api/clientusers?search=${valueInput.sentClient}`
        );
        setClients(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDate();

    if (valueInput.sentClient === "") {
      setIsOpenDropdown(false);
    }
  }, [valueInput.sentClient]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsOpenDropdown(true);
    }

    setValueInput({ ...valueInput, sentClient: e.target.value });
  };

  const handleDropdownToggle = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleSelectedClient = (clientName: string) => {
    setValueInput({ ...valueInput, sentClient: clientName });
    setIsOpenDropdown(false);
  };

  return (
    <div className="relative">
      <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
        Enviado por
      </label>
      <div className="relative">
        <input
          className="mb-5 mt-2 text-gray-600 bg-primary focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Nombre del cliente"
          onChange={handleChange}
          onClick={handleDropdownToggle}
          value={valueInput.sentClient}
        />
        {sent && errors.sentClient ? (
          <p className="absolute top-[41px] text-[11px] italic text-red-600">
            {errors.sentClient}
          </p>
        ) : null}
      </div>
      {isOpenDropdown && (
        <div className="absolute z-10 bg-gray-100 left-0 top-20 right-0 rounded-md h-[90px] overflow-y-auto shadow-lg">
          {clients.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectedClient(item.name)}
              className="p-3 hover:bg-blue-100"
            >
              <p className="text-[14px] hover:text-slate-900 hover:font-bold">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
