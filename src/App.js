import './App.css'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import WishList from './pages/WishList/WishList';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import NotFound from './pages/NotFound/NotFound';
import Account from './pages/Account/Account';
import UserList from './pages/Account/UserList/UserList';
import AddUser from './pages/Account/AddUser/AddUser';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import { SearchContextProvider } from './context/searchContext';
import AddProduct from './pages/AddProduct/AddProduct';
import UpdateProfile from './pages/Account/UpdateProfile/UpdateProfile';
import Profile from './pages/Account/Profile/Profile';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <SearchContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/updateprofile" element={<UpdateProfile />} />
          <Route path="/account/userlist" element={<UserList />} />
          <Route path="/account/adduser" element={<AddUser />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/addproduct" element={<AddProduct />} />

          {/* Admin Pages */}
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SearchContextProvider>
    </div>
  );
}

export default App;