import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../services/produits';
import { UserService } from '../../services/utilisateurs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  totalProducts: number = 0;
  totalUsers: number = 0;
  newUsers: number = 0;
  isDark: boolean = false; // Ajout de la propriété isDark
  selectedLang: 'en' | 'fr' = 'fr';

  // Graphique des ventes mensuelles


  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private productService: ProductService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private userService: UserService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadStats();
    this.checkAppMode();
    const saved = localStorage.getItem('lang') as 'en' | 'fr' | null;
    if (saved) {
      this.selectedLang = saved;
      this.translate.use(saved);
    }
  }

  loadStats() {
    // Récupération des données des services
    this.totalProducts = this.productService.getProducts().length;
    this.totalUsers = this.userService.getUsers().length;

    // Simulation de nouveaux utilisateurs (30 derniers jours)
    const allUsers = this.userService.getUsers();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    this.newUsers = allUsers.filter(user => {
      // Simulation de dates d'inscription
      const signupDate = new Date(2025, 7 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 30) + 1);
      return signupDate >= thirtyDaysAgo;
    }).length;
  }

  // Fonction pour rafraîchir les données
  refreshData() {
    this.loadStats();
  }
   async checkAppMode() {
    // const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == 'true'
      ? (this.isDark = true)
      : (this.isDark = false);
    document.body.classList.toggle('dark', this.isDark);
  }

  toggleTheme(event?: CustomEvent) {
    const newValue = typeof event?.detail?.checked === 'boolean' ? event.detail.checked : !this.isDark;
    this.isDark = newValue;
    document.body.classList.toggle('dark', this.isDark);
    if (this.isDark) {
      Preferences.set({ key: 'darkModeActivated', value: 'true' });
    } else {
      Preferences.set({ key: 'darkModeActivated', value: 'false' });
    }
  }

  applyTheme() {
    document.body.classList.toggle('dark', this.isDark);
  }

  setLanguage(lang: 'en' | 'fr') {
    this.translate.use(lang);
    try { localStorage.setItem('lang', lang); } catch {}
  }

  onLanguageChange(event: CustomEvent) {
    const value = (event.detail as any)?.value as 'en' | 'fr';
    if (value) {
      this.selectedLang = value;
      this.setLanguage(value);
    }
  }
}
