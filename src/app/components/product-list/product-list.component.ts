import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {MenuProductItem} from '../../models/MenuProductItem.model';
import {ProductsMenu} from '../../models/Menu.model';
import {SelectedProduct} from '../../models/Product.model';
import {ProductsService} from '../../services/productsService';
import {BASE_ROUTE} from '../../constants/urls';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
})

export class ProductListComponent implements OnInit, OnDestroy {
    @Input() menuData: ProductsMenu;
    public name: string;
    public selectedProduct: {} | SelectedProduct;
    objectValues = Object.values;
    subscription: Subscription;

    constructor(
        public router: Router,
        private productsService: ProductsService,
    ) {
        this.subscription = productsService.productSelected$.subscribe(product => this.selectedProduct = product);
    }

    public gotoProductDetails(product: MenuProductItem) {
        this.router.navigateByUrl(`${BASE_ROUTE}/${product.id}`);
    }

    ngOnInit() {
        this.productsService.getMenuData()
            .then(result => this.menuData = result)
            .catch(error => console.log('Error Getting Data: ', error));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
