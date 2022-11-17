This work comprises a case study full-stack application featuring a Java Spring Boot server, and an Angular-based client. 

Jar comprising these two projects is supplied but can be built fully from source as follows:

- in the client folder, run `npm install`
- in the client folder, run `ng build`
- take all files from the `dist\clientcasestudy` folder and place into `assets/static` folder in server
- in the server folder, run `mvn package`
- the resulting jar in the `target` folder should be executable. run it and point a browser to `localhost:8080`
- enjoy!

The idea of the application is a basic vendor procurement system that allows a vendor to maintain a database of products, including full CRUD operations on products and vendors. You can create a purchase order, and view the order as a pdf with my PDF generator. The application also supports QR codes for products (try adding a link to the qr code text of a product, saving, then going back into that product to see the QR code). The database will wipe itself and reinitiate a static set of data every time the jar is run, so new data added during a session will not persist. 

At different points I have hosted this jar on an Amazon EC2 instance, but I cannot justify keeping this instance running 24/7. Nonetheless it can be booted up on-demand. 

If you have any questions or like what you see, don't hesitate to reach out. 
