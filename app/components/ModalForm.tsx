"use client";
import React, { useState } from "react";
import { useShippingStore } from "../../store/shippingStore";
import { useValidate } from "../hook/useValidate";
import InputCustom from "./InputCustom";
import LayoutFormModal from "./LayoutFormModal";

type Prop = {
  closeModal: () => void;
};

export default function ModalForm({ closeModal }: Prop) {
  const { addShipping } = useShippingStore();
  const [sent, setSent] = useState(false);
  const [valueInput, setValueInput] = useState({
    nombrechofer: "",
    patente: "",
    vahiculo: "",
    origen: "",
    destino: "",
  });
  const errors = useValidate(valueInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);

    if (
      !valueInput.nombrechofer ||
      !valueInput.patente ||
      !valueInput.vahiculo ||
      !valueInput.origen ||
      !valueInput.destino
    ) {
      return;
    }

    closeModal();
    addShipping(valueInput);
  };

  return (
    <LayoutFormModal closeModal={closeModal} handleSubmit={handleSubmit}>
      <h1 className="text-slate-800 font-lg font-bold tracking-[0.4px] leading-tight mb-4">
        Completar Información
      </h1>
      <InputCustom
        label="Nombre del chofer"
        placeholder="James Doe"
        sent={sent}
        errors={errors.nombrechofer}
        handleChange={handleChange}
        valueInput={valueInput.nombrechofer}
        name="nombrechofer"
      />
      <InputCustom
        label="Patente del vehículo"
        placeholder="875FDR"
        sent={sent}
        errors={errors.patente}
        handleChange={handleChange}
        valueInput={valueInput.patente}
        name="patente"
      />
      <InputCustom
        label="Modelo del vehículo"
        placeholder="Toyota Corolla"
        sent={sent}
        errors={errors.vahiculo}
        handleChange={handleChange}
        valueInput={valueInput.vahiculo}
        name="vahiculo"
      />
      <InputCustom
        label="Origen"
        placeholder="Palermo, Buenos Aires"
        sent={sent}
        errors={errors.origen}
        handleChange={handleChange}
        valueInput={valueInput.origen}
        name="origen"
      />
      <InputCustom
        label="Destino"
        placeholder="Moreno, Buenos Aires"
        sent={sent}
        errors={errors.destino}
        handleChange={handleChange}
        valueInput={valueInput.destino}
        name="destino"
      />
    </LayoutFormModal>
  );
}
