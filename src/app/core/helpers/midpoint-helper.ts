import { ICoordinate } from "../interfaces";

export function calculateMidpoint(coord1: ICoordinate, coord2: ICoordinate): ICoordinate {
  const midpoint: ICoordinate = {
    lat: (coord1.lat + coord2.lat) / 2,
    lng: (coord1.lng + coord2.lng) / 2,
  };

  return midpoint;
}
