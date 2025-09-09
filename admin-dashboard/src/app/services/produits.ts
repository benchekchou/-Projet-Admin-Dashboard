import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Produit 1', price: 10.99, description: 'Description 1' },
    { id: 2, name: 'Produit 2', price: 20.99, description: 'Description 2' }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    product.id = this.products.length + 1;
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index > -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}