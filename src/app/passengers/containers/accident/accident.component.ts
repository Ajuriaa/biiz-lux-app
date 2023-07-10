import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent implements OnInit {
  public accidentForm: FormGroup = new FormGroup({});

  constructor(
    private readonly _formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.accidentForm = this._formBuilder.group({
      message: ['', [Validators.required]]
    });
  }
}
