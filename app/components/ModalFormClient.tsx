"use client";
import React, { useEffect, useState } from "react";
import InputCustom from "./InputCustom";
import { useClientUsersStore } from "@/store/clientUsersStore";
import { useContextGlobal } from "../context/ContextGlobal";
import LayoutFormModal from "./LayoutFormModal";
import { useValidateFormClients } from "../hook/useValidateFormClients";

export default function ModalFormClient() {
  const { addClient, editClient } = useClientUsersStore();
  const { clientId, objectToEdit, closeModal } = useContextGlobal();
  const [sent, setSent] = useState(false);
  const [valueInput, setValueInput] = useState({
    address: "",
    dni: "",
    name: "",
    phone: "",
  });

  const errors = useValidateFormClients(valueInput);

  useEffect(() => {
    if (objectToEdit !== null) {
      setValueInput({
        address: objectToEdit.address,
        dni: objectToEdit.dni,
        name: objectToEdit.name,
        phone: objectToEdit.phone,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);

    if (
      !valueInput.name ||
      !valueInput.address ||
      !valueInput.dni ||
      !valueInput.phone
    )
      return;

    if (objectToEdit !== null) {
      editClient(clientId!, valueInput);
    } else {
      addClient(valueInput);
    }

    closeModal();
  };

  return (
    <LayoutFormModal handleSubmit={handleSubmit} closeModal={closeModal}>
      <h1 className="text-slate-800 font-lg font-bold tracking-[0.4px] leading-tight mb-4">
        {objectToEdit !== null ? "Editar Información" : "Completar Información"}
      </h1>
      <InputCustom
        label="Nombre del cliente"
        placeholder="James Doe"
        handleChange={handleChange}
        valueInput={valueInput.name}
        name="name"
        errors={errors.name}
        sent={sent}
      />
      <InputCustom
        label="Dirección"
        placeholder="Echeverria 1498"
        handleChange={handleChange}
        valueInput={valueInput.address}
        name="address"
        errors={errors.address}
        sent={sent}
      />
      <InputCustom
        label="DNI"
        placeholder="65897452"
        handleChange={handleChange}
        valueInput={valueInput.dni}
        name="dni"
        errors={errors.dni}
        sent={sent}
      />
      <InputCustom
        label="Número de Teléfono"
        placeholder="1185690021"
        handleChange={handleChange}
        valueInput={valueInput.phone}
        name="phone"
        errors={errors.phone}
        sent={sent}
      />
    </LayoutFormModal>
  );
}
