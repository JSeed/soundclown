import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'sc-authenticated-user',
  templateUrl: './authenticated-user.component.html',
  styleUrls: ['./authenticated-user.component.scss']
})
export class AuthenticatedUserComponent {

  isOpen = false;
  user$ = this.auth.user$;

  constructor(
    private auth: AuthService,
  ) { }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: window.location.origin });
  }

}
