import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app-routing.module';
// Components
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductDialogComponent} from './components/product-dialog/product-dialog.component';
// Services
import {ProductsService} from './services/productsService';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductDialogComponent,
    ],
    entryComponents: [AppComponent, ProductListComponent, ProductDialogComponent],
    providers: [
        ProductsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
