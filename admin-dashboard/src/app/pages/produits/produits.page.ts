import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/services/produits';

@Component({
  selector: 'app-products',
  templateUrl: './produits.page.html',
  styleUrls: ['./produits.page.scss'],
  standalone: false
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  editingProduct: Product | null = null;
  newProduct: Product = { id: 0, name: '', price: 0, description: '' };

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  addProduct() {
    const trimmedName = this.newProduct.name?.trim();
    if (!trimmedName) {
      return;
    }
    // Ensure price is a number >= 0
    const price = Number(this.newProduct.price);
    this.productService.addProduct({
      id: 0,
      name: trimmedName,
      price: isNaN(price) ? 0 : price,
      description: this.newProduct.description || ''
    });
    // reset form
    this.newProduct = { id: 0, name: '', price: 0, description: '' };
    this.loadProducts();
  }

  async deleteProduct(id: number) {
    const ok = window.confirm('Voulez-vous vraiment supprimer ce produit ?');
    if (!ok) return;
    this.productService.deleteProduct(id);
    this.loadProducts();
  }

  startEdit(product: Product) {
    this.editingProduct = { ...product };
  }

  cancelEdit() {
    this.editingProduct = null;
  }

  saveProduct() {
    if (this.editingProduct) {
      const trimmedName = this.editingProduct.name?.trim();
      if (!trimmedName) return;
      this.editingProduct.name = trimmedName;
      const price = Number(this.editingProduct.price);
      this.editingProduct.price = isNaN(price) ? 0 : price;
      this.productService.updateProduct(this.editingProduct);
      this.editingProduct = null;
      this.loadProducts();
    }
  }
}
