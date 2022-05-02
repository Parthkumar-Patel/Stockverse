// @ts-nocheck
import "./App.css";
import { Routes, Route } from "react-router-dom";

import PageNotFound from "./components/Pages/PageNotFound";
import UserNotAuthenticate from "./components/Pages/UserNotAuthenticate";
import Form from "./components/Pages/Form";
import Home from "./components/Pages/Home";
import AdminDashboard from "./components/Pages/AdminDashboard";
import Payment from "./components/Pages/Payment";
import PaymentDetails from "./components/Pages/PaymentDetails";
import Portfolio from "./components/Pages/Portfolio";
import Dashboard from "./components/Pages/Dashboard";
import Wishlist from "./components/Pages/Wishlist";
import Register from "./components/Pages/Register";
import ChangePassword from "./components/Pages/ChangePassword";
import Profile from "./components/Pages/Profile";

import UsersList from "./components/Pages/UserList";

import AddPortfolioRecord from "./components/Pages/AddPortfolioRecord";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./components/Pages/ForgotPassword";
import SecurityQuestion from "./components/Pages/SecurityQuestion";
import "react-toastify/dist/ReactToastify.css";
import EditPortfolioRecord from "./components/Pages/EditPortfolioRecord";

import UserStatistics from './components/Pages/UserStatistics';
import CustomBasketForm from './components/Pages/CustomBasketForm';
import CustomBasketListAdmin from './components/Pages/CustomBasketListAdmin';
import CustomBasketList from './components/Pages/CustomBasketList';
import InstrumentDashboard from './components/Pages/InstrumentDashboard';
import SendPromotions from './components/Pages/SendPromotions';
import BlogManagement from "./components/Pages/BlogManagement";
import UserBlogs from './components/Pages/UserBlogs';
import News from "./components/Pages/News";
import About from "./components/Pages/About";

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Form />} />
        {user && <Route exact path="/home" element={<Home />} />}
        {user && <Route exact path="/about" element={<About />} />}

        {user && <Route exact path="/dashboard" element={<About />} />}
        {user && <Route exact path="/payment" element={<Payment />} />}
        {user && (
          <Route
            exact
            path="/payment/users/:userId/transactions/:transactionId"
            element={<PaymentDetails />}
          />
        )}
        {user && <Route exact path="/portfolio" element={<Portfolio />} />}

        {user && <Route exact path="/wishlist" element={<Wishlist />} />}
        {user && <Route exact path="/admin" element={<AdminDashboard />} />}
        {user && <Route exact path="/usersList" element={<UsersList />} />}
        {user && (
          <Route exact path="/userStatistics" element={<UserStatistics />} />
        )}
        {user && (
          <Route
            exact
            path="/add-portfolio/*"
            element={<AddPortfolioRecord />}
          />
        )}
        {user && (
          <Route
            exact
            path="/edit-portfolio/:id"
            element={<EditPortfolioRecord />}
          />
        )}
        <Route
          exact
          path="/instrument-dashboard/:id"
          element={<InstrumentDashboard />}
        />
        {!user && <Route exact path="/*" element={<UserNotAuthenticate />} />}
        <Route exact path="/login" element={<Form />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/securityanswer/:id"
          element={<SecurityQuestion />}
        />
        <Route exact path="/changePassword/:id" element={<ChangePassword />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/adminBlogs" element={<BlogManagement />} />
        <Route exact path="/userBlogs" element= {<UserBlogs/>} />
        <Route path="/*" element={<PageNotFound />} />

        {user && (
          <Route
            exact
            path="/customBasketForm"
            element={<CustomBasketForm />}
          />
        )}
        {user && (
          <Route
            exact
            path="/customBasketList"
            element={<CustomBasketList />}
          />
        )}
        {user && (
          <Route
            exact
            path="/customBasketListAdmin"
            element={<CustomBasketListAdmin />}
          />
        )}
        {user && <Route exact path="/News" element={<News />} />}
        {user && (
          <Route exact path="/sendPromotions" element={<SendPromotions />} />
        )}
      </Routes>
      <ToastContainer position="bottom-right" autoClose={1000} />
    </>
  );
}

export default App;
