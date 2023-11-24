import { IAddress, IUser , ITrip, IEvent } from ".";

export interface IUserInfoResponse {
  currentUser: IUser;
}

export interface IAddressResponse {
  addresses: IAddress[];
}

export interface ITripResponse {
  trip: ITrip;
}

export interface IEventResponse {
  allEvents: IEvent[];
}
