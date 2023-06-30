import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  public success() { }
  public error() { }
  public warning() { }
  public info() { }

}
