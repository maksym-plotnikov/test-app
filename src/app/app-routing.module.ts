import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductItemComponent} from './components/product-item/product-item.component';

const routes: Routes = [
    {
        path: 'products', component: ProductListComponent,
        children: [
            {
                path: ':id',
                component: ProductItemComponent
            },
        ]


    },
    {path: '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
