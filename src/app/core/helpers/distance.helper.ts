import { ICoordinate } from "../interfaces";

export function getClosestDriver(passengerCoords: ICoordinate, driverCoords: ICoordinate[]): ICoordinate {
  let closestDriver: ICoordinate = {lat: 0, lng: 0};
  let minDistance = 100000000;

  for (const driverCoord of driverCoords) {
    const distance = calculateDistance(passengerCoords, driverCoord);
    if (distance < minDistance) {
      minDistance = distance;
      closestDriver = driverCoord;
    }
  }

  return closestDriver;
}

export function getCloseDrivers(passengerCoords: ICoordinate, driverCoords: ICoordinate[]): ICoordinate[] {
  const driverDistances: { distance: number; coord: ICoordinate }[] = [];

  for (const driverCoord of driverCoords) {
    const distance = calculateDistance(passengerCoords, driverCoord);
    driverDistances.push({ distance, coord: driverCoord });
  }

  driverDistances.sort((a, b) => a.distance - b.distance);

  const closestDrivers = driverDistances.slice(0, 3).map((item) => item.coord);

  return closestDrivers;
}

function calculateDistance(coord1: ICoordinate, coord2: ICoordinate): number {
  const dx = coord1.lat - coord2.lat;
  const dy = coord1.lng - coord2.lng;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance;
}
