import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { SupplyAddComponent } from './supply-add/supply-add.component';
import { ListSupplyComponent } from './list-supply/list-supply.component';



@NgModule({
  declarations: [
    AppComponent,
    SupplyAddComponent,
    ListSupplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
