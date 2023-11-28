import { Component, Input, OnInit } from '@angular/core';
import { TRIP } from 'src/app/core/constants';
import { TripStatus } from 'src/app/core/enums/trip-status.enum';
import { convertUtcToGmtMinus6 } from 'src/app/core/helpers';
import { ITrip } from 'src/app/passengers/interfaces';


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
  @Input() trip: ITrip = TRIP;

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
