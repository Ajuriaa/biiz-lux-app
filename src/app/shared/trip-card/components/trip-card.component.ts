import { Component, Input, OnInit } from '@angular/core';
import { TRIP } from 'src/app/core/constants';
import { TripStatus } from 'src/app/core/enums/trip-status.enum';
import { convertUtcToGmtMinus6 } from 'src/app/core/helpers';
import { ITrip } from 'src/app/passengers/interfaces';


const tripData: ITrip = {
  driver: {
    shortName: "Juan Perez",
  },
  passenger: {},
  startLocation: { lat: 14.0607678, lng: -87.2413856 },
  endLocation: { lat: 14.0625764, lng: -87.2204972 },
  startTime: "Tue, 28 Nov 2023 06:52:10.869000000 UTC +00:00",
  endTime: "Tue, 28 Nov 2023 06:52:35.147880000 UTC +00:00",
  fare: '76.0',
  status: "completed",
  startAddress: "3Q65+4JF, Tegucigalpa, Francisco Morazán, Honduras",
  endAddress: "City Mall Tegucigalpa, Tegucigalpa, Honduras",
};

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent implements OnInit{
  public status = '';
  public startAddress = '';
  public endAddress = '';
  public startTime = '';
  public endTime = '';
  @Input() trip: ITrip = tripData;

  ngOnInit(): void {
    this.status = TripStatus[this.trip.status as keyof typeof TripStatus];
    this.startAddress = this.extractAddress(this.trip.startAddress);
    this.endAddress = this.extractAddress(this.trip.endAddress);
    this.startTime = convertUtcToGmtMinus6(this.trip.startTime);
    this.endTime = this.trip.endTime ? convertUtcToGmtMinus6(this.trip?.endTime) : '-:-- --';
  }

  public extractAddress(fullAddress: string): string {
    const firstCommaIndex = fullAddress.indexOf(',');
    return fullAddress.substring(0, firstCommaIndex).trim();
  }
}
