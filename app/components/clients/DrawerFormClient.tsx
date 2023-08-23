import React, { useEffect, useState } from "react";
import { useClientsStore } from "@/store/clientsStore";
import InputCustom from "../InputCustom";
import LayoutFormDrawer from "../LayoutFormDrawer";
import { useContextClients } from "@/app/context/ContextClients";
import { useValidateFormClients } from "@/app/hook/useValidateFormClients";

export default function DrawerFormClient() {
  const { addClient, editClient } = useClientsStore();
  const { clientId, objectToEdit, closeFormClient, showFormClient } =
    useContextClients();
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

    if (!showFormClient) {
      setValueInput({ address: "", dni: "", name: "", phone: "" });
      setSent(false);
    }
  }, [showFormClient]);

  //abro el formulario
  if (!showFormClient) {
    return null;
  }

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

    closeFormClient();
  };

  return (
    <LayoutFormDrawer
      handleSubmit={handleSubmit}
      closeDrawerForm={closeFormClient}
      title={objectToEdit !== null ? "Editar Cliente" : "Agregar Cliente"}
    >
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
    </LayoutFormDrawer>
  );
}
