package com.info5059.casestudy.product;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface ProductRepository extends JpaRepository<Product, Long> {
  @Modifying
  @Transactional
  @Query("delete from Product where id = ?1")
  int deleteOne(String productid); // string product id here

  Product getReferenceById(String productid);

  // @Modifying
  // @Transactional
  // @Query("select from Product where id = ?1")
  // Product findByProductID(String productid);
}
