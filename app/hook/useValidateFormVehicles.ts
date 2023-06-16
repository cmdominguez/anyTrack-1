import { ValueInput } from "../interface/interfaceVehicles";

export const useValidateFormVehicles = (values: ValueInput) => {
  const errors = {
    patent: "",
    vehicleTypeId: "",
  };

  if (!values.patent) {
    errors.patent = "El número de la patente es requerido";
  }

  if (!values.vehicleTypeId) {
    errors.vehicleTypeId = "Seleccione un tipo de vehículo";
  }

  return errors;
};
