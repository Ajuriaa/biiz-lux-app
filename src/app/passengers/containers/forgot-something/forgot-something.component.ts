import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const MESSAGE = 'Si dejó algo olvidado contactanos lo más pronto posible, y brindenos la mayor cantidad de detalles, Ie conectaremos directamente con su chofer asignado. Puedes también comunicarte vía chat en vivo o llamar a nuestros números de servicio al cliente que 24 horas del día.';

@Component({
  selector: 'app-forgot-something',
  templateUrl: './forgot-something.component.html',
  styleUrls: ['./forgot-something.component.scss']
})
export class ForgotSomethingComponent implements OnInit {
  public message = MESSAGE;
  public forgotSomethingForm: FormGroup = new FormGroup({});

  constructor(
    private readonly _formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.forgotSomethingForm = this._formBuilder.group({
      message: ['', [Validators.required]]
    });
  }
}
