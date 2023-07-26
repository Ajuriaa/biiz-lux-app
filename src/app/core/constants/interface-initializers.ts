import { IAddress, IUser, IUserable } from "src/app/passengers/interfaces";

export const USERABLE: IUserable = {
  addresses: []
};

export const USER: IUser = {
  id: '',
  email: '',
  phoneNumber: '',
  fullName: '',
  userable: USERABLE
};

export const ADDRESS: IAddress = {
  name: '',
  address: ''
};
