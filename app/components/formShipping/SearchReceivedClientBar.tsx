import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useValidate } from "@/app/hook/useValidate";
import {
  Shipping,
  ValueInputShipping,
} from "@/app/interface/interfaceShipping";
import { Client } from "@/app/interface/interfaceClients";

type Prop = {
  valueInput: ValueInputShipping;
  setValueInput: React.Dispatch<React.SetStateAction<ValueInputShipping>>;
  sent: boolean;
  shipping: Shipping;
  setShipping: React.Dispatch<React.SetStateAction<Shipping>>;
};

export default function SearchReceivedClientBar({
  valueInput,
  setValueInput,
  sent,
  shipping,
  setShipping,
}: Prop) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const errors = useValidate(valueInput);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/clientusers?search=${valueInput.receivedClient}`
        );
        setClients(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (valueInput.receivedClient === "") {
      setIsOpenDropdown(false);
    }

    fetchData();
  }, [valueInput.receivedClient]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsOpenDropdown(true);
    }

    setValueInput({ ...valueInput, receivedClient: e.target.value });
  };

  const handleDropdownToggle = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleSelectedClient = (
    clientName: string,
    clientReceivedId: number
  ) => {
    setValueInput({ ...valueInput, receivedClient: clientName });
    setShipping({ ...shipping, receiverId: clientReceivedId });
    setIsOpenDropdown(false);
  };

  return (
    <div className="relative">
      <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
        Recibido por
      </label>
      <div className="relative">
        <input
          className="mb-5 mt-2 text-gray-600 bg-primary focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Nombre del cliente"
          onChange={handleChange}
          onClick={handleDropdownToggle}
          onBlur={() => {
            setIsOpenDropdown(false);
          }}
          value={valueInput.receivedClient}
        />
        {sent && errors.receivedClient ? (
          <p className="absolute top-[41px] text-[11px] italic text-red-600">
            {errors.receivedClient}
          </p>
        ) : null}
      </div>
      {isOpenDropdown && (
        <div className="absolute z-10 bg-gray-100 left-0 top-20 right-0 rounded-md max-h-[90px] overflow-y-auto shadow-lg">
          {clients.map((item, index) => (
            <div
              key={index}
              onMouseDown={() =>
                handleSelectedClient(item.name, Number(item.id))
              }
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
