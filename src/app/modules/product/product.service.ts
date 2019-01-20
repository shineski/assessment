import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from './product';
import { BaseService } from '../../core/services/base.service';

@Injectable({
	providedIn: 'root'
})
export class ProductService extends BaseService {

	constructor(private httpClient: HttpClient) {
		super();
	}

	public getAllProducts(): Observable<Product[]> {
		return this.httpClient.get<Product[]>(`${this.api}/Products`);
	}

	public getProduct(productId: number): Observable<Product> {
		return this.httpClient.get<Product>(`${this.api}/Products/${productId}`)
	}

	public addProduct(product: Product): Observable<Product> {
		return this.httpClient.post<Product>(`${this.api}/Products`, product, this.httpOptions);
	}

	public updateProduct(product: Product): Observable<Product> {
		return this.httpClient.put<Product>(`${this.api}/Products/${product.ProductId}`, product, this.httpOptions);
	}
}
