import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/generic-http.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends GenericHttpService<Product> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `products`);
  } // constructor
}
