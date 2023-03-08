# Store Project - React

### SUMMARY

The Front-End implementation of the E-Commerce type of store made with React. 
Created with the purpose of giving it's users the ability to search, add to wish list/shopping cart, rate and buy desired products, ranging from clothing to jewelry. The Back-End consists in Java Spring Boot which provides two roles (User and Admin) and filters to filter the search.

***

### API LINKS
Path should be specific to localhost or to: https://store-project-production.up.railway.app

***

### USERS PAGES

### HOME PAGE
The ***Home Page*** contains a ***Header*** which allows the user to navigate back to the ***Home Page***, search products via ***Search Bar***, navigate to the ***Login***/***Register***, ***Wish List*** and ***Shopping Cart*** pages.
It also contains two buttons in the main element which allows the user navigating to the Products Page and to the Products Page filtered by jewelery category.

** Print da Home Page **

***

### LOGIN / REGISTER
Both ***Login*** and ***Register*** consist in a form which allows the user to log in their account and create and account, respectively.
The ***Login*** informations, along with the ***Shopping Cart*** and the ***Wish List***, are encrypted and stored on the browser's *Local Storage*.
If, for some reason, you want to decrypt them, you need to use the CryptoJS library and the secret keys stored in the ***secretKeys.js***.

** Print das pags Login e Register **

***

### PRODUCTS PAGE
This page contains all the products available in the store. Here, the user can add products to the ***Wish List***, by clicking on the heart image, and filter products to find the product they desire quickly.

### Filters
The filters have a ***Sort by*** and a ***Filter by*** section. Both can be combined but the user can only use a filter at once.
The ***Sort by*** section contain an ***ASC*** and ***DESC*** options (acts diferently depending on the filter that's being combined with)
The ***Filter by*** section have three filters: ***Category***, ***Rate*** and ***Price***.

**Filter by Category:** Allows the user to filter the products by category. When combined with ***Sort by***, ***ASC*** and ***DESC*** options sort the products by alphabetical order.

** Print do Filtro Category **

**Filter by Rate:** Allows the user to filter the products by rate. When combined with ***Sort by***, ***ASC*** and ***DESC*** options sort the products by it's rate.

** Print do Filtro Rate **

**Filter by Price:** Allows the user to filter the products by price. When combined with ***Sort by***, ***ASC*** and ***DESC*** options sort the products by it's price.

** Print do Filtro Price **

### Search Bar
The ***Search Bar*** is the element that can be used from any part of the website. By writing something on it, it's displayed a list of products where the product's title, description, category or price matches the text entered in the ***Search Bar***. By clicking on the product, the user is redirected to the page of that single product. By clicking *Enter*, the user is redirected to the ***Products Page*** with all the products that match the entered text on the ***Search Bar***.
The ***Search Bar*** can also be combined with the ***Filters***. To do so, the user should select a ***Filter*** first, then write something on the ***Search Bar*** and pressing *Enter* at the end.

** Print da Search Bar aberta **

***

### PRODUCT DETAILS
This page allows the user to read the product details, add units of it to the ***Shopping Cart*** and, if the user is logged, allows the user to rate the product by clicking on the stars images.

** Print de Product Details **

***

### WISH LIST
This page allows the users to save their favorite products. Clicking on the product, the user is redirected to the ***Product Details*** page. The product can be removed from the list by clicking on the heart image.

** Print de Wish List **

***

### SHOPPING CART
This page allows the user to buy the products on the list. The checkout can be done by logging in or by filling a litle form.

** Print de Shopping Cart **

***

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
