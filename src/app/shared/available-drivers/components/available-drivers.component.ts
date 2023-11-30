import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { SharedDataService } from 'src/app/core/services';

@Component({
  selector: 'app-available-drivers',
  templateUrl: './available-drivers.component.html',
  styleUrls: ['./available-drivers.component.scss']
})
export class AvailableDriversComponent implements OnInit {
  public drivers = [{ id: 1, coordinates: DEFAULT_COORDS, eta: 0 }];
  @Input() public selectedDriver = { id: 1, coordinates: DEFAULT_COORDS, eta: 0 };
  @Input() public isSelected = false;
  @Output() public selected = new EventEmitter();

  constructor(
    private sharedDataService: SharedDataService
  ){}

  ngOnInit() {
    this.drivers = this.sharedDataService.getDrivers();
    this.isSelected ? this.drivers = [] : '';
  }
}
