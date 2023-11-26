import { Component } from '@angular/core';
import { RouterService } from 'src/app/core/services';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent {
  constructor(private _routerService: RouterService) {}

  public goToPath(path: string): void {
    this._routerService.transition(path);
  }
}
