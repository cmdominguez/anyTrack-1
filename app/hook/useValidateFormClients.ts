import { Client } from "../interface/interfaceClients";

export const useValidateFormClients = (values: Client) => {
  const errors = {
    address: "",
    dni: "",
    name: "",
    phone: "",
  };

  if (!values.address) {
    errors.address = "Este campo es requerido";
  }

  if (!values.dni) {
    errors.dni = "Este campo es requerido";
  }

  if (!values.name) {
    errors.name = "Este campo es requerido";
  }

  if (!values.phone) {
    errors.phone = "Este campo es requerido";
  }

  return errors;
};
