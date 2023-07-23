export interface IWeatherInfo {
  iconUri: string;
}

export interface IWeatherResponse {
  weather: IWeatherInfo[];
}

export interface IHomeResponse {
  weather: IWeatherResponse;
}
