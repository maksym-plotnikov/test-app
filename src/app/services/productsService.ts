import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product.model';
import {ProductsMenu} from '../models/Menu.model';
import {API_URL} from '../constants/urls';

@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) {
    }

    getMenuData(): Promise<ProductsMenu> {
        return this.http.get<ProductsMenu>(`${API_URL}/assets/menu.json`).toPromise();
    }

    getProductsData(): Promise<Product[]> {
        return this.http.get<Product[]>(`${API_URL}/assets/product.json`).toPromise();
    }
}
