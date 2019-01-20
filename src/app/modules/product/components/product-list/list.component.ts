import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from "@angular/material";


import { ProductService } from '../../product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { Product } from '../../product';
import { FormComponent } from '../product-form/form.component';
import { DetailComponent } from '../product-detail/detail.component';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	products = new MatTableDataSource<Product>();
	displayedColumns: string[] = ['Name', 'Description', 'Action'];
	@ViewChild(MatPaginator) paginator: MatPaginator;


	constructor(private productService: ProductService, private categoryService: CategoryService, public dialog: MatDialog) { }

	ngOnInit() {
		this.getAllProducts();
	}

	getAllProducts() {
		this.productService.getAllProducts().subscribe(
			data => {
				this.products.data = data
				this.products.paginator = this.paginator;
			}
		);
	}

	applyFilter(filterValue: string) {
		this.products.filter = filterValue.trim().toLowerCase();
	}

	openFormDialog(data): void {
		const dialogRef = this.dialog.open(FormComponent, {
			width: '800px',
			data: data
		});

		dialogRef.afterClosed().subscribe( data => {
			let editAction = false;
			if (data) {
				this.products.data.forEach(function (product) {
					if(product.ProductId === data.ProductId ) {
						editAction = true;
						product.Name = data.Name;
						product.Description = data.Description;
					}
				});				
			}

			// only make API call to refresh table data source when adding new row.
			if (!editAction) {
				this.productService.getAllProducts().subscribe( data => {
					this.products = new MatTableDataSource(data);
					this.products.paginator = this.paginator;
				})
			}			
		});
	}

	productDetails(el: Product)  {
		this.productService.getProduct(el.ProductId).subscribe( data => {
			this.openDetailsDialog(data);
		})
	}
	
	editProduct(el: Product) {
		this.openFormDialog(el);
	}

	addProduct() {
		this.openFormDialog(null);
	}

	openDetailsDialog(product: Product){
		this.dialog.open( DetailComponent,  {
			width: '600px',
			data: product			
		});
	}

}
