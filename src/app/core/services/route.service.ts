import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@awesome-cordova-plugins/native-page-transitions/ngx';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private transitionOptions: NativeTransitionOptions = {
    direction: 'left',
    duration: 300
  };

  constructor(
    private _nativePageTransitions: NativePageTransitions,
    private _router: Router
  ) {}

  public transition(path: string, transitionOptions = this.transitionOptions): void {
    this._router.navigate([path]);
    this._nativePageTransitions.fade(transitionOptions);
  }

  public animate(transitionOptions = this.transitionOptions): void {
    this._nativePageTransitions.fade(transitionOptions);
  }
}
