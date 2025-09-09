import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  showMenu = true;
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(public auth: AuthService, private router: Router) {
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cacher le menu sur /login, /register, etc.
        this.showMenu = !['/login', '/register'].includes(event.urlAfterRedirects);
      }
    });
  }
  

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
