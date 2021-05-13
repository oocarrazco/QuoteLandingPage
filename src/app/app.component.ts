import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My frontend Page';
  // siteKey = environment.siteKey;
  // recaptchaApi: string = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;

  // imprimir();
  // imprimir() {
  //   console.log(this.siteKey);
  //   console.log(this.recaptchaApi);
  // }
}
