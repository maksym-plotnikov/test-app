import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';
import {MenuProductItem} from '../../models/MenuProductItem.model';
import {ProductsMenu} from '../../models/Menu.model';
import {ProductsService} from '../../services/productsService';
import {BASE_ROUTE} from '../../constants/urls';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
})

export class ProductListComponent implements OnInit {
    private routeId: number;
    public selectedProduct: any;
    public name: string;
    public menuData: ProductsMenu;
    objectValues = Object.values;

    constructor(
        private _route: ActivatedRoute,
        private productsService: ProductsService,
        public router: Router,
        public dialog: MatDialog) {
        this._route.params.subscribe(params => {
            this.routeId = params.id;
        });
    }

    public openDialog(product: object): void {
        const dialogRef = this.dialog.open(ProductDialogComponent, {
            id: 'product-dialog',
            data: {product}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedProduct = result;
            this.router.navigateByUrl(BASE_ROUTE);
        });
    }

    public gotoProductDetails(product: MenuProductItem) {
        const productUrl = `${BASE_ROUTE}/${product.id}`;
        this.router.navigateByUrl(productUrl).then(() => this.openDialog(product));
    }

    ngOnInit() {
        this.router.navigateByUrl(BASE_ROUTE);
        this.productsService.getMenuData()
            .then(result => this.menuData = result)
            .catch(error => console.log('Error Getting Data: ', error));


    }
}
