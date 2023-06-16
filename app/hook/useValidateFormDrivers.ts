import { ValueInput } from "../interface/interfaceDrivers";

export const useValidateFormDrivers = (values: ValueInput) => {
  const errors = {
    email: "",
    name: "",
    dni: "",
  };

  if (!values.name) {
    errors.name = "El nombre del chofer es requerido";
  }

  if (!values.email) {
    errors.email = "El email del chofer es requerido";
  }

  if (!values.dni) {
    errors.dni = "El dni del chofer es requerido";
  }

  return errors;
};
