const DEFAULT_MARKER_SIZE = 50;
const DRIVER_MARKER_SIZE = 40;

export enum MarkerUrl {
  driver = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/driver-car.png',
  passenger = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/marker.png'
}

export const PassengerMarkerType: google.maps.Icon = {
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(DEFAULT_MARKER_SIZE/2.5 , ( DEFAULT_MARKER_SIZE / 2 ) + 3),
  url: MarkerUrl.passenger,
  scaledSize: new google.maps.Size(DEFAULT_MARKER_SIZE, DEFAULT_MARKER_SIZE)
};

export const DriverMarkerType: google.maps.Icon = {
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(DRIVER_MARKER_SIZE/2 , DRIVER_MARKER_SIZE / 4 ),
  url: MarkerUrl.driver,
  scaledSize: new google.maps.Size(DRIVER_MARKER_SIZE , DEFAULT_MARKER_SIZE/2)
};
