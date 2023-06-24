import { Shipping } from "../interface/interfaceShipping";

export const useValidate = (values: Shipping) => {
  const errors = {
    driverName: "",
    sentClient: "",
    receivedClient: "",
    patent: "",
    origen: "",
    destino: "",
  };

  if (!values.driverName) {
    errors.driverName = "El nombre del chofer es requerido";
  }

  if (!values.sentClient) {
    errors.sentClient = "El nombre del cliente es requerido";
  }

  if (!values.receivedClient) {
    errors.receivedClient = "El nombre del cliente es requerido";
  }

  if (!values.patent) {
    errors.patent = "La patente es requerida";
  }

  if (!values.origen) {
    errors.origen = "Este campo es requerido";
  }

  if (!values.destino) {
    errors.destino = "Este campo es requerido";
  }

  return errors;
};
