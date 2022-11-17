package com.info5059.casestudy.purchaseorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.info5059.casestudy.product.Product;
import com.info5059.casestudy.product.ProductRepository;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class PurchaseOrderDAO {
  @PersistenceContext
  private EntityManager entityManager;

  @Autowired
  private ProductRepository productRepository;

  @Transactional
  public PurchaseOrder create(PurchaseOrder clientrep) {

    PurchaseOrder realPO = new PurchaseOrder();
    realPO.setPodate(LocalDateTime.now());
    realPO.setVendorid(clientrep.getVendorid());
    realPO.setAmount(clientrep.getAmount());
    // realPO.setItems(clientrep.getItems());
    entityManager.persist(realPO);

    for (PurchaseOrderLineItem item : clientrep.getItems()) {
      PurchaseOrderLineItem realItem = new PurchaseOrderLineItem();
      realItem.setPoid(realPO.getId());
      realItem.setProductid(item.getProductid());
      realItem.setQty(item.getQty());
      realItem.setPrice(item.getPrice());
      entityManager.persist(realItem);

      Product product = productRepository.getReferenceById(item.getProductid());
      if (product != null) {
        product.setQoo(product.getQoo() + item.getQty());
        productRepository.saveAndFlush(product);
      }

    }

    entityManager.refresh(realPO); // refresh commits
    return realPO;
  }
}