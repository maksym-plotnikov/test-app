import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product.model';
import {ProductsMenu} from '../models/Menu.model';


@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) {
    }

    getMenuData(): Promise<ProductsMenu> {
        return this.http.get<ProductsMenu>('http://localhost:4200/assets/menu.json').toPromise();
    }

    getProductsData(): Promise<Product[]> {
        return this.http.get<Product[]>('http://localhost:4200/assets/product.json').toPromise();
    }
}
