import { DEFAULT_COORDS } from "../constants";
import { ICoordinate } from "../interfaces";

// This function takes in a passenger coordinate and an array of driver coordinates.
// It then calculates the distance between the passenger and each driver.
// It then returns the driver coordinate that is closest to the passenger.
export function getClosestDriver(passengerCoords: ICoordinate, driverCoords: ICoordinate[]): ICoordinate {
  let closestDriver: ICoordinate =  DEFAULT_COORDS;
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


// This function takes in a passenger coordinate and an array of driver coordinates.
// It then calculates the distance between the passenger and each driver.
// It then returns the 3 driver coordinates that are closest to the passenger.
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
