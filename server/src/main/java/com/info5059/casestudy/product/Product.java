package com.info5059.casestudy.product;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class Product {
  @Id
  private String id;
  private int vendorid;
  private String name;
  private BigDecimal costprice;
  private BigDecimal msrp;
  private int rop;
  private int eoq;
  private int qoh;
  private int qoo;

  @Lob
  private byte[] qrcode;
  private String qrcodetxt;
}
