import {ProductExtras} from './ProductExtras.model';


interface ProductImages {
    full_size: string;
    thumbnail: string;
}

interface ProductCategory {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    before_sale_price: number;
    description: string;
    full_description: string;
    order: number;
    category: ProductCategory;
    images: ProductImages;
    extras: ProductExtras[];
    tags: [];
    availability: string;
}
