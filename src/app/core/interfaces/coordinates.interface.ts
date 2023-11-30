export interface ICoordinate {
  lat: number;
  lng: number;
}

export interface IDriver {
  id: number;
  coordinates: ICoordinate;
  eta: number;
}

export interface ITripInfo {
  driver_id: number,
  start_coords: ICoordinate,
  end_coords: ICoordinate,
  passenger_id: number,
  fare: number
}
