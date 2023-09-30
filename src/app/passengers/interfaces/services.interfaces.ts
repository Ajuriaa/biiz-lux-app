import { IAddress, IUser , ITrip } from ".";

export interface IUserInfoResponse {
  currentUser: IUser;
}

export interface IAddressResponse {
  addresses: IAddress[];
}

export interface ITripResponse {
  trip: ITrip;
}
