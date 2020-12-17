import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { SharedModule } from '../../shared/shared.module';
import { TrackBreadcrumbsComponent } from './track-breadcrumbs/track-breadcrumbs.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    NavBarComponent,
    AuthenticatedUserComponent,
    TrackBreadcrumbsComponent,
    UserMenuComponent,
  ],
  exports: [
    NavBarComponent,
  ]
})
export class NavBarModule {}
