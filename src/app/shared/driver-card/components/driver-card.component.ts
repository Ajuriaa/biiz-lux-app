import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MapService, SharedDataService } from 'src/app/core/services';
import { firstValueFrom } from 'rxjs';
import { DriverCardQueries } from '../../services';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent implements OnInit {
  public arriveTime = '';
  public finishTime = '';
  public fare = '';
  public imageUrl = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/car.png';
  public loading = true;
  public interval: any;
  public eta = 601;
  @Input() public driver = { id: 1, coordinates: DEFAULT_COORDS, eta: 0 };
  @Input() public unique = false;

  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private _driverCardQuery: DriverCardQueries
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const coords = this.sharedDataService.getPassengerCoords();
    this.eta = await this.mapService.getEstimatedTime(this.driver.coordinates, coords);
    this.arriveTime = this.calculateEstimatedTime(this.eta);
    this.finishTime = this.calculateEstimatedTime(this.eta + this.sharedDataService.getGlobalEta());
    const phoneBattery = this.sharedDataService.getBatteryLevel();
    const globalEta = this.sharedDataService.getGlobalEta();
    const driversCount = this.sharedDataService.getDrivers().length;
    const distance = this.sharedDataService.getGlobalDistance();
    const fareValue = await firstValueFrom(this._driverCardQuery.generateFare(this.driver.id, Math.round(phoneBattery), driversCount, distance, globalEta));
    this.fare = `${fareValue.data.fare} LPS`;
    this.sharedDataService.setTripFare(fareValue.data.fare);
    // this._driverCardQuery.generateFare(this.driver.id, phoneBattery, driversCount, distance, globalEta).subscribe(({ data }) => {
    //   if (data) {
    //     this.fare = `${data.fare} LPS`;
    //
    //   }
    // });
    this._driverCardQuery.getDriverCar(this.driver.id).subscribe(({ data }) => {
      if (data) {
        this.imageUrl = data.driverActiveCar.imageUrl;
      }
    });
    this.loading = false;
  }

  private calculateEstimatedTime(time: number): string {
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + time * 1000);

    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();

    return `${this.formatTime(hours)}:${this.formatTime(minutes)}`;
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
