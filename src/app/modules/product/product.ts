import { Category } from '../../core/models/category';

export class Product {
    ProductId: number;
    Name: string;
    Description?: string;
    Url?: string;
    CategoryIds?: number[];
    Categories?: Category[];
}