import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ProductService } from '../../product.service';
import { Category } from 'src/app/core/models/category';
import { Product } from '../../product';
import { CategoryService } from 'src/app/core/services/category.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	productFormGroup: FormGroup;
	categories: Category[];
	productId: number;
	product: Product;
	title: string;

	constructor(private productService: ProductService, private formBuilder: FormBuilder, private categoryService: CategoryService,
		public dialogRef: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data, private router: Router) { }

	ngOnInit() {
		this.categoryService.getCategories().subscribe(data => {
			this.categories = data;
		})

		this.initForm();

		if (this.data) {
			this.title = 'Edit';
			this.productId = this.data.ProductId;
			this.productService.getProduct(this.productId)
				.subscribe(data => {
					this.product = data;
					this.setFormValues();
				})
		}

		else {
			this.title = 'Add';
		}
	}

	initForm() {
		const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
		this.productFormGroup = this.formBuilder.group({
			Name: ['', Validators.required],
			Categories: [''],
			Description: [''],
			Url: ['', Validators.pattern(urlReg)],
		});
	}

	setFormValues() {
		this.productFormGroup.controls.Name.setValue(this.product.Name);
		this.productFormGroup.controls.Categories.setValue(this.product.Categories);
		this.productFormGroup.controls.Description.setValue(this.product.Description);
		this.productFormGroup.controls.Url.setValue(this.product.Url);
	}

	compareFn(c1: Category, c2: Category): boolean {
		return c1 && c2 ? c1.CategoryId === c2.CategoryId : c1 === c2;
	}

	saveForm() {
		const product = this.productFormGroup.value as Product;
		const categoryIds = [];

		if (product.Categories.length) {
			product.Categories.forEach(function (category) {
				categoryIds.push(category.CategoryId);
			});
			product.CategoryIds = categoryIds;
		}


		if (this.productId) {
			product.ProductId = this.productId;
			this.productService.updateProduct(product).subscribe(() => {
				this.router.navigate(['/product/list']);
			});
		}

		else {
			this.productService.addProduct(product).subscribe(() => {
				this.router.navigate(['/product/list']);
			});
		}

		this.dialogRef.close(product);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}
