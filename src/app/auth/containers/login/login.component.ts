import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import { AuthMutations } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public homePathname = '';
  public loginForm: FormGroup = new FormGroup({});
  public loading = false;
  public submitted = false;
  public returnUrl = '';
  public error = false;
  public showPassword = false;

  constructor(
    private _router: Router,
    private readonly _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _authenticationService: AuthMutations,
    private _authGuard: AuthGuard
  ) {
    if (this._authGuard.findToken()) {
      this.homePathname = `/passenger/home`;
      this._router.navigate([this.homePathname]);
    }
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.returnUrl = this._route.snapshot.queryParams.returnUrl;
  }

  public async onSubmit() {
    this.error = false;
    this.submitted = true;
    this.loading = true;
    const login = await this._authenticationService.login(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    );
    const role = this.homePathname || 'passenger';

    if (login.login) {
      this._router.navigate([this.returnUrl || `/${role}/home`]);
    } else {
      this.error = true;
      this.loginForm.controls.email.setErrors({incorrect : true});
      this.loginForm.controls.password.setErrors({incorrect : true});
    }
    this.loading = false;
  }
}
