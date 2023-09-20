import { Component } from '@angular/core';

const MESSAGE = 'Si estuvo involucrado en algún accidente con alguno de nuestros choferes, contamos con un seguro de viaje que cubre parte de tus gastos, llena los siguientes datos y luego espera ser contactado por nuestro servicio al cliente.';
@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent {
  public infoMessage = MESSAGE;
  public selectedValue = 'NO';
  public message = '';

  public changeSelectedValue(newValue: string) {
    this.selectedValue = newValue;
  }
}
