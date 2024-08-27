import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { SharingDataService } from '../../../services/products/sharing-data.service';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  product: Product;
  errors: any = {};

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private serviceProduct: ProductService
  ) {
    this.product = new Product();
  }

  ngOnInit(): void {
    this.sharingData.errorsProductFormEventEmitter.subscribe(
      (errors) => (this.errors = errors)
    );
    this.sharingData.selectProductEventEmitter.subscribe(
      (product) => (this.product = product)
    );

    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.sharingData.findProductByIdEventEmitter.emit(id);
        // this.service.findById(id).subscribe(user => this.user = user);
      }
    });
  }

  onSubmit(productForm: NgForm): void {
    this.sharingData.newProductEventEmitter.emit(this.product);
    console.log(this.product);
  }

  clean(): void {
    this.product = {
      id: 0,
      name: '',
      description: '',
      sku: '',
      price: 0,
    };
  }
}
