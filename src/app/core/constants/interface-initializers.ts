import { IAddress, IUser, IUserable } from "src/app/passengers/interfaces";
import { ICoordinate } from "../interfaces";

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
