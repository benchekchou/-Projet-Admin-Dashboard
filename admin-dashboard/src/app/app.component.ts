import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  currentLang = 'fr';
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(public auth: AuthService, private router: Router, private translate: TranslateService) {
    const saved = localStorage.getItem('lang') || 'fr';
    this.currentLang = saved;
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    this.translate.use(saved);
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cacher le menu sur /login, /register, etc.
        this.showMenu = !['/login', '/register'].includes(event.urlAfterRedirects);
      }
    });
  }

  setLanguage(lang: 'en' | 'fr') {
    this.currentLang = lang;
    this.translate.use(lang);
    try { localStorage.setItem('lang', lang); } catch {}
  }


  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
