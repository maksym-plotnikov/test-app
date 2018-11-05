export interface ProductExtrasItem {
    id: number;
    name: string;
    extra_id: number;
    price: number;
}

export interface ExtendedProductExtrasItem {
    id: number;
    name: string;
    extra_id: number;
    price: number;
    parentId: number;
}

export interface ProductExtras {
    id: number;
    name: string;
    min: number;
    max: number;
    items: ProductExtrasItem[];

}
