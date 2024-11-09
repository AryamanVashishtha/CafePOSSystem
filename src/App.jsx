import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PropTypes from 'prop-types';

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Scan from './pages/admin/dashboard/Scan';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import OrderInfo from './pages/orderInfo/OrderInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/Allproducts';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/dashboard/scan" element={
            <ProtectedRouteForAdmin>
              <Scan />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/orderinfo/:id' element={
            <ProtectedRouteForAdmin>
              <OrderInfo />
            </ProtectedRouteForAdmin>
          } />
          {/* Fixed trailing slash issue */}
          <Route path='/dashboard/orderinfo' element={<Navigate to="/dashboard" />} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer hideProgressBar={true} autoClose={800} position="top-center" />
      </Router>
    </MyState>
  );
}

export default App;

// ProtectedRoute Component
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a valid React node
};

// ProtectedRouteForAdmin Component
const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'));

  if (admin && admin.user.email === '123@gmail.com') {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};

ProtectedRouteForAdmin.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a valid React node
};
