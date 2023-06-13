interface TypeVehicle {
  id: number;
  name: string;
}

export interface VehicleInterface {
  id: string;
  patent: string;
  type: TypeVehicle;
}

export interface ValueInput {
  patent: string;
  vehicleTypeId: null | number;
}
