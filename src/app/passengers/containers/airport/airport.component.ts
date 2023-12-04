import { Component } from '@angular/core';
import { RouterService } from 'src/app/core/services';
import { ToastComponent } from 'src/app/shared/toaster';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.scss']
})
export class AirportComponent {
  public selectedAirport = '';

  constructor(
    private toaster: ToastComponent,
    private _routerService: RouterService
  ) { }

  public selectAirport(name: string): void {
    this.selectedAirport = name;
  }

  public selected(name: string): boolean {
    return this.selectedAirport === name;
  }

  public goToPath(): void {
    if(this.selectedAirport === ''){
      this.toaster.errorToast('Tienes que seleccionar un aeropuerto');
      return;
    }
    this._routerService.transition(`/passenger/airport-trip/${this.selectedAirport}`);
  }
}
