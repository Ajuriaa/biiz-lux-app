import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-something',
  templateUrl: './forgot-something.component.html',
  styleUrls: ['./forgot-something.component.scss']
})
export class ForgotSomethingComponent implements OnInit {
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
