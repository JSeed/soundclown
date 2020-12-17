import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'sc-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  user$ = this.auth.user$;

  constructor(
    private auth: AuthService,
  ) { }

  logout() {
    this.auth.logout({ returnTo: window.location.origin });
  }

}
