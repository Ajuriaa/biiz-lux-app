import { Component, Input } from '@angular/core';
import { RouterService } from 'src/app/core/services';

@Component({
  selector: 'app-display-button',
  templateUrl: './display-button.component.html',
  styleUrls: ['./display-button.component.scss']
})
export class DisplayButtonComponent {
  @Input() message = '';
  @Input() link = '';
  @Input() title = '';
  @Input() labelGreen = false;

  constructor(private _routerService: RouterService) { }

  public goToPath(): void {
    if (this.link === '') {
      return;
    }
    this._routerService.transition(this.link);
  }
}
