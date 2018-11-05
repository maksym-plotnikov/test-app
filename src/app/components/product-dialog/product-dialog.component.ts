import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Product} from '../../models/Product.model';
import {ExtendedProductExtrasItem} from '../../models/ProductExtras.model';
import {ProductsService} from '../../services/productsService';
import {MenuProductItem} from '../../models/MenuProductItem.model';

export interface DialogData {
    product: MenuProductItem;
}

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html'
})

export class ProductDialogComponent implements OnInit {
    hasErrors = false;
    public product: Product;
    public itemCount = 1;
    public grandTotal = 0;
    public selectedExtras: ExtendedProductExtrasItem[] = [];
    public radioData = {};

    constructor(
        private productsService: ProductsService,
        public dialogRef: MatDialogRef<ProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    needsValidation(index) {
        return this.product.extras[index].min > 0;
    }

    decrement(): void {
        if (this.itemCount > 1) {
            --this.itemCount;
            this.grandTotal = this.grandTotal - this.product.price;
        }
    }

    increment(): void {
        ++this.itemCount;
        this.grandTotal = this.grandTotal + this.product.price;
    }

    needsReset(option) {
        return option.min === 0 && option.max <= 1;
    }

    needsMultipeOptions(index) {
        return this.product.extras[index].max > 1;
    }

    resetFieldGroup(parentId) {
        this.onChange(parentId, {}, true);
    }

    onClose(data = null): void {
        this.dialogRef.close(data);
    }

    onChange(parentId, option, reset = false, event = null): void {
        if (reset) {
            delete this.radioData[parentId];
            return;
        }
        this.hasErrors = false;
        let prevTotal = 0;
        let total = 0;
        const extOption = {...{parentId}, ...option};
        this.selectedExtras.map(item => prevTotal += item.price);
        console.log(event);
        const idx = !event
            ? this.selectedExtras.findIndex(item => (item.name === option.name || item.parentId === parentId))
            : this.selectedExtras.findIndex(item => item.name === option.name);
        if (idx >= 0) {
            console.log(idx);
            this.selectedExtras.splice(idx, 1);
        }
        if (!event || event.checked) {

            this.selectedExtras.push(extOption);
            this.radioData[parentId] = option;
        }
        this.selectedExtras.map(item => total += item.price);
        this.grandTotal = (this.grandTotal + total) - prevTotal;
    }

    onSubmit() {
        const required = this.product.extras.filter((option, parentId) => this.needsValidation(parentId) && option);
        const [errors] = required.map(item => this.selectedExtras.filter(i => i.parentId === item.id).length > 0);
        this.hasErrors = (this.selectedExtras.length === 0 || !errors);
        if (!this.hasErrors) {
            this.onClose({grandTotal: this.grandTotal, product: this.product, productItems: this.itemCount, extras: this.selectedExtras});
        }
    }

    ngOnInit() {
        this.productsService.getProductsData()
            .then(result => {
                const {product: {id}} = this.data;
                this.product = result.find(item => item.id === id);
                this.grandTotal = this.product.price;
            })
            .catch(error => console.log('Error Getting Data: ', error));
    }
}
