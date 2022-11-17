package com.info5059.casestudy.purchaseorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.info5059.casestudy.product.ProductRepository;

@CrossOrigin
@RestController
public class PurchaseOrderController {
  @Autowired
  private PurchaseOrderDAO purchaseOrderDAO;

  @Autowired
  private PurchaseOrderRepository poRepository;
  // @Autowired
  // private ProductRepository productRepository;

  @PostMapping("/api/purchaseorders")
  public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder clientrep) { // use RequestBody here
    return new ResponseEntity<PurchaseOrder>(purchaseOrderDAO.create(clientrep), HttpStatus.OK);
  }

  @GetMapping("/api/purchaseorders")
  public ResponseEntity<Iterable<PurchaseOrder>> findAll() {
    Iterable<PurchaseOrder> pos = poRepository.findAll();
    return new ResponseEntity<Iterable<PurchaseOrder>>(pos, HttpStatus.OK);
  }

}
