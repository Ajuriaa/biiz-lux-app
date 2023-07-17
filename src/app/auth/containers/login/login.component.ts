import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public homePathname = '';
  public loginForm: FormGroup = new FormGroup({});

  constructor(
    private _router: Router,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    // TODO: CHANGE THIS HARCODED PATH WHEN USERS ROLES ARE ADDED
    this.homePathname = `/passenger/home`;
    this._router.navigate([this.homePathname]);
  }
}
