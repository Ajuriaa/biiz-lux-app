import { Component, Input, OnInit } from '@angular/core';
import { TRIP } from 'src/app/core/constants';
import { SharedDataService } from 'src/app/core/services';
import { ITrip } from 'src/app/passengers/interfaces';

@Component({
  selector: 'app-current-driver',
  templateUrl: './current-card.component.html',
  styleUrls: ['./current-card.component.scss']
})
export class CurrentDriverCardComponent implements OnInit {
  public tripTime = 300;
  public endTime = 650;
  @Input() public trip: ITrip = TRIP;

  constructor (private sharedData: SharedDataService) {}

  ngOnInit(): void {
    this.tripTime = this.sharedData.getEta();
    this.endTime = this.tripTime + this.sharedData.getGlobalEta();
  }
}
