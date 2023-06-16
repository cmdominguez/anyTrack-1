import { Client } from "../interface/interfaceClients";

export const useValidateFormClients = (values: Client) => {
  const errors = {
    address: "",
    dni: "",
    name: "",
    phone: "",
  };

  if (!values.address) {
    errors.address = "La dirección del cliente es requerido";
  }

  if (!values.dni) {
    errors.dni = "El DNI del cliente es requerido";
  }

  if (!values.name) {
    errors.name = "El nombre del cliente es requerido";
  }

  if (!values.phone) {
    errors.phone = "El teléfono del cliente es requerido";
  }

  return errors;
};
