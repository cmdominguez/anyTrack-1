"use client";
import React, { useState } from "react";
import { useShippingStore } from "../../store/shippingStore";
import { useValidate } from "../hook/useValidate";
import InputCustom from "./InputCustom";
import LayoutFormModal from "./LayoutFormModal";
import SearchDriverBar from "./formShipping/SearchDriverBar";
import SearchSentClientBar from "./formShipping/SearchSentClientBar";
import SearchReceivedClientBar from "./formShipping/SearchReceivedClientBar";
import SearchVehicleBar from "./formShipping/SearchVehicleBar";

type Prop = {
  closeModal: () => void;
};

export default function ModalForm({ closeModal }: Prop) {
  const { addShipping } = useShippingStore();
  const [sent, setSent] = useState(false);
  const [valueInput, setValueInput] = useState({
    driverName: "",
    sentClient: "",
    receivedClient: "",
    patent: "",
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
      !valueInput.driverName ||
      !valueInput.sentClient ||
      !valueInput.receivedClient ||
      !valueInput.patent ||
      !valueInput.origen ||
      !valueInput.destino
    ) {
      return;
    }

    closeModal();
    //addShipping(valueInput);
    console.log(valueInput);
  };

  return (
    <LayoutFormModal closeModal={closeModal} handleSubmit={handleSubmit}>
      <h1 className="text-slate-800 font-lg font-bold tracking-[0.4px] leading-tight mb-4">
        Completar Información
      </h1>
      <SearchDriverBar
        valueInput={valueInput}
        setValueInput={setValueInput}
        sent={sent}
      />
      <SearchSentClientBar
        valueInput={valueInput}
        setValueInput={setValueInput}
        sent={sent}
      />
      <SearchReceivedClientBar
        valueInput={valueInput}
        setValueInput={setValueInput}
        sent={sent}
      />
      <SearchVehicleBar
        valueInput={valueInput}
        setValueInput={setValueInput}
        sent={sent}
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
