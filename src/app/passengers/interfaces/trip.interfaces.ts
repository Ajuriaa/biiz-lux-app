import { ICoordinate } from "src/app/core/interfaces";
import { IUserable } from ".";

export interface IVehicle {
  id: string;
  vehicleType: string;
  model: string;
  plate: string;
  year: number;
  color: string;
  registration: string;
  registrationExpirationDate: string;
  imageUrl: string;
}

export interface ITrip {
  passenger: IUserable;
  driver: IUserable;
  vehicle?: IVehicle;
  startLocation: ICoordinate;
  endLocation: ICoordinate;
  startAddress: string;
  endAddress: string;
  startTime: string;
  endTime?: string;
  fare: string;
  status: string;
}
