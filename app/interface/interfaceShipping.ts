interface Driver {
  id: number;
  name: string;
}

interface Receiver {
  id: number;
  name: string;
  phone: string;
  address: string;
}

interface Sender {
  id: number;
  name: string;
  phone: string;
  address: string;
}

interface Status {
  name: string;
}

interface TypeVehicle {
  name: string;
}

interface Vehicle {
  id: number;
  patent: string;
  position: null;
  type: TypeVehicle;
}

export interface ShippingResponse {
  destination: {};
  origin: {};
  driver: Driver;
  receiver: Receiver;
  sender: Sender;
  shipload: string;
  status: Status;
  vehicle: Vehicle;
  updatedAt: string;
  createdAt: string;
}

export interface ValueInputShipping {
  driverName: string;
  sentClient: string;
  receivedClient: string;
  patent: string;
  origen: string;
  destino: string;
}

export interface Shipping {
  shipload: string;
  driverId: null | number;
  receiverId: null | number;
  senderId: null | number;
  vehicleId: null | number;
  origin: {};
  destination: {};
}
