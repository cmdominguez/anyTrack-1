import { useEffect, useState } from "react";
import { useContextVehicles } from "../context/ContextVehicles";
import InputCustom from "./InputCustom";
import LayoutFormModal from "./LayoutFormModal";
import { useVehiclesStore } from "@/store/vehiclesStore";
import { ValueInput } from "../interface/interfaceVehicles";
import { useValidateFormVehicles } from "../hook/useValidateFormVehicles";

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

export default function ModalFormVehicles() {
  const { closeModal, showModalVehicles, objectToEdit, vehicleId } =
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

    if (!showModalVehicles) {
      setValueInput({ patent: "", vehicleTypeId: null });
      setSent(false);
      setSelectedOption("");
    }
  }, [showModalVehicles]);

  if (!showModalVehicles) {
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
    closeModal();
  };

  return (
    <LayoutFormModal handleSubmit={handleSubmit} closeModal={closeModal}>
      <h1 className="text-slate-800 font-lg font-bold tracking-[0.4px] leading-tight mb-4">
        {objectToEdit !== null ? "Editar vehículo" : "Agregar vehículo"}
      </h1>
      <InputCustom
        label="Número de patente"
        placeholder="adv587"
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
          <p className="absolute top-[41px] text-[11px] italic text-red-600">
            {errors.vehicleTypeId}
          </p>
        ) : null}
      </div>

      <div className="h-14" />
    </LayoutFormModal>
  );
}
