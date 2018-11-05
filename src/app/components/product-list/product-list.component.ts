import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';
import {MenuProductItem} from '../../models/MenuProductItem.model';
import {ProductsMenu} from '../../models/Menu.model';
import {ProductsService} from '../../services/productsService';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
})

export class ProductListComponent implements OnInit {
    public selectedProduct: any;
    public name: string;
    public data: ProductsMenu;
    objectValues = Object.values;

    constructor(
        private productsService: ProductsService,
        public router: Router, public dialog: MatDialog) {
    }

    public openDialog(product: object): void {
        const dialogRef = this.dialog.open(ProductDialogComponent, {
            id: 'product-dialog',
            data: {product}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.selectedProduct = result;
            this.router.navigateByUrl('/products');
        });
    }

    public gotoProductDetails(url: string, product: MenuProductItem) {
        const productUrl = `${url}/${product.id}`;
        this.router.navigateByUrl(productUrl).then(() => this.openDialog(product));
    }

    ngOnInit() {
        this.router.navigateByUrl('/products');
        this.productsService.getMenuData()
            .then(result => this.data = result)
            .catch(error => console.log('Error Getting Data: ', error));
    }
}
