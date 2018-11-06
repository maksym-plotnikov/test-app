import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Product, SelectedProduct} from '../../models/Product.model';
import {ExtendedProductExtrasItem} from '../../models/ProductExtras.model';

@Component({
    selector: 'app-product-dialog-component',
    templateUrl: './product-dialog.component.html'
})

export class ProductDialogComponent {
    hasErrors = false;
    public itemCount = 1;
    public grandTotal = 0;
    public selectedExtras: ExtendedProductExtrasItem[] = [];
    public radioData = {};

    constructor(
        public router: Router,
        public dialogRef: MatDialogRef<ProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public product: Product) {
        this.grandTotal = this.product.price;
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

    needsValidation(option) {
        return option.min > 0;
    }

    needsReset(option) {
        return option.min === 0 && option.max <= 1;
    }

    needsMultipeOptions(option) {
        return option.max > 1;
    }

    resetFieldGroup(parentId) {
        this.onChange(parentId, {}, null, true);

    }

    onClose(data = null): void {
        this.dialogRef.close(data);
    }

    onChange(parentId, option, event = null, reset = false): void {
        this.hasErrors = false;
        let prevTotal = 0;
        let total = 0;
        this.selectedExtras.map(item => prevTotal += item.price);
        const idx = !event
            ? this.selectedExtras.findIndex(item => (item.parentId === parentId || item.name === option.name))
            : this.selectedExtras.findIndex(item => item.name === option.name);
        if (idx >= 0) {
            this.selectedExtras.splice(idx, 1);
            if (reset) {
                delete this.radioData[parentId];
            }
        }
        if (!reset) {
            if (event == null || event.checked) {
                this.selectedExtras.push({parentId, ...option} as ExtendedProductExtrasItem);
                this.radioData[parentId] = option;
            }
        }
        this.selectedExtras.map(item => total += item.price);
        this.grandTotal = (this.grandTotal + total) - prevTotal;
    }

    onSubmit() {
        const required = this.product.extras.filter((option) => this.needsValidation(option));
        const [errors] = required.map(item => this.selectedExtras.filter(i => i.parentId === item.id).length > 0);
        this.hasErrors = (this.selectedExtras.length === 0 || !errors);
        if (!this.hasErrors) {
            this.onClose({grandTotal: this.grandTotal, product: this.product, productItems: this.itemCount, extras: this.selectedExtras});
        }
    }
}
