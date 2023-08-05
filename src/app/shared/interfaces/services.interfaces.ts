export interface IWeatherInfo {
  icon: string;
}

export interface IWeatherResponse {
  weather: IWeatherInfo[];
}

export interface IHomeResponse {
  weather: IWeatherResponse;
}
