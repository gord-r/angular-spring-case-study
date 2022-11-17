import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/generic-http.service';
import { PurchaseOrder } from './purchaseorder';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends GenericHttpService<PurchaseOrder>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `purchaseorders`);
  }
}
