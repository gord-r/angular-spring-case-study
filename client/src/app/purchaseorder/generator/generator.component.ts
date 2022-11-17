import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Vendor } from '@app/vendor/vendor';
import { Product } from '@app/product/product';
import { PurchaseOrderLineItem } from '@app/purchaseorder/purchaseorderlineitem';
import { PurchaseOrder } from '@app/purchaseorder/purchaseorder';
import { VendorService } from '@app/vendor/vendor.service';
import { ProductService } from '@app/product/product.service';
import { PurchaseOrderService } from '@app/purchaseorder/purchaseorder.service';
import { PDFURL } from '@app/constants';


@Component({
  templateUrl: './generator.component.html',
})
export class GeneratorComponent implements OnInit, OnDestroy {
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  productid: FormControl;

  // data
  formSubscription?: Subscription;
  products$?: Observable<Product[]>; // everybody's products
  vendors$?: Observable<Vendor[]>; // all vendors
  vendorproducts$?: Observable<Product[]>; // all products for a particular vendor
  items: Array<PurchaseOrderLineItem>; // product items that will be in purchaseorder
  selectedproducts: Product[]; // products that being displayed currently in app
  selectedProduct: Product; // the current selected product
  selectedVendor: Vendor; // the current selected vendor
  selectedQty: FormControl;
  useEOQ: boolean;

  // misc
  pickedProduct: boolean;
  pickedVendor: boolean;
  pickedQty: boolean;
  generated: boolean;
  hasProducts: boolean;
  msg: string;
  subtotal: number;
  tax: number;
  total: number;
  purchaseorderno: number = 0;


  constructor(
    private builder: FormBuilder,
    private vendorService: VendorService,
    private productService: ProductService,
    private purchaseorderService: PurchaseOrderService
  ) {
    this.pickedVendor = false;
    this.pickedProduct = false;
    this.pickedQty = false;
    this.generated = false;
    this.msg = '';
    this.vendorid = new FormControl('');
    this.productid = new FormControl('');
    this.selectedQty = new FormControl('');
    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,
      selectedQty: this.selectedQty
    });
    this.selectedProduct = {
      id: '',
      vendorid: -1,
      name: '',
      costprice: 0,
      msrp: 0,
      rop: 0,
      eoq: 0,
      qoh: 0,
      qoo: 0,
      qrcode: '',
      qrcodetxt: '',
    };
    this.selectedVendor = {
      id: 0,
      name: '',
      address1: '',
      city: '',
      province: '',
      postalcode: '',
      phone: '',
      type: '',
      email: '',
    };
    this.items = new Array<PurchaseOrderLineItem>();
    this.selectedproducts = new Array<Product>();

    this.hasProducts = false;
    this.subtotal = 0.0;
    this.tax = 0.0;
    this.total = 0.0;
    this.useEOQ = false;
  } // constructor


  ngOnInit(): void {
    this.onPickVendor();
    this.onPickProduct();
    this.onPickQuantity();
    this.msg = 'loading vendors and products from server...';
    (this.vendors$ = this.vendorService.get()),
      catchError((err) => (this.msg = err.message));
    (this.products$ = this.productService.get()),
      catchError((err) => (this.msg = err.message));
    this.msg = 'server data loaded';
    this.pickedProduct = false;
  } // ngOnInit


  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  } // ngOnDestroy


  /**
  * onPickVendor - Another way to use Observables, subscribe to the select change event
  * then load specific vendor products for subsequent selection
  */
  onPickVendor(): void {
    this.formSubscription = this.generatorForm
      .get('vendorid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = {
          id: '',
          vendorid: -1,
          name: '',
          costprice: 0,
          msrp: 0,
          rop: 0,
          eoq: 0,
          qoh: 0,
          qoo: 0,
          qrcode: '',
          qrcodetxt: '',
        };
        this.selectedVendor = val;
        this.loadVendorProducts();
        this.pickedProduct = false;
        this.pickedQty = false;
        this.hasProducts = false;
        this.msg = 'choose product for vendor';
        this.pickedVendor = true;
        this.generated = false;
        this.items = []; // array for the purchaseorder
        this.selectedproducts = []; // array for the details in app html
      });
  } // onPickVendor


  /**
  * onPickProduct - subscribe to the select change event then
  * update array containing items.
  */
  onPickProduct(): void {

    const productSubscription = this.generatorForm
      .get('productid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = val;
        // const item: PurchaseOrderLineItem = {
        //   id: 0,
        //   poid: 0,
        //   price: this.selectedProduct?.msrp,
        //   productid: this.selectedProduct?.id,
        //   qty: 0
        // };

        // let i = this.items.find((item) => item.productid === this.selectedProduct?.id);

        // if (i == undefined) {
        //   this.items.push(item);
        //   this.selectedproducts.push(this.selectedProduct);
        // }
        // else {
        //   i.qty++;
        // }

        // // if (this.items.length > 0) {
        // //   this.hasProducts = true;
        // // }
        // this.subtotal = 0.0;
        // this.selectedproducts.forEach((exp) => (this.subtotal += exp.msrp));
        this.pickedProduct = true;
      });
    this.formSubscription?.add(productSubscription); // add it as a child, so all can be destroyed together
    //this.pickedProduct = true;
  } // onPickProduct


  /**
   * onPickQuantity
   */
  onPickQuantity(): void {
    const qtySubscription = this.generatorForm
      .get('selectedQty')
      ?.valueChanges.subscribe((val) => {
        // this.selectedProduct = val;
        const item: PurchaseOrderLineItem = {
          id: 0,
          poid: 0,
          price: this.selectedProduct?.msrp,
          productid: this.selectedProduct?.id,
          qty: val === "EOQ" ? this.selectedProduct?.eoq : val
        };

        let i = this.items.find((item) => item.productid === this.selectedProduct?.id);

        if (i == undefined) {
          this.items.push(item);
          this.selectedproducts.push(this.selectedProduct);
        }
        else {
          i.qty = this.selectedQty.value;
        }

        if (this.items.length > 0) {
          this.hasProducts = true;
        }
        this.subtotal = 0.0;
        this.items.forEach((item) => (this.subtotal += item.price * item.qty));
        this.tax = this.subtotal * 0.13;
        this.total = this.subtotal + this.tax;
        this.pickedQty = true;
      });
    this.formSubscription?.add(qtySubscription); // add it as a child, so all can be destroyed together
  }

  /**
   * onRemove
   */
  removeProduct(itemToRemove: PurchaseOrderLineItem): void {
    this.items.forEach((item, index) => {
      if (item.productid === itemToRemove.productid) {
        let itemSubtotal = itemToRemove.price * itemToRemove.qty;
        this.subtotal -= itemSubtotal;
        this.tax -= itemSubtotal * 0.13;
        this.total -= itemSubtotal * 1.13;
        this.items.splice(index, 1);
      }
    });

    if (this.items.length == 0) {
      this.hasProducts = false;
    }
  }

  addProduct(eoq: boolean = false): void {

  }

  /**
  * loadVendorProducts - filter for a particular vendor's products
  */
  loadVendorProducts(): void {
    this.vendorproducts$ = this.products$?.pipe(
      map((products) =>
        // map each product in the array and check whether or not it belongs to selected vendor
        products.filter(
          (product) => product.vendorid === this.selectedVendor?.id
        )
      )
    );
  } // loadVendorProducts


  /**
  * createPurchaseOrder - create the client side purchaseorder
  */
  createPurchaseOrder(): void {
    this.generated = false;
    const purchaseorder: PurchaseOrder = {
      id: 0,
      vendorid: this.selectedProduct.vendorid,
      amount: this.total,
      // podate: 0,
      items: this.items,
    };
    this.purchaseorderService.add(purchaseorder).subscribe({
      // observer object
      next: (purchaseorder: PurchaseOrder) => {
        // server should be returning purchaseorder with new id
        purchaseorder.id > 0
          ? (this.msg = `PurchaseOrder ${purchaseorder.id} added!`)
          : (this.msg = 'PurchaseOrder not added! - server error');
        this.purchaseorderno = purchaseorder.id;
      },
      error: (err: Error) => (this.msg = `PurchaseOrder not added! - ${err.message}`),
      complete: () => {
        this.hasProducts = false;
        this.pickedVendor = false;
        this.pickedProduct = false;
        this.generated = true;
      },
    });
  } // createPurchaseOrder

  viewPdf(): void {
    window.open(`${PDFURL}${this.purchaseorderno}`, '');
  } // viewPdf

} // GeneratorComponent
