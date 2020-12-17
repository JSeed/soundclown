import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  show = false;
  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(
    public authService: AuthService,
  ) {}

  title = 'soundclown';
}
