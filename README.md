# Store Project - React

### SUMMARY

The Front-End implementation of the E-Commerce type of store made with React. 
Created with the purpose of giving it's users the ability to search, add to wish list/cart, rate and buy desired products, ranging from clothing to jewelry. The Back-End consists in Java Spring Boot which provides two roles (User and Admin) and filters to filter the search.

It also has some filters which allow the user to filter products by category, rating and price.

Made use of login/register endpoints of the Java Springboot API (previously built) also with search filters to order (ascending/descending) products by rating, category and number of products per page. Also used fully functional pagination, aswell as other miscellaneous.

***

### API LINKS
Path should be specific to localhost or to: https://store-project-production.up.railway.app

***

### HOME PAGE
The *Home Page* contains a *Header* which allows the user to navigate back to the *Home Page*, search products via *Search Bar*, navigate to the *Login*/*Register*, *Wish List* and *Shopping Cart* pages.
It also contains two buttons in the main element which allows the user navigating to the Products Page and to the Products Page filtered by jewelery category.

** Print da Home Page **

***

### LOGIN / REGISTER
Both *Login* and *Register* consist in a form which allows the user to log in their account and create and account, respectively:

** Print das pags Login e Register **

***

### PRODUCTS PAGE
This page contains all the products available in the store. It contains filters to help the user find the products their desire quickly.

### FILTERS
The filters have a **Sort by** and a ***Filter by*** section. Both can be combined but the user can only use a filter at once.
The *Sort by* section contain an *ASC* and *DESC* option (acts diferently depending on the filter that's being combined with)
The *Filter by* section have three filters: *Category*, *Rate* and *Price*.

### Filter by Category




The Header contains Search Bar which allows the user to search for any product. Pressing the enter button, while focused on the Search Bar, redirects the user to the Products Page, showing only the products that contain the text passed through the Seacrh Bar in it's title, description, price or category





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
