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
import Landingpage from "./components/Landingpage";
import Promotional from "./components/Promotional";
import OrderTracking from "./components/Order";
import { PickupProvider } from "./components/PickupContext";
import Pastorder from "./components/Pastorder";
import FancyPage from "./components/Fancypayment";
import Pickuppage from "./components/Pickup";
import PaymentPage from "./components/Paymentpage/Paymentpage";

function App() {
  return (
    <PickupProvider>
      <CartProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/Pickuppage" replace />} />
            <Route path="/" element={<Cart />} />
            <Route path="/payment" element={<FancyPage />} />

            <Route
              path="/home"
              element={
                <>
                  <Navbar />
                  <Slider />
                  <OurProcess />
                  <WhyLaundryMate />
                  <Services />
                  <Footer />
                </>
              }
            />

            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/slider" element={<Slider />} />

            <Route path="/Cart" element={<Cart />} />

            <Route path="/washfoldprices" element={<WashFoldPrices />} />
            <Route path="/washiron" element={<WashIron />} />
            <Route path="/steamiron" element={<SteamIron />} />
            <Route path="/dryclean" element={<DryClean />} />
            <Route path="/Offers" element={<Offers />} />
            <Route path="/Subscriptions" element={<Subscriptions />} />
            <Route path="/Servicehours" element={<Servicehours />} />
            <Route path="/Accountpage" element={<Accountpage />} />
            <Route path="/Promotional" element={<Promotional />} />

            <Route path="/pickuppage" element={<Pickuppage />} />
            <Route path="/Order-tracking" element={<OrderTracking />} />
            <Route path="/slider" element={<Slider />} />
            <Route path="/paymentpage" element={<PaymentPage />} />
            <Route path="/fancypage" element={<FancyPage />} />
            <Route path="/Pastorder" element={<Pastorder />} />
            <Route path="**" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </div>
      </CartProvider>
    </PickupProvider>
  );
}

export default App;
