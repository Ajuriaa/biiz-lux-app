import { ICoordinate } from "src/app/core/interfaces";

export interface IEvent {
  id: string;
  name: string;
  locationCoordinates: ICoordinate;
  addressName: string;
  category: string;
  description: string;
  imageUrl: string;
}
