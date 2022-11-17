package com.info5059.casestudy.purchaseorder;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Data
@RequiredArgsConstructor
public class PurchaseOrder {
  // PurchaseOrder private members
  @Id
  @GeneratedValue
  private Long Id;
  private Long vendorid;
  private BigDecimal amount;
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDateTime podate;
  @OneToMany(mappedBy = "poid", fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  private Set<PurchaseOrderLineItem> items = new HashSet<>();
  // private List<PurchaseOrderLineItem> items = new
  // ArrayList<PurchaseOrderLineItem>();

}
