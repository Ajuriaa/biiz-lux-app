import { ICoordinate } from "../interfaces";

export function calculateMidpoint(coord1: ICoordinate, coord2: ICoordinate): ICoordinate {
  const midpoint: ICoordinate = {
    latitude: (coord1.latitude + coord2.latitude) / 2,
    longitude: (coord1.longitude + coord2.longitude) / 2,
  };

  return midpoint;
}
