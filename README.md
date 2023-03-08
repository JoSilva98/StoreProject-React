# Store Project - React

### SUMMARY

The Front-End implementation of the E-Commerce type of store made with React. 
Created with the purpose of giving it's users the ability to search, add to wish list/shopping cart, rate and buy desired products, ranging from clothing to jewelry. The Back-End consists in Java Spring Boot which provides two roles (User and Admin) and filters to filter the search.

<br />

***

### API LINKS
Path should be specific to localhost or to: https://store-project-production.up.railway.app

<br />

***

### IMPLEMENTATIONS
* React.js
* Router DOM
* Context API
* React hooks
* Fetch API
* Figma software (for simple design planning)

<br />

***

### USERS PAGES
Bellow are the pages to which the users (logged in or not) have access.

#### HOME PAGE
The ***Home Page*** contains a ***Header*** which allows the user to navigate back to the ***Home Page***, search products via ***Search Bar***, navigate to the ***Login***/***Register***, ***Wish List*** and ***Shopping Cart*** pages.
It also contains two buttons in the main element which allows the user navigating to the Products Page and to the Products Page filtered by jewelery category.

![Home Page](https://user-images.githubusercontent.com/103672052/223599194-a4a6e53f-54bd-4265-a65b-c2f7ce70c8de.png)

<br />

***

#### LOGIN / REGISTER
Both ***Login*** and ***Register*** consist in a form which allows the user to log in their account and create and account, respectively.
The ***Login*** informations, along with the ***Shopping Cart*** and the ***Wish List***, are encrypted and stored on the browser's *Local Storage*.
If, for some reason, you want to decrypt them, you need to use the CryptoJS library and the secret keys stored in the ***secretKeys.js***.

![Login](https://user-images.githubusercontent.com/103672052/223601052-ff53def3-5223-4b62-a75c-3b658add7c35.png)

![Register](https://user-images.githubusercontent.com/103672052/223599507-9cc0e168-c512-4559-8f59-38d3a176a784.png)

<br />

***

#### ACCOUNT PAGE
To have access to this page the user must be logged in. It's accessed by clicking on the same icon that redirects to the ***Login*** page. Here, the user can see he's profile and update it.
If a unlogged user tries to access the account page by pasting the link on the browser (pasting */account* on the url) the user is redirected to the ***Home Page***.

![Account](https://user-images.githubusercontent.com/103672052/223599681-34545124-9270-41df-b66f-b6b9aa5589db.png)

![Profile](https://user-images.githubusercontent.com/103672052/223600607-39d49a70-a8ff-487e-be0b-e6a26e7eefad.png)

![Update Profile](https://user-images.githubusercontent.com/103672052/223600622-9795c8eb-f21e-4448-ab40-d0837525a96f.png)

<br />

***

#### PRODUCTS PAGE
This page contains all the products available in the store. Here, the user can add products to the ***Wish List***, by clicking on the heart image, and filter products to find the product they desire quickly.

#### Filters
The filters have a ***Sort by*** and a ***Filter by*** section. Both can be combined but the user can only use a filter at once.
The ***Sort by*** section contain an ***ASC*** and ***DESC*** options (acts diferently depending on the filter that's being combined with)
The ***Filter by*** section have three filters: ***Category***, ***Rate*** and ***Price***.

* **Filter by Category:** Allows the user to filter the products by category. When combined with ***Sort by***, ***ASC*** and ***DESC*** options sort the products by alphabetical order.

![Category Filter](https://user-images.githubusercontent.com/103672052/223599758-255301f5-6c2c-469e-8892-117dc84ccbd0.png)

<br />

* **Filter by Rate:** Allows the user to filter the products by rate. When combined with ***Sort by***, ***ASC*** and ***DESC*** options sort the products by it's rate.

![Rate Filter](https://user-images.githubusercontent.com/103672052/223599795-68339058-0e41-44ed-9753-ad9ec9aaa41b.png)

<br />

* **Filter by Price:** Allows the user to filter the products by price. When combined with ***Sort by***, ***ASC*** and ***DESC*** options sort the products by it's price.

![Price Filter](https://user-images.githubusercontent.com/103672052/223599824-531fc56a-5209-4aa8-9119-60a9d1df5bc8.png)

<br />

#### Search Bar
The ***Search Bar*** is the element that can be used from any part of the website. By writing something on it, it's displayed a list of products where the product's title, description, category or price matches the text entered in the ***Search Bar***. By clicking on the product, the user is redirected to the page of that single product. By clicking *Enter*, the user is redirected to the ***Products Page*** with all the products that match the entered text on the ***Search Bar***.
The ***Search Bar*** can also be combined with the ***Filters***. To do so, the user should select a ***Filter*** first, then write something on the ***Search Bar*** and pressing *Enter* at the end.

![Search Bar](https://user-images.githubusercontent.com/103672052/223599867-ba4b6bd4-18d1-4bbc-8f12-a3ff9e89637d.png)

<br />

***

#### PRODUCT DETAILS
This page allows the user to read the product details, add units of it to the ***Shopping Cart*** and, if the user is logged, allows the user to rate the product by clicking on the stars images.

![Product Details](https://user-images.githubusercontent.com/103672052/223599895-c9bcc3b4-136c-4a44-8cc1-c53f2852969e.png)

<br />

***

#### WISH LIST
This page allows the users to save their favorite products. Clicking on the product, the user is redirected to the ***Product Details*** page. The product can be removed from the list by clicking on the heart image.

![Wish List](https://user-images.githubusercontent.com/103672052/223599928-8e05a57e-3424-4a46-9966-fe5104e874df.png)

<br />

***

#### SHOPPING CART
This page allows the user to buy the products on the list. The checkout can be done by logging in or by filling a litle form.

![Shopping Cart Unlogged](https://user-images.githubusercontent.com/103672052/223599970-3d7f0382-9482-4a49-b364-1033dc62ff56.png)

![Shopping Cart Login](https://user-images.githubusercontent.com/103672052/223599993-9fadb8ca-5e9a-44a9-adef-3e067eb0c57d.png)

![Shopping Cart Logged In](https://user-images.githubusercontent.com/103672052/223600030-e470d416-dad1-4169-905a-6791a1f0c8ab.png)

<br />

***

### ADMIN PAGES
The admins have access to everything users have but with some extras. They just can't rate a product.
If a user tries to access any admin's page by pasting the link on the browser (for example, pasting */addproduct* on the url) the user is redirected to the ***Home Page***.

#### ACCOUNT PAGE
In this page, the admins have access to the users list, user's profile (by clicking on the user on the list) and can add a user to the Data Base. There is a ***Search Bar*** on the users list which allows the admin to search specific users by first name, last name, email, address and date of birth.

![Admin Account](https://user-images.githubusercontent.com/103672052/223600288-0f23bc17-b066-4a78-8a27-4140413a361a.png)

![User List](https://user-images.githubusercontent.com/103672052/223600322-02e567bb-9474-4188-b0d4-02bf58757fa1.png)

![Add User](https://user-images.githubusercontent.com/103672052/223600338-43c0e46c-0904-4cf4-986d-1544ddc9d61f.png)

<br />

***

#### PRODUCTS PAGE
The admins can add and delete products on this page. To add a product all the form fields must be filled.

![Admin Products](https://user-images.githubusercontent.com/103672052/223600366-0e1a6404-cee5-4c0e-ad98-dbe25c92d792.png)

![Admin Add Prod](https://user-images.githubusercontent.com/103672052/223600412-87de36d4-54f9-4318-a6ce-d7799b3116d0.png)

<br />

***

#### PRODUCT DETAILS
The admins can update a product from this page. The admin only needs to fill the field he wants.

![Admin Update Prod 1](https://user-images.githubusercontent.com/103672052/223600433-41735e2c-e17a-473a-9383-2acd0e77117e.png)

![Admin Update Prod 2](https://user-images.githubusercontent.com/103672052/223600445-d575579e-788f-4d73-9bf1-5aa4340d2956.png)

<br />

***

### A SHORT VIDEO DEMONSTRATION

#### UNLOOGED USER

<br />

Quick Overview:

https://user-images.githubusercontent.com/103672052/223594833-e1401ed7-9148-4e3c-9ee2-ea4d2b2f2184.mp4

<br />

Category Filter:

https://user-images.githubusercontent.com/103672052/223594852-40366faa-b502-4844-afe9-dd40487dc3d7.mp4

<br />

Rating and Price Filters:

https://user-images.githubusercontent.com/103672052/223594861-7367e5b4-579e-406d-8a1a-8ebd06a31edb.mp4

<br />

Product Details and Wish List:

https://user-images.githubusercontent.com/103672052/223594880-2d4efe9b-8493-4c89-8f1c-a31f3abe11d7.mp4

<br />

Search Bar:

https://user-images.githubusercontent.com/103672052/223594888-5865e127-d4c4-4b5f-864d-e5fe9b316c0d.mp4

<br />

Shopping Cart:

https://user-images.githubusercontent.com/103672052/223594893-30e2febe-de8c-4bf5-bd7b-6bf8b34a6321.mp4

<br />

Checkout:

https://user-images.githubusercontent.com/103672052/223594899-d63857c3-a10d-4dd1-9fa3-48288f237dc4.mp4

<br />

***

#### LOGGED IN USER

<br />

Register:

https://user-images.githubusercontent.com/103672052/223595366-c27fbaf8-50cc-4455-b622-ce192d126fb1.mp4

<br />

Profile and Update Profile:

https://user-images.githubusercontent.com/103672052/223595372-27be694c-219e-4a9b-b2b1-b4690192440f.mp4

<br />

Rating and Checkout:

https://user-images.githubusercontent.com/103672052/223595377-e62c0da2-6dd8-458f-b09b-6395b6acdada.mp4

<br />

***

#### ADMIN

<br />

Delete and Update Products:

https://user-images.githubusercontent.com/103672052/223595536-5817f664-646f-4246-ba2a-fb44cfc885d7.mp4

<br />

Add Product:

https://user-images.githubusercontent.com/103672052/223595550-e2ec2fbc-de8a-41a5-ad0a-97519836ff4b.mp4

<br />

User List:

https://user-images.githubusercontent.com/103672052/223595559-32f327b9-03cf-4b0f-bbea-852c740c1484.mp4

<br />

Add User:

https://user-images.githubusercontent.com/103672052/223595572-e247990e-0270-4977-b0a5-5d6dc00c149d.mp4

<br />

***

#### NOT FOUND / FORBIDDEN PAGES

<br />

Not Found Products and Not Found Path:

https://user-images.githubusercontent.com/103672052/223595709-39230db6-e67a-44a8-b8c1-050afa3779dd.mp4

<br />

Forbidden Pages:

https://user-images.githubusercontent.com/103672052/223595821-e2cb1c90-b506-49cd-9e61-9b6d9989ecdd.mp4
