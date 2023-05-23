import { Shipping } from "../interface/interfaceShipping";

export const useValidate = (values: Shipping) => {
  const errors = {
    nombrechofer: "",
    patente: "",
    vahiculo: "",
    origen: "",
    destino: "",
  };

  if (!values.nombrechofer) {
    errors.nombrechofer = "Este campo es requerido";
  }

  if (!values.patente) {
    errors.patente = "Este campo es requerido";
  }

  if (!values.vahiculo) {
    errors.vahiculo = "Este campo es requerido";
  }

  if (!values.origen) {
    errors.origen = "Este campo es requerido";
  }

  if (!values.destino) {
    errors.destino = "Este campo es requerido";
  }

  return errors;
};
