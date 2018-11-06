import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialogRef, MatDialog} from '@angular/material';
import {Product} from '../../models/Product.model';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';
import {ProductsService} from '../../services/productsService';
import {BASE_ROUTE} from '../../constants/urls';


@Component({
    selector: 'app-product-item',
    template: ''
})

export class ProductItemComponent implements OnInit {
    routeId: number;
    product: Product;
    dialogRef: MatDialogRef<ProductDialogComponent>;


    constructor(
        public router: Router,
        private _route: ActivatedRoute,
        private productsService: ProductsService,
        public dialog: MatDialog,
    ) {
        this._route.params.subscribe(params => {
            this.routeId = params && +params.id;

        });
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(ProductDialogComponent, {
            id: 'product-dialog',
            data: this.product
        });
        dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
            this.productsService.confirmProduct(result);
            this.router.navigateByUrl(BASE_ROUTE);
        });
    }

    ngOnInit() {
        this.productsService.getProductsData()
            .then(result => {
                this.product = result.find(item => item.id === this.routeId);
                this.openDialog();
            })
            .catch(error => console.log('Error Getting Data: ', error));
    }
}
