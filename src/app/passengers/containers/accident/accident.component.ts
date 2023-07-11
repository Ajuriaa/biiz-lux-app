import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent implements OnInit {
  accidentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.accidentForm = this.formBuilder.group({
      gotHurt: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.accidentForm.valid) {
      const formData = this.accidentForm.value;
      console.log(formData);
    }
  }
}
