import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../models/product';
import { ProductService } from '../../services/products/product.service';
import { SharingDataService } from '../../services/products/sharing-data.service';
import { FormComponent } from './form/form.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormComponent, PaginatorComponent, RouterModule],
  templateUrl: './products.component.html',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  paginator: any = {};

  //se crea una variable de productos vacios
  productSelected: Product = new Product();

  constructor(
    private router: Router,
    private service: ProductService,
    private sharingData: SharingDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.findAll().subscribe((products) => (this.products = products));
    this.addProduct();
    this.onDeleteProduct();
    this.findProductById();
    this.pageProductEvent();
  }

  pageProductEvent() {
    this.sharingData.pageProductEventEmitter.subscribe((pageable) => {
      this.products = pageable.products;
      this.paginator = pageable.paginator;
    });
  }

  findProductById() {
    this.sharingData.findProductByIdEventEmitter.subscribe((id) => {
      const prod = this.products.find((prod) => prod.id == id);

      this.sharingData.selectProductEventEmitter.emit(prod);
    });
  }

  addProduct() {
    this.sharingData.newProductEventEmitter.subscribe((prod) => {
      if (prod.id > 0) {
        this.service.update(prod).subscribe({
          next: (productUpdated) => {
            this.products = this.products.map((p) =>
              p.id == productUpdated.id ? { ...productUpdated } : p
            );
            this.router.navigate(['/products'], {
              state: {
                products: this.products,
                paginator: this.paginator,
              },
            });

            Swal.fire({
              title: 'Actualizado!',
              text: 'Usuario editado con exito!',
              icon: 'success',
            });
          },
          error: (err) => {
            // console.log(err.error)
            if (err.status == 400) {
              this.sharingData.errorsProductFormEventEmitter.emit(err.error);
            }
          },
        });
      } else {
        this.service.create(prod).subscribe({
          next: (prodNew) => {
            console.log(prod);
            this.products = [...this.products, { ...prodNew }];

            this.router.navigate(['/products'], {
              state: {
                products: this.products,
                paginator: this.paginator,
              },
            });

            Swal.fire({
              title: 'Creado nuevo producto!',
              text: 'Producto creado con exito!',
              icon: 'success',
            });
          },
          error: (err) => {
            console.log(err.error);
            console.log(err.status);
            if (err.status == 400) {
              this.sharingData.errorsProductFormEventEmitter.emit(err.error);
            }
          },
        });
      }
    });
  }

  onDeleteProduct(): void {
    this.sharingData.idProductEventEmitter.subscribe((id) => {
      Swal.fire({
        title: 'Seguro que quiere eliminar?',
        text: 'Cuidado el producto sera eliminado del sistema!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.remove(id).subscribe(() => {
            this.products = this.products.filter((prod) => prod.id != id);
            this.router
              .navigate(['/products'], { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/products'], {
                  state: {
                    products: this.products,
                    paginator: this.paginator,
                  },
                });
              });
          });

          Swal.fire({
            title: 'Eliminado!',
            text: 'Producto eliminado con exito.',
            icon: 'success',
          });
        }
      });
    });
  }

  //con este metodo llenamos la varialbe de productos selecionado con los que vienen de la base
  // de datos para luego ser mostrados en el form hijo
  onUpdateProduct(productRow: Product): void {
    this.productSelected = { ...productRow };
  }
}
