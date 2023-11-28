import { IAddress, IVehicle } from ".";

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  imageUrl: string;
  userable: IUserable;
}

export interface IUserable {
  addresses?: IAddress[];
  vehicles?: IVehicle[];
  user?: IUser;
  shortName?: string;
}
