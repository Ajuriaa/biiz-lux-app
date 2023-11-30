import { IUser, IVehicle } from "src/app/passengers/interfaces";

export interface IWeatherInfo {
  icon: string;
}

export interface IWeatherResponse {
  weather: IWeatherInfo[];
  main: {
    temp: number;
  }
}

export interface IHomeResponse {
  weather: IWeatherResponse;
}

export interface IProfileHeaderResponse {
  currentUser: IUser;
}

export interface IFareResponse {
  fare: number;
}

export interface IDriverCarResponse {
  driverActiveCar: IVehicle;
}
