import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useValidate } from "@/app/hook/useValidate";
import {
  Shipping,
  ValueInputShipping,
} from "@/app/interface/interfaceShipping";
import { VehicleInterface } from "@/app/interface/interfaceVehicles";

type Prop = {
  valueInput: ValueInputShipping;
  setValueInput: React.Dispatch<React.SetStateAction<ValueInputShipping>>;
  sent: boolean;
  shipping: Shipping;
  setShipping: React.Dispatch<React.SetStateAction<Shipping>>;
};

export default function SearchVehicleBar({
  sent,
  setValueInput,
  valueInput,
  shipping,
  setShipping,
}: Prop) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [vehicles, setVehicles] = useState<VehicleInterface[]>([]);
  const errors = useValidate(valueInput);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/vehicles?search=${valueInput.patent}`
        );
        setVehicles(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    if (valueInput.patent === "") {
      setIsOpenDropdown(false);
    }
  }, [valueInput.patent]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsOpenDropdown(true);
    }

    setValueInput({ ...valueInput, patent: e.target.value });
  };

  const handleDropdownToggle = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleSelectedPatentVehicle = (patent: string, vehicleId: number) => {
    setValueInput({ ...valueInput, patent: patent });
    setShipping({ ...shipping, vehicleId: vehicleId });
    setIsOpenDropdown(false);
  };

  return (
    <div className="relative">
      <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
        Vehículo
      </label>
      <div className="relative">
        <input
          className="mb-5 mt-2 text-gray-600 bg-primary focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Buscar por patente"
          onChange={handleChange}
          onClick={handleDropdownToggle}
          onBlur={() => {
            setIsOpenDropdown(false);
          }}
          value={valueInput.patent}
        />
        {sent && errors.patent ? (
          <p className="absolute top-[41px] text-[11px] italic text-red-600">
            {errors.patent}
          </p>
        ) : null}
      </div>
      {isOpenDropdown && (
        <div className="absolute z-10 bg-gray-100 left-0 top-20 right-0 rounded-md max-h-[90px] overflow-y-auto shadow-lg">
          {vehicles.map((item, index) => (
            <div
              key={index}
              onMouseDown={() =>
                handleSelectedPatentVehicle(item.patent, Number(item.id))
              }
              className="p-3 hover:bg-blue-100"
            >
              <p className="text-[14px] hover:text-slate-900 hover:font-bold">
                {item.patent}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
