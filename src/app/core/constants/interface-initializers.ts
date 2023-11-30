import { IAddress, IEvent, ITrip, IUser, IUserable, IVehicle } from "src/app/passengers/interfaces";
import { ICoordinate } from "../interfaces";

export const VEHICLE: IVehicle = {
  id: '',
  vehicleType: '',
  model: '',
  plate: '',
  year: 0,
  color: '',
  registration: '',
  registrationExpirationDate: '',
  imageUrl: ''
};

export const USERABLE: IUserable = {
  addresses: []
};

export const USER: IUser = {
  id: '',
  email: '',
  phoneNumber: '',
  fullName: '',
  imageUrl: '',
  userable: USERABLE
};

export const ADDRESS: IAddress = {
  name: '',
  address: '',
  latitude: '',
  longitude: '',
  primary: false
};

export const DEFAULT_COORDS: ICoordinate = {
  lat: 0,
  lng: 0
};

export const EVENT: IEvent = {
  id: '',
  name: '',
  locationCoordinates: DEFAULT_COORDS,
  addressName: '',
  category: '',
  description: '',
  imageUrl: ''
};

export const TRIP: ITrip = {
  passenger: USERABLE,
  driver: USERABLE,
  vehicle: VEHICLE,
  startLocation: DEFAULT_COORDS,
  endLocation: DEFAULT_COORDS,
  startAddress: '',
  endAddress: '',
  startTime: '',
  fare: '1.00',
  status: ''
};

