package com.info5059.casestudy.purchaseorder;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.io.image.ImageDataFactory;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.web.servlet.view.document.AbstractPdfView;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.net.URL;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.info5059.casestudy.product.Product;
import com.info5059.casestudy.product.ProductRepository;
import com.info5059.casestudy.vendor.Vendor;
import com.info5059.casestudy.vendor.VendorRepository;

public class PurchaseOrderPDFGenerator {

  public static ByteArrayInputStream generatePurchaseOrderPDF(String poID,
      VendorRepository vendorRepository,
      ProductRepository productRepository,
      PurchaseOrderRepository purchaseOrderRepository)
      throws IOException {

    URL companyLogoURL = PurchaseOrderPDFGenerator.class.getResource("/static/images/polite.png");

    ByteArrayOutputStream baos = new ByteArrayOutputStream();

    PdfWriter writer = new PdfWriter(baos);
    // initialize pdf document to be written to stream
    PdfDocument pdf = new PdfDocument(writer);
    // document is the main object
    Document document = new Document(pdf);

    PdfFont font = null;
    try {
      font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
    } catch (IOException e) {
      throw e;
    }

    PageSize pg = PageSize.A4;
    Image img = new Image(ImageDataFactory.create(companyLogoURL))
        .scaleAbsolute(100, 100)
        .setFixedPosition(pg.getWidth() / 2 - 60, 735);
    document.add(img);

    // add heading
    document.add(new Paragraph("\n\n\n"));
    Locale locale = new Locale("en", "US");
    NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);

    try {
      document.add(new Paragraph("\n"));
      Optional<PurchaseOrder> optPurchaseOrder = purchaseOrderRepository.findById(Long.parseLong(poID));

      if (optPurchaseOrder.isPresent()) {
        PurchaseOrder purchaseorder = optPurchaseOrder.get();

        document.add(new Paragraph("Purchase Order\n# " + poID)
            .setFont(font)
            .setFontSize(18)
            .setBold()
            .setMarginRight(pg.getWidth() / 2 - 75)
            .setMarginTop(-10)
            .setTextAlignment(TextAlignment.RIGHT));

        document.add(new Paragraph("\n\n"));

        Optional<Vendor> optVendor = vendorRepository.findById(purchaseorder.getVendorid());
        if (optVendor.isPresent()) {
          Vendor vendor = optVendor.get();
          Paragraph para = new Paragraph("Vendor:\n"
              + vendor.getName()
              + " - " + vendor.getEmail()).setBold();
          document.add(para);
        }

        document.add(new Paragraph("\n\n"));

        // make columns for table
        String[] columnHeaders = { "Product Code", "Description", "Qty Sold", "Price", "Ext. Price" };
        int numColumns = columnHeaders.length;

        // declare table
        Table table = new Table(numColumns);
        table.setWidth(new UnitValue(UnitValue.PERCENT, 100));

        // write headers
        for (int i = 0; i < numColumns; i++) {
          Cell cell = new Cell().add(new Paragraph(columnHeaders[i])
              .setFont(font)
              .setFontSize(12)
              .setBold())
              .setTextAlignment(TextAlignment.CENTER);

          table.addCell(cell);
        }

        Set<PurchaseOrderLineItem> items = purchaseorder.getItems();

        Cell errorCell = new Cell().add(new Paragraph("Error getting data")
            .setFont(font)
            .setFontSize(12))
            .setTextAlignment(TextAlignment.CENTER);

        BigDecimal subtotal = new BigDecimal(0);
        BigDecimal tax = new BigDecimal(0);
        BigDecimal total = new BigDecimal(0);

        for (PurchaseOrderLineItem item : items) {
          // Product stuff
          Product product = productRepository.getReferenceById(item.getProductid());
          if (product != null) {

            // do subtotal, tax, total calc
            BigDecimal temp = new BigDecimal(0);
            temp = temp.add(product.getMsrp());
            temp = temp.multiply(new BigDecimal(item.getQty()));
            subtotal = subtotal.add(temp);

            // Product.Id
            Cell cell = new Cell().add(new Paragraph(Long.toString(item.getId()))
                .setFont(font)
                .setFontSize(12))
                .setTextAlignment(TextAlignment.CENTER);

            table.addCell(cell);

            // Product.description
            cell = new Cell().add(new Paragraph(product.getName())
                .setFont(font)
                .setFontSize(12))
                .setTextAlignment(TextAlignment.CENTER);

            table.addCell(cell);

            // item.qty
            cell = new Cell().add(new Paragraph(Integer.toString(item.getQty()))
                .setFont(font)
                .setFontSize(12))
                .setTextAlignment(TextAlignment.CENTER);

            table.addCell(cell);

            // Product.msrp
            cell = new Cell().add(new Paragraph(formatter.format(product.getMsrp()))
                .setFont(font)
                .setFontSize(12))
                .setTextAlignment(TextAlignment.CENTER);

            table.addCell(cell);

            // extended
            BigDecimal extended = product.getMsrp();
            extended = extended.multiply(new BigDecimal(item.getQty()));

            cell = new Cell().add(new Paragraph(formatter.format(extended))
                .setFont(font)
                .setFontSize(12))
                .setTextAlignment(TextAlignment.CENTER);

            table.addCell(cell);

          } else {
            table.addCell(errorCell);
            table.addCell(errorCell);
            table.addCell(errorCell);
            table.addCell(errorCell);
            table.addCell(errorCell);
          }
        }
        // subtotal text and value
        Cell cell = new Cell(1, 4).add(new Paragraph("Sub Total:"))
            .setBorder(Border.NO_BORDER)
            .setTextAlignment(TextAlignment.RIGHT);
        table.addCell(cell);
        cell = new Cell().add(new Paragraph(formatter.format(subtotal)))
            .setTextAlignment(TextAlignment.RIGHT)
            .setBackgroundColor(ColorConstants.YELLOW);
        table.addCell(cell);

        // tax amount text and value
        cell = new Cell(1, 4).add(new Paragraph("Tax Total:"))
            .setBorder(Border.NO_BORDER)
            .setTextAlignment(TextAlignment.RIGHT);
        table.addCell(cell);
        tax = subtotal.multiply(new BigDecimal(0.13));
        cell = new Cell().add(new Paragraph(formatter.format(tax)))
            .setTextAlignment(TextAlignment.RIGHT)
            .setBackgroundColor(ColorConstants.YELLOW);
        table.addCell(cell);

        // po total text and value
        cell = new Cell(1, 4).add(new Paragraph("PO Total:"))
            .setBorder(Border.NO_BORDER)
            .setTextAlignment(TextAlignment.RIGHT);
        table.addCell(cell);
        total = subtotal.add(tax);
        cell = new Cell().add(new Paragraph(formatter.format(total)))
            .setTextAlignment(TextAlignment.RIGHT)
            .setBackgroundColor(ColorConstants.YELLOW);
        table.addCell(cell);

        // finally, add the table to the doc, with some whitespace at the end
        document.add(table);
        document.add(new Paragraph("\n\n\n"));

        // add a timestamp to the bottom of the document
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd h:mm a ");
        document.add(new Paragraph(dateTimeFormatter.format(LocalDateTime.now())))
            .setTextAlignment(TextAlignment.CENTER);

        // finally, close the document
        document.close();
      }
    } catch (Exception e) {
      System.out.println(e);
    }

    return new ByteArrayInputStream(baos.toByteArray());
  }

}
