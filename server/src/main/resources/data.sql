INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)VALUES ('123 Maple
St','London','On', 'N1N-1N1','(555)555-5555','Trusted','ABC Supply Co.','abc@supply.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('543
Sycamore Ave','Toronto','On', 'N1P-1N1','(999)555-5555','Trusted','Big Bills
Depot','bb@depot.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak
St','London','On', 'N1N-1N1','(555)555-5599','Untrusted','Shady Sams','ss@underthetable.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('480 Queens Ave',
'London','On', 'N6P-1Y2','(555)555-5599','Untrusted','Gordon Reaman Fish and Chips','gr@chippy.com');

INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( '4A3AK24FX6E028812', 1, 'Tire Iron', 40.00, 59.99, 3, 15, 5, 0);
INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( '2G1AN35J4C1202219', 1, 'Socket wrench, 10mm', 10.00, 29.99, 5, 25, 7, 0);
INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( 'JT2SV12E8G0417278', 1, 'Pneumatic Drill', 101.29, 259.99, 1, 5, 1, 5);

INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( '1G4GD5EDXBF330171', 2, '20V Water Pump', 50.19, 61.29, 4, 20, 4, 0);
INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( 'JF1BJ6532NK903473', 2, 'PVC Hose', 0.50, 2.50, 50, 500, 25, 500);
INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( '5XYKT4A64CG224929', 2, 'Shut-off valve', 4.50, 9.99, 10, 30, 11, 0);

INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( 'JH4DA9350MS000938', 3, 'Hole Saw, 30mm', 101.29, 259.99, 1, 5, 1, 5);
INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( '5T4KP41Y923355338', 3, 'Lateral flow regulator', 90.19, 110.00, 2, 5, 3, 3);
INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( 'WAUHGAFC6DN030356', 3, '13000 kW Generator', 15000.00, 18000.00, 1, 1, 1, 2);

INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( 'JH4CC2560PC005719', 4, 'Makita Drill', 101.29, 259.99, 1, 5, 1, 5);
INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( '1FTSW2BR5AEA23373', 4, '100 piece bit set', 50.29, 79.99, 5, 10, 4, 10);
INSERT INTO Product (id, vendorid, name, costprice, msrp, rop, eoq, qoh, qoo) VALUES
( '3N1BC11E79L484011', 4, 'Reciprocating saw', 150.29, 170.99, 5, 10, 4, 10);