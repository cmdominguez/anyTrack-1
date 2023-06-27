import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { useValidate } from "@/app/hook/useValidate";
import { Shipping } from "@/app/interface/interfaceShipping";
import { Driver } from "@/app/interface/interfaceDrivers";

type Prop = {
  valueInput: Shipping;
  setValueInput: React.Dispatch<React.SetStateAction<Shipping>>;
  sent: boolean;
};

export default function SearchDriverBar({
  valueInput,
  setValueInput,
  sent,
}: Prop) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const errors = useValidate(valueInput);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/drivers?search=${valueInput.driverName}`
        );
        setDrivers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    if (valueInput.driverName === "") {
      setIsOpenDropdown(false);
    }
  }, [valueInput.driverName]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsOpenDropdown(true);
    }

    setValueInput({ ...valueInput, driverName: e.target.value });
  };

  const handleDropdownToggle = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleSelectedDriver = (driverName: string) => {
    setValueInput({ ...valueInput, driverName: driverName });
    setIsOpenDropdown(false);
  };

  return (
    <div className="relative">
      <label className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal">
        Nombre del chofer
      </label>
      <div className="relative" >
        <input
          className="mb-5 mt-2 text-gray-600 bg-primary focus:outline-none focus:border focus:border-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Nombre del chofer"
          onChange={handleChange}
          onClick={handleDropdownToggle}
          onBlur={() => {
            setIsOpenDropdown(false);
          }}
          value={valueInput.driverName}
        />
        {sent && errors.driverName ? (
          <p className="absolute top-[41px] text-[11px] italic text-red-600">
            {errors.driverName}
          </p>
        ) : null}
      </div>
      {isOpenDropdown && (
        <div className="absolute z-10 bg-gray-100 left-0 top-20 right-0 rounded-md max-h-[90px] overflow-y-auto shadow-lg">
          {drivers.map((item, index) => (
            <div
              key={index}
              onMouseDown={() => handleSelectedDriver(item.name)}
              className="p-3 hover:bg-blue-100"
            >
              <p className="text-[14px] hover:text-slate-900 hover:font-bold">
                {item.name} | {item.email} | {item.dni}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
