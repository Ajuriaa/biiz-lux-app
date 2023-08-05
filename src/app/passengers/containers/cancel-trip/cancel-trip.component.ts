import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cancel-trip',
  templateUrl: './cancel-trip.component.html',
  styleUrls: ['./cancel-trip.component.scss']
})
export class CancelTripComponent implements OnInit {
  cancelForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.cancelForm = this.formBuilder.group({
      cancel: [0, Validators.required],
      message: ['', Validators.required],
    });
 }
}
