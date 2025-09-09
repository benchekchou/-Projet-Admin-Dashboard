import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitsPageRoutingModule } from './produits-routing.module';

import { ProductsPage } from './produits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitsPageRoutingModule
  ],
  declarations: [ProductsPage]
})
export class ProduitsPageModule {}
