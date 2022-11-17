import { PurchaseOrderLineItem } from "./purchaseorderlineitem";

export interface PurchaseOrder {
  id: number;
  vendorid: number;
  amount: number;
  // podate: number;
  items: PurchaseOrderLineItem[];
}
