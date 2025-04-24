import "./App.scss";
import { CartProvider } from "./components/CartContext";
import Navbar from "./components/NavBar";
import Slider from "./components/Slider";
import WhyLaundryMate from "./components/WhyLaundryMate";
import Services from "./components/Services";
import WashFoldPrices from "./components/WashFoldPrices";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import WashIron from "./components/WashIron";
import SteamIron from "./components/SteamIron";
import DryClean from "./components/DryClean";
import OurProcess from "./components/OurProcess";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Offers from "./components/Offers/Offers";
import LoginPage from "./pages/Login";
import Subscriptions from "./components/Subscription/Subscription";
import Servicehours from "./components/Servicehours";
import Accountpage from "./pages/Account";
import PaymentPage from "./components/Paymentpage/Paymentpage";
import Landingpage from "./components/Landingpage";
import Promotional from "./components/Promotional";
import Pickup from "./components/Pickup";
import OrderTracking from "./components/Order";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPayment from "./components/Cartpayment";
import { PickupProvider } from "./components/PickupContext";
import Pastorder from "./components/Pastorder";




function App() {
  return (
    <PickupProvider>
   
    <CartProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/Pickup" replace />} />

          <Route
            path="/home"
            element={
              // <ProtectedRoute>
                <>
                  <Navbar />
                  <Slider />
                  <OurProcess />
                  <WhyLaundryMate />
                  <Services />
                  <Footer />
                </>
              // </ProtectedRoute>
            }
          />

          <Route
            path="/Navbar"
            element={
              // <ProtectedRoute>
                <Navbar />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/slider"
            element={
              // <ProtectedRoute>
                <Slider />
              // </ProtectedRoute>
            }
          />
         
          <Route
            path="/Cart"
            element={
              // <ProtectedRoute>
                <Cart />
              // </ProtectedRoute>
            }
          />
           <Route
            path="/Cartpayment"
            element={
              // <ProtectedRoute>
                <CartPayment/>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/washfoldprices"
            element={
              // <ProtectedRoute>
                <WashFoldPrices />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/washiron"
            element={
              // <ProtectedRoute>
                <WashIron />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/steamiron"
            element={
              // <ProtectedRoute>
                <SteamIron />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/dryclean"
            element={
              // <ProtectedRoute>
                <DryClean />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/Offers"
            element={
              // <ProtectedRoute>
                <Offers />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/Subscriptions"
            element={
              // <ProtectedRoute>
                <Subscriptions />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/Servicehours"
            element={
              // <ProtectedRoute>
                <Servicehours />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/Accountpage"
            element={
              // <ProtectedRoute>
                <Accountpage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/Promotional"
            element={
              // <ProtectedRoute>
                <Promotional />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              // <ProtectedRoute>
                <PaymentPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/Pickup"
            element={
              // <ProtectedRoute>
                <Pickup />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/Order-tracking"
            element={
              // <ProtectedRoute>
                <OrderTracking />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/slider"
            element={
              // <ProtectedRoute>
                <Slider />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/Pastorder"
            element={
              // <ProtectedRoute>
                <Pastorder />
              // </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="**" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </CartProvider>
    </PickupProvider>
  );
}

export default App;