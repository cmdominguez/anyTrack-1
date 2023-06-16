import React, { useEffect, useState } from "react";
import LayoutFormModal from "./LayoutFormModal";
import { useContextDrivers } from "../context/ContextDrivers";
import InputCustom from "./InputCustom";
import { useDriversStore } from "@/store/driversStore";
import { useValidateFormDrivers } from "../hook/useValidateFormDrivers";

export default function ModalFormDrivers() {
  const { closeModal, showModalDrivers, objectToEdit, driverId } =
    useContextDrivers();
  const [sent, setSent] = useState(false);
  const { addDriver, editDriver } = useDriversStore();
  const [valueInput, setValueInput] = useState({
    email: "",
    name: "",
    dni: "",
  });

  const errors = useValidateFormDrivers(valueInput);

  useEffect(() => {
    if (objectToEdit !== null) {
      setValueInput({
        email: objectToEdit.email,
        name: objectToEdit.name,
        dni: objectToEdit.dni,
      });
    }

    if (!showModalDrivers) {
      setValueInput({ email: "", name: "", dni: "" });
      setSent(false);
    }
  }, [showModalDrivers]);

  if (!showModalDrivers) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);

    if (!valueInput.name || !valueInput.email || !valueInput.dni) return;

    if (objectToEdit !== null) {
      editDriver(driverId!, valueInput);
    } else {
      addDriver(valueInput);
    }

    closeModal();
  };

  return (
    <LayoutFormModal handleSubmit={handleSubmit} closeModal={closeModal}>
      <h1 className="text-slate-800 font-lg font-bold tracking-[0.4px] leading-tight mb-4">
        {objectToEdit !== null ? "Editar chofer" : "Agregar chofer"}
      </h1>
      <InputCustom
        label="Nombre del chofer"
        placeholder="James Doe"
        handleChange={handleChange}
        valueInput={valueInput.name}
        name="name"
        errors={errors.name}
        sent={sent}
      />
      <InputCustom
        label="Email del chofer"
        placeholder="james@gmail.com"
        handleChange={handleChange}
        valueInput={valueInput.email}
        name="email"
        errors={errors.email}
        sent={sent}
      />
      <InputCustom
        label="DNI del chofer"
        placeholder="50259874"
        handleChange={handleChange}
        valueInput={valueInput.dni}
        name="dni"
        errors={errors.dni}
        sent={sent}
      />
    </LayoutFormModal>
  );
}
