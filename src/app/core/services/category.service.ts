import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Category } from '../models/category';

@Injectable({
	providedIn: 'root'
})
export class CategoryService extends BaseService {

	constructor(private httpClient: HttpClient) {
		super();
	}

	getCategories() {
		return this.httpClient.get<Category[]>(`${this.api}/Categories`);
	}

}
