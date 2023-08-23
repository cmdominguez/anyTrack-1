import { useContextVehicles } from "@/app/context/ContextVehicles";
import InputCustom from "../InputCustom";
import LayoutFormDrawer from "../LayoutFormDrawer";
import { useEffect, useState } from "react";
import { useVehiclesStore } from "@/store/vehiclesStore";
import { ValueInput } from "@/app/interface/interfaceVehicles";
import { useValidateFormVehicles } from "@/app/hook/useValidateFormVehicles";

const typeVehicles = [
  {
    id: 1,
    name: "Moto",
  },
  {
    id: 2,
    name: "Automovil",
  },
  {
    id: 3,
    name: "Camion",
  },
];

export default function DrawerFormVehicles() {
  const { closeFormVehicle, showFormVehicles, objectToEdit, vehicleId } =
    useContextVehicles();
  const [sent, setSent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const { addVehicle, editVehicle } = useVehiclesStore();
  const [valueInput, setValueInput] = useState<ValueInput>({
    patent: "",
    vehicleTypeId: null,
  });

  const errors = useValidateFormVehicles(valueInput);

  useEffect(() => {
    if (objectToEdit !== null) {
      setValueInput({
        patent: objectToEdit.patent,
        vehicleTypeId: objectToEdit.type.id,
      });
    }

    if (!showFormVehicles) {
      setValueInput({ patent: "", vehicleTypeId: null });
      setSent(false);
      setSelectedOption("");
    }
  }, [showFormVehicles]);

  if (!showFormVehicles) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleOptionSelect = (option: string, idVehicle: number) => {
    setSelectedOption(option);
    setValueInput({ ...valueInput, vehicleTypeId: idVehicle });
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);

    if (!valueInput.patent || !valueInput.vehicleTypeId) return;

    if (objectToEdit !== null) {
      editVehicle(vehicleId!, valueInput);
    } else {
      addVehicle(valueInput);
    }

    setSelectedOption("");
    closeFormVehicle();
  };

  return (
    <LayoutFormDrawer
      handleSubmit={handleSubmit}
      closeDrawerForm={closeFormVehicle}
      title={objectToEdit !== null ? "Editar vehículo" : "Agregar vehículo"}
    >
      <InputCustom
        label="Número de patente"
        placeholder="Ejemplo: adv587"
        handleChange={handleChange}
        valueInput={valueInput.patent}
        name="patent"
        errors={errors.patent}
        sent={sent}
      />
      <p className="text-slate-800 text-[13px] font-bold leading-tight tracking-normal mb-3 mt-2">
        Tipo de vehículo
      </p>
      <div className="relative">
        <div className="w-full">
          <button
            type="button"
            className="w-full border-gray-300 rounded border h-10 bg-primary text-slate-800 text-sm font-bold focus:border-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption ? selectedOption : "Seleccionar"}
          </button>
        </div>
        {isOpen && (
          <div className="w-full absolute mt-1 rounded shadow-lg bg-primary z-10">
            {typeVehicles.map((item, index) => {
              return (
                <div key={index} className="py-1">
                  <a
                    className="block px-4 py-2 text-sm hover:font-bold text-slate-700 hover:bg-gray-100 hover:text-slate-900"
                    onClick={() => handleOptionSelect(item.name, item.id)}
                  >
                    {item.name}
                  </a>
                </div>
              );
            })}
          </div>
        )}
        {sent && errors ? (
          <p className="absolute top-[41px] text-[12px] font-bold italic text-red-600">
            {errors.vehicleTypeId}
          </p>
        ) : null}
      </div>

      <div className="h-14" />
    </LayoutFormDrawer>
  );
}
