import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatRadioModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatRadioModule
    ]
})
export class MaterialModule {
}
