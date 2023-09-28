import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { ICoordinate } from 'src/app/core/interfaces';

@Component({
  selector: 'app-available-drivers',
  templateUrl: './available-drivers.component.html',
  styleUrls: ['./available-drivers.component.scss']
})
export class AvailableDriversComponent implements OnInit {
  @Input() public drivers = [{ id: 1, distance: 1, coords: DEFAULT_COORDS }];
  @Input() public selectedDriver = { id: 1, distance: 1, coords: DEFAULT_COORDS };
  @Input() public isSelected = false;
  @Output() public selected = new EventEmitter();

  ngOnInit() {
    this.isSelected ? this.drivers = [] : '';
  };
}
