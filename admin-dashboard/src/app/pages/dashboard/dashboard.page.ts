import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/produits';
import { UserService } from '../../services/utilisateurs';

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

  // Graphique des ventes mensuelles


  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private productService: ProductService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadStats();
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
}
