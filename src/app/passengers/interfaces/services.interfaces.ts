import { IAddress, IUser , ITrip, IEvent, INotification } from ".";

export interface IUserInfoResponse {
  currentUser: IUser;
}

export interface IAddressResponse {
  addresses: IAddress[];
}

export interface ITripResponse {
  trip: ITrip;
}

export interface IUserTripsResponse {
  trips: ITrip[];
}

export interface INotificationResponse {
  notifications: INotification[];
}

export interface IEventResponse {
  allEvents: IEvent[];
}
