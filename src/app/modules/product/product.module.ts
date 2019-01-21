import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductRoutingModule } from './product.routing.module';
import { ListComponent } from './components/product-list/list.component';
import { DetailComponent } from './components/product-detail/detail.component';
import { FormComponent } from './components/product-form/form.component';

import { ProductService } from './product.service';
import { MatTableModule, MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatPaginatorModule, MatSnackBarModule, MatIconModule, MatTooltipModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		ListComponent,
		DetailComponent, FormComponent 
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		FormsModule,
		MatInputModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ProductRoutingModule,
		HttpClientModule,
		MatDialogModule,
		MatTableModule,
		MatPaginatorModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatSelectModule,
		MatSnackBarModule,
		ReactiveFormsModule	
	],
	exports: [
		ListComponent
	],
	providers: [ ProductService ]
})
export class ProductModule { }
